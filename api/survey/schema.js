let mongoose = require('mongoose')

module.exports = mongoose.Schema({

  // Demographics
  location: String,   // Local, Outside Austin, Outside Texas, Outside U.S.A.
  zipCode: String,    // Blank if outside USA
  race: String,
  gender: String,     // Female, Male, Non-binary, Other
  special: [String],
  
  // Survey
  participation: [String], // Performer, Audience Member, Host, Volunteer, Workshop Attendee
 
  // Five-point Scale: 
  // https://www.nbrii.com/faqs/customer-survey/best-rating-scale-customer-survey/
  // 5 Exceptional
  // 4 Very Good
  // 3 Good
  // 2 Bad
  // 1 Very Bad
  // 0 Extremely Bad
  
  // Survey, Audience Member
  likedActs: String,
  dislikedActs: String,
  audienceMemberExperience: Number,
  audienceMemberExperienceNotes: String,
  
  // Survey, Performer
  performerType: [String], // Stand-up, Improv, Sketch, Other
  performerShowExperience: Number,
  performerShowExperienceNotes: String,
  performerFestivalExperience: Number,
  performerFestivalExperienceNotes: String,
  
  // Survey, Volunteer
  volunteerExperience: Number,
  volunteerExperienceNotes: String,
  
  // Survey, Host
  hostExperience: Number,
  hostExperienceNotes: String,
  
  // Survey, Workshop Attendee
  workshopAttendeeExperience: Number,
  workshopAttendeeExperienceNotes: String,
  
  // Follow-up Email
  email: String
})
