import mongoose from "mongoose";

const MentorSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    photo: { type: String },
    hourlyFee: { type: Number },
    role: {
      type: String,
      required: true,
      default: "mentor",
    },

    // === Structured Fields ===

    areaOfExpertise: {
      type: String,
      enum: [
        "Not Specified",
        "Software Engineering",
        "Marketing",
        "Design",
        "Finance",
        "Product Management",
        "Human Resources",
      ],
      default: "Not Specified",
    },
    jobTitle: { type: String },

    qualifications: {
      type: Array,
    },
    experiences: {
      type: Array,
    },

    bio: { type: String, maxLength: 250 },
    about: { type: String },
    location: { type: String },

    links: {
      type: Array,
    },
    google: {
      accessToken: String,
      refreshToken: String,
      expiryDate: Number,
    },

    timezone: {
      type: String,
      default: "Africa/Cairo",
      
    },

    timeSlots: { type: Array },

    // === Ratings ===

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalRating: {
      type: Number,
      default: 0,
    },

    reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],

    // === Admin & Relational Fields ===

    isApproved: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "pending",
    },
    sessions: [{ type: mongoose.Types.ObjectId, ref: "Session" }],
  },
  { timestamps: true }
);

export default mongoose.models.Mentor || mongoose.model("Mentor", MentorSchema);
