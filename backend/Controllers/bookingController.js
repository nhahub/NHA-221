import User from "../models/UserSchema.js";
import Mentor from "../models/MentorSchema.js";
import Booking from "../models/BookingSchema.js";
import Stripe from "stripe";
import { createCalendarEvent } from "../Services/calendarService.js";

export const getCheckoutSession = async (req, res) => {
  try {
    const mentor = await Mentor.findById(req.params.mentorId);
    const user = await User.findById(req.userId);

    const { date, time } = req.body;
    const slot = mentor.timeSlots.find((s) => s.day === date);
    if (!slot)
      return res.status(400).json({ message: "Selected day not available" });

    const hour = slot.hourSlots.find((h) => h.time === time);
    if (!hour || hour.status !== "available") {
      return res.status(400).json({ message: "Selected hour not available" });
    }

    hour.status = "booked";
    mentor.markModified("timeSlots");
    await mentor.save();

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${process.env.CLIENT_SITE_URL}/mentors/${mentor.id}`,
      customer_email: user.email,
      client_reference_id: req.params.mentorId,
      line_items: [
        {
          price_data: {
            currency: "USD",
            unit_amount: mentor.hourlyFee * 100,
            product_data: {
              name: mentor.name,
              description: mentor.bio,
              images: [mentor.photo],
            },
          },
          quantity: 1,
        },
      ],
    });

    // Create booking
    const booking = new Booking({
      mentor: mentor._id,
      user: user._id,
      ticketPrice: mentor.hourlyFee,
      session: session.id,
      sessionDate: date,
      sessionTime: time,
    });
    await booking.save();

    // 🔑 Create Google Meet link via calendarService
    try {
      const meetLink = await createCalendarEvent({ mentor, user, date, time });
      booking.meetLink = meetLink;
      await booking.save();

    } catch (err) {
      console.error("Error creating Google Calendar event:", err.message);
    }

    res.status(200).json({
      success: true,
      message: "Successfully paid and meeting created",
      session,
      meetLink: booking.meetLink,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Error creating checkout session" });
  }
};

export const getUserBookings = async (req, res) => {
  const userId = req.userId;
  try {
    const bookings = await Booking.find({ user: userId });
    res.status(200).json({ success: true, message: "Bookings found", data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch bookings" });
  }
};
