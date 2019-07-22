let mongoose = require('mongoose')
let schema = require('./schema')
let createModel = require('../create-model')
let mongooseModel = mongoose.model('show', schema)
let actModel = require('../acts/model')
let badgeModel = require('../badges/model')
let hostModel = require('../hosts/model')
let nodeMailer = require('../../utilities/nodemailer')
let reservationConfirmationEmailTemplate = require('../../email-templates/compile')('reservation-confirmation')
let urlSlug = require('url-slug')

let overrides = {

  async create(show) {
    show.url = `${urlSlug(show.day)}/${urlSlug(show.venue)}/${show.startTime}`
    return mongooseModel.create(show)
  },

  async addAct(show, act) {
    show.acts.push(act)
    return show
  },
  async removeAct(showId, actId) {
    let show = await mongooseModel.findById(showId).exec()
    let actIndex = show.acts.findIndex(a=> a._id == actId)
    show.acts.splice(actIndex, 1)
    show.markModified('acts')
    return show
  },
  async addHost(show, host) {
    show.host = host
    return show
  },
  async removeHost(show) {
    show.host = null
    return show
  },

  async refresh() {
    let shows = await mongooseModel.find()
    let acts = await actModel.readFat()
    let hosts = await hostModel.read()

    for(act of acts) {
      act.url = urlSlug(act.name)
      act.save()
    }

    for (show of shows) {
      show.url = `${urlSlug(show.day)}/${urlSlug(show.venue)}/${show.startTime}`
      if(show.host) {
        show.host = hosts.find(h=> h._id == String(show.host._id))
        show.markModified('host')
      }

      for (oldAct of show.acts) {
        for (newAct of acts) {
          if (oldAct.name == newAct.name) {
            oldAct.image = newAct.image
            oldAct.publicDescription = newAct.publicDescription
            oldAct.showType = newAct.showType
          }
        }
      }
      show.markModified('acts')
      mongooseModel.findByIdAndUpdate(show._id, show, {new: true}).lean().exec()
    }
  },

  async find(url) {
    return mongooseModel.findOne({url})
  },

  async addTicket(showId, ticket) {
    let show = await mongooseModel.findById(showId).exec()

    // Show is sold out
    if(show.remaining <= 0) return { reservationSuccessful: false, message: "Show is sold out"}

      // Not enough tickets remaining for requested quantity
    else if (ticket.quantity > show.remaining) return { reservationSuccessful: false, message: `There are less than ${ticket.quantity} tickets available for this show`}

    else {
      show.tickets.push(ticket)
      show.remaining = (show.remaining - ticket.quantity)
      show.markModified('tickets')
      return await show.save()
    }
  },

  async addBadgeReservation(showId, email, quantity) {

    // Get badge
    let badge = await badgeModel.getByEmail(email)

    // Error: badge not found
    if(badge == null) return {reservationSuccessful: false, message: "No badges found for this email"}

    // Error: quantity asked for exceeds quantity of badge
    else if(quantity > badge.quantity) return {reservationSuccessful: false, message: `This badge supports up to ${badge.quantity} reservations`}

    // Get show
    let show = await mongooseModel.findById(showId).exec()

    // Reserving non-weekend day with weekend badge (Todo: assumes they've only bought one badge_
    if (badge.type == 'performer-weekend-upgrade' && (show.day == 'Tuesday' || show.day=='Wednesday' || show.day=='Thursday')) {
      return {reservationSuccessful: false, message: "Badge can only reserve shows on Friday, Saturday, Sunday or Monday"}
    }

    // Show is sold out
    else if(show.remaining <= 0 ) {
      return {reservationSuccessful: false, message: "Show is sold out"}
    }

    // Show deson't have enough tickets available
    else if (quantity > show.remaining) {
      return {reservationSuccessful: false, message: `There are less than ${quantity} tickets available for this show`}
    }

    //They've already made reservations with thi sbadge
    else if (show.tickets.filter(t=> t.email == badge.email).map(t=> t.quantity).reduce((total, quantity)=> total + quantity, 0) >= badge.quantity) {
      return {reservationSuccessful: false, message: `${badge.email} has already made ${badge.quantity} reservation(s) for this show`}
    }

    // Create ticket w/ information from badge
    let ticket = { name: badge.name, email: badge.email, phone: badge.phone, quantity, type: badge.type }

    // Save data
    show.tickets.push(ticket)
    show.remaining = (show.remaining - ticket.quantity)
    show.markModified('tickets')
    let savedShow = await show.save()


    let recipient = badge.email
    let subject = 'Booking Confirmation for Out of Bounds'
    let message = reservationConfirmationEmailTemplate({
      name: badge.name,
      where: formatVenue(show.venue),
      when: formatDayAndTime(show.day, String(show.startTime)),
      isBadge: true,
      quantity
    })
    nodeMailer.sendEmail(recipient, subject, message)

    return {reservationSuccessful: true, savedShow}
  },

  async removeTicket(showId, ticketId) {
    let show = await mongooseModel.findById(showId).exec()
    let ticketIndex = show.tickets.findIndex(t=> t._id == ticketId)
    show.remaining += Number(show.tickets[ticketIndex].quantity)
    show.tickets.splice(ticketIndex, 1)
    return await show.save()
  },

  async checkRemainingTickets(showId) {
    let show = await mongooseModel.findById(showId).exec()
    return {remaining: Math.min(show.remaining, 15)}
  },

  async setCapacity(showId, capacity) {
    let show = await mongooseModel.findById(showId).exec()
    if (show.capacity == undefined) show.remaining = capacity
    else show.remaining = capacity - (show.capacity - show.remaining)
    show.capacity = capacity
    return await show.save()
  }
}

function formatDayAndTime(day, time) {
  return formatDay(day) + ", " + formatTime(time)
}

function formatTime(time) {
  return time.slice(0, time.length-2) + ":" + time.slice(time.length-2) + "pm"
}

function formatDay(day) {
  switch(day) {
    case 'Tuesday':   return 'Tuesday, August 27th'
    case 'Wednesday': return 'Wednesday, August 28th'
    case 'Thursday':  return 'Thursday, August 29th'
    case 'Friday':    return 'Friday, August 30th'
    case 'Saturday':  return 'Saturday, August 31st'
    case 'Sunday':    return 'Sunday, September 1st'
    case 'Monday':    return 'Monday, September 2nd'
    default: return day
  }
}

function formatVenue(venue) {
  switch(venue) {
    case 'Hideout Up':        return 'Hideout Theatre (Upstairs), 617 Congress Ave, Austin, TX 78701'
    case 'Hideout Down':      return 'Hideout Theatre (Downstairs), 617 Congress Ave, Austin, TX 78701'
    case 'ColdTowne':         return 'ColdTowne Theater, 4803 Airport Blvd, Austin, TX 78751'
    case 'Fallout':           return 'Fallout Theater, 616 Lavaca St, Austin, TX 78701'
    case 'Velveeta':          return 'Velveeta Room, 521 E 6th St, Austin, TX 78701'
    case 'North Door':        return 'The North Door, 501 Brushy St, Austin, TX 78702'
  }
}

module.exports = createModel(mongooseModel, overrides)