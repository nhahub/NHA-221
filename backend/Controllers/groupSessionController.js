import mongoose from "mongoose";
import GroupSession from "../models/GroupSessionSchema.js";
import Booking from "../models/GroupBookingSchema.js";

export const createGroupSession = async (req, res) => {
  try {
    const newSession = new GroupSession({
      mentor: req.body.mentor,
      imageURL: req.body.imageURL,
      topic: req.body.topic,
      description: req.body.description,
      startDatetime: req.body.startDatetime,
      durationMinutes: req.body.durationMinutes,
      maxParticipants: req.body.maxParticipants,
      ticketPrice: req.body.ticketPrice,
      status: req.body.status || "upcoming",
      meetingLink: req.body.meetingLink,
    });

    await newSession.save();

    res.status(201).json({
      success: true,
      message: "Group session created successfully",
      data: newSession,
    });



    // // 🔑 Create Google Meet link via calendarService
    // try {
    //   const { mentor,startDatetime } = req.body;
    //   const user = {};
    //   const date = startDatetime.split("T")[0];
    //   const time = startDatetime.split("T")[1];
    //   console.log(date, time);
    //   const meetLink = await createCalendarEvent({ mentor, user, date, time });
    //   newSession.meetingLink = meetLink;
    //   await newSession.save();
    // } catch (err) {
    //   console.error("Error creating Google Calendar event:", err.message);
    // }

    // res.status(200).json({
    //   success: true,
    //   message: "Successfully paid and meeting created",
    //   meetLink: newSession.meetingLink,
    // });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Failed to create group session`,
    });
  }
};
export const updateGroupSession = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedSession = await GroupSession.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedSession) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }
    res.status(200).json({
      success: true,
      message: "Group session successfully updated",
      data: updatedSession,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to update session" });
  }
};

export const deleteGroupSession = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedSession = await GroupSession.findByIdAndDelete(id);
    if (!deletedSession) {
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });
    }
    res.status(200).json({
      success: true,
      message: "Group session successfully deleted",
      data: deletedSession,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Failed to delete session" });
  }
};

export const getSingleGroupSession = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid session ID" });
  }

  try {
    const session = await GroupSession.findById(id).populate(
      "mentor",
      "name jobTitle photo"
    );
    // .populate({
    //   path: "bookings",
    //   populate: { path: "user", select: "name photo" },
    // });

    if (!session) {
      return res
        .status(404)
        .json({ success: false, message: "No session found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Session found", data: session });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllGroupSessions = async (req, res) => {
  try {
    const { topic, status } = req.query;
    let filter = {};

    if (topic) {
      filter.topic = { $regex: topic, $options: "i" };
    }
    if (status) {
      filter.status = status;
    }

    const sessions = await GroupSession.find(filter)
      .populate("mentor", "name jobTitle")
      .sort({ startDatetime: 1 });

    res.status(200).json({
      success: true,
      message: "All group sessions retrieved",
      data: sessions,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const getMentorGroupSessions = async (req, res) => {
  try {
    const mentorId = req.userId;
    const sessions = await GroupSession.find({ mentor: mentorId }).sort({
      startDatetime: 1,
    });

    res.status(200).json({
      success: true,
      message: "Mentor group sessions retrieved",
      data: sessions,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Something went wrong: ${err.message}`,
    });
  }
};

export const getMyBookedSessions = async (req, res) => {
  try {
    const userId = req.userId;
    const bookings = await Booking.find({ user: userId }).populate("session");

    res.status(200).json({
      success: true,
      message: "Booked sessions retrieved",
      data: bookings,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Something went wrong: ${err.message}`,
    });
  }
};
