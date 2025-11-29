import User from "../models/UserSchema.js";
import Mentor from "../models/MentorSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
};

export const register = async (req, res) => {
  const { email, password, name, gender, role, photo } = req.body;

  if (!email || !password || !name || !role) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (!["mentee", "mentor"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  try {
    let existingUser = null;
    if (role === "mentee") existingUser = await User.findOne({ email });
    else existingUser = await Mentor.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserData = {
      name,
      email,
      password: hashedPassword,
      gender,
      photo,
    };

    const newUser =
      role === "mentee" ? new User(newUserData) : new Mentor(newUserData);

    await newUser.save();

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = null;

    const mentee = await User.findOne({ email });
    const mentor = await Mentor.findOne({ email });

    if (mentee) user = mentee;
    if (mentor) user = mentor;

    if (!user) {
      return res.status(400).json({ message: "User with this email does not exist" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({ success: false, message: "wrong password" });
    }

    const token = generateToken(user);
    const { password: ABC, role, appointments, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "Successful Login",
      data: { ...rest, role, token },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Failed to login" });
  }
};

