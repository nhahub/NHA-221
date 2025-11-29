import mongoose from "mongoose";
import Mentor from "../models/MentorSchema.js";
import Booking from "../models/BookingSchema.js";

export const updateMentor = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedMentor = await Mentor.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatedMentor,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update" });
  }
};

export const deleteMentor = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedMentor = await Mentor.findByIdAndDelete(
      id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
      data: deletedMentor,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to deleted" });
  }
};

export const getSingleMentor = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid mentor ID" });
  }

  try {
    const mentor = await Mentor.findById(id)
      .select("-password")
      .populate({
        path: "reviews",
        populate: {
          path: "user",
          select: "name photo",
        },
      });
    if (!mentor) {
      return res
        .status(404)
        .json({ success: false, message: "No Mentor found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Mentor found", data: mentor });
  } catch (error) {
    console.error("getSingleMentor error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllMentor = async (req, res) => {
  try {
    const { query, areaOfExpertise } = req.query;
    let filter = { isApproved: "approved" };

    if (query) {
      filter.$or = [
        { name: { $regex: query, $options: "i" } },
        { jobTitle: { $regex: query, $options: "i" } }, 
      ];
    }

    if (areaOfExpertise) {
      filter.areaOfExpertise = { $regex: areaOfExpertise, $options: "i" };
    }

    const mentors = await Mentor.find(filter).select("-password");

    res.status(200).json({
      success: true,
      message: "All approved mentors found",
      data: mentors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const getMentorProfile = async (req, res) => {
  try {
    const mentorId = req.userId; 

    const mentor = await Mentor.findById(mentorId);

    if (!mentor) {
      return res
        .status(404)
        .json({ success: false, message: "Mentor not found" });
    }

    const { password, ...rest } = mentor._doc;
    const appointments = await Booking.find({ mentor: mentorId });

    res.status(200).json({
      success: true,
      message: "Profile info retrieved successfully",
      data: { ...rest, appointments },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Something went wrong: ${err.message}`,
    });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const bookings = await Booking;
    const mentorIds = bookings.map((el) => el.mentor.id);
    const mentors = await Mentor.find({ _id: { $in: mentorIds } }).select(
      "-password"
    );

    res.status(200).json({
      success: true,
      message: "Appointments are getting",
      data: mentors,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ Success: false, message: `something went wrong : ${err}` });
  }
};
