import mongoose from "mongoose";

const GroupSessionSchema = new mongoose.Schema(
  {
    mentor: {
      type: mongoose.Types.ObjectId,
      ref: "Mentor", // References the Mentor model
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    startDatetime: {
      type: Date,
      required: true,
    },
    durationMinutes: {
      type: Number,
    },
    maxParticipants: {
      type: Number,
      required: true,
      min: 1,
    },
    ticketPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["upcoming", "completed", "cancelled"],
      default: "upcoming",
    },
    meetingLink: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.GroupSession ||
  mongoose.model("GroupSession", GroupSessionSchema);
