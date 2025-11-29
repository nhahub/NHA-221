import mongoose from "mongoose";

const GroupBookingSchema = new mongoose.Schema(
  {
    groupSession: {
      type: mongoose.Types.ObjectId,
      ref: "GroupSession",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
  },
  { timestamps: true }
); // Automatically adds created_at and updated_at

export default mongoose.models.GroupBooking || mongoose.model("GroupBooking", GroupBookingSchema);
