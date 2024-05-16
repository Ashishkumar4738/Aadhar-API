// votersSchema.js

import { Schema, model } from "mongoose";

const VoterSchema = new Schema({
  uniqueNumber: {
    type: String,
    unique: true, // Ensures uniqueness of the uniqueNumber field
  },
  name: String,
  gender: String,
  dob: String,
  address: String,
  nationality: String,
  occupation: String,
  education: String,
  maritalStatus: String,
  mobileNo: String,
  emailId: {
    type: String,
    unique: true, // Ensures uniqueness of the emailId field
  },
  profile: {
    type:String,
    default:null
  },
  fingerprint: {
    type: String,
    default: null,
  },
  // votingHistory: [{
    //     electionName: {
      //         type:String,
  //         default:""
  //     },
  //     electionDate: {
  //         type:Date,
  //         default:""
  //     },
  //     votedCandidate: {
  //         type:String,
  //         default:""
  //     }
  // }],
  date: {
    type: Date,
    default: Date.now,
  },
  // Add more fields as needed
});

export default model("Voter", VoterSchema);
