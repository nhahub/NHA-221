import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    mentor: {
      type: mongoose.Types.ObjectId,
      ref: "Mentor",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketPrice: { type: String, required: true },

    status: {
      type: String,
      enum: ["pending", "approved", "cancelled"],
      default: "approved",
    },
    isPaid: {
      type: Boolean,
      default: true,
    },
    sessionDate: { type: Date },
    sessionTime: { type: String },
    
    meetLink: { type: String },
  },
  { timestamps: true }
);
bookingSchema.pre(/^find/, function (next) {
  this.populate("user").populate({
    path: "mentor",
    select: "name",
  });

  next();
});

export default mongoose.model("Booking", bookingSchema);
