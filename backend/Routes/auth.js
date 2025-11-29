// auth.js
import express from "express";
import { register, Login } from "../Controllers/authController.js";
import { oauth2Client } from "../googleAuth.js";
import Mentor from "../models/MentorSchema.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", Login);

router.get("/google", (req, res) => {
  const mentorId = req.query.state;
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/calendar",
      "https://www.googleapis.com/auth/calendar.events",
    ],
    state: mentorId,
  });
  res.redirect(url);
});

router.get("/google/redirect", async (req, res) => {
  try {
    const code = req.query.code;
    const mentorId = req.query.state;

    const { tokens } = await oauth2Client.getToken(code);
    const mentor = await Mentor.findById(mentorId);
    if (!mentor) return res.status(404).send("Mentor not found");

    mentor.google = {
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token || mentor.google?.refreshToken,
      expiryDate: tokens.expiry_date
        ? new Date(tokens.expiry_date)
        : mentor.google?.expiryDate,
    };

    await mentor.save();
    res.send({ msg: "Google tokens saved", tokens });
  } catch (error) {
    console.error("Google token error:", error.response?.data || error.message);
    res.status(500).send("Error getting Google tokens");
  }
});


export default router;
