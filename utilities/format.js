module.exports = {
  formatVenue(venue) {
    switch(venue) {
      case 'Hideout Up':        return 'Hideout Theatre (Upstairs), 617 Congress Ave, Austin, TX 78701'
      case 'Hideout Down':      return 'Hideout Theatre (Downstairs), 617 Congress Ave, Austin, TX 78701'
      case 'Hideout Classroom': return 'Hideout Theatre (Classroom), 617 Congress Ave, Austin, TX 78701'
      case 'ColdTowne':         return 'ColdTowne Theater, 4803 Airport Blvd, Austin, TX 78751'
      case 'Fallout':           return 'Fallout Theater, 616 Lavaca St, Austin, TX 78701'
      case 'Velveeta':          return 'Velveeta Room, 521 E 6th St, Austin, TX 78701'
      case 'North Door':        return 'The North Door, 501 Brushy St, Austin, TX 78702'
    }
  },
  formatVenueShort(venue) {
    switch(venue) {
      case 'Hideout Up':        return 'Hideout Theatre (Upstairs)'
      case 'Hideout Classroom': return 'Hideout Theatre (Upstairs Classroom)'
      case 'Hideout Down':      return 'Hideout Theatre (Downstairs)'
      case 'ColdTowne':         return 'ColdTowne Theater'
      case 'Fallout':           return 'Fallout Theater'
      case 'Velveeta':          return 'Velveeta Room'
      case 'North Door':        return 'The North Door'
    }
  },
  formatVenueShortest(venue) {
    switch(venue) {
      case 'hideout-up':        return 'Hideout Theatre (Upstairs)'
      case 'hideout-down':      return 'Hideout Theatre (Downstairs)'
      case 'coldtowne':         return 'ColdTowne Theater'
      case 'fallout':           return 'Fallout Theater'
      case 'velveeta':          return 'Velveeta Room'
      case 'north-door':        return 'The North Door'
    }
  },
  formatTime(time) {
    time = String(time)
    return time.slice(0, time.length-2) + ":" + time.slice(time.length-2) + "pm"
  },

  formatWorkshopTime(time) {
    switch(time) {
      case "10": return "11:00am to 2:00pm"
      case "20": return "12:00pm to 3:00pm"
      case "30": return "1:00pm to 4:00pm"
      case "40": return "3:00pm to 6:00pm"
    }
  },

  formatDay(day) {
    switch(day) {
      case 'Tuesday':   return 'Tuesday, Aug. 27th'
      case 'Wednesday': return 'Wednesday, Aug. 28th'
      case 'Thursday':  return 'Thursday, Aug. 29th'
      case 'Friday':    return 'Friday, Aug. 30th'
      case 'Saturday':  return 'Saturday, Aug. 31st'
      case 'Sunday':    return 'Sunday, Sep. 1st'
      case 'Monday':    return 'Monday, Sep. 2nd'
    }
  }
}