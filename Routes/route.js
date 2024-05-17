import { Router } from "express";
import VotersSchema from "../schema/votersSchema.js";
import multer from "multer";
const upload = multer({dest:"uploads/"});
const router = Router();

router.get("/voterAdharCard/:uniqueNumber", async (req, res) => {
  try {
    const uniqueNumber = req.params.uniqueNumber;

    // Find the voter record by uniqueNumber in the database
    const voter = await VotersSchema.findOne({ uniqueNumber });

    if (!voter) {
      return res.status(404).json({ message: "Voter not found" });
    }

    // If voter found, send the voter's Aadhar card information
    res.status(200).json({ message: "Voter Aadhar card information retrieved successfully", data: voter });
  } catch (error) {
    // If any error occurs, send a 500 status with the error message
    res.status(500).json({ message: error.message });
  }
});


// Function to generate a unique number of length 12
function generateUniqueNumber() {
  const length = 12;
  let uniqueNumber = "";
  const characters = "0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    uniqueNumber += characters.charAt(
      Math.floor(Math.random() * charactersLength)
    );
  }
  return uniqueNumber;
}

router.post("/addAadhar", upload.fields([{ name: 'profile' }, { name: 'fingerprint' }]), async (req, res) => {
  // console.log("backend ", req.body);
  try {
      const {
          name,
          gender,
          address,
          dob,
          mobileNo,
          emailId,
          nationality,
          occupation,
          education,
          maritalStatus,
      } = req.body;
      
      // Get file paths for profile and fingerprint images
      console.log("find error",req.files['profile'][0]);
      const profileImagePath = req.files['profile'][0].path;
      const fingerprintImagePath = req.files['fingerprint'][0].path;
      console.log("profileImage", profileImagePath);
      console.log("fingerprintImage", fingerprintImagePath);

      // Check if the email already exists in the database
      const existingVoter = await VotersSchema.findOne({ emailId });
      if (existingVoter) {
          return res.status(400).json({ message: "This email is already associated with an Aadhar card" });
      }

      // Generate a unique number
      const uniqueNumber = generateUniqueNumber();

      // Create a new Aadhar card record with the generated unique number
      const newVoter = new VotersSchema({
          name,
          gender,
          address,
          profile: profileImagePath,
          fingerprint: fingerprintImagePath,
          dob,
          mobileNo,
          emailId,
          nationality,
          occupation,
          education,
          maritalStatus,
          uniqueNumber, // Include the generated unique number
      });

      // Save the new Aadhar card record to the database
      await newVoter.save();

      res.status(201).json({ message: "Aadhar card added successfully", data: newVoter });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});



export default router;
