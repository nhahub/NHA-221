import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    photo: { type: String },
    role: {
      type: String,
      enum: ["mentee", "admin"],
      default: "mentee",
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
    },

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
    sessions: [{ type: mongoose.Types.ObjectId, ref: "Session" }],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
