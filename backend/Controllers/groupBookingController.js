import User from "../models/UserSchema.js";
import GroupSession from "../models/GroupSessionSchema.js";
import GroupBooking from "../models/GroupBookingSchema.js";
import Stripe from "stripe";

export const getCheckoutSession = async (req, res) => {
  try {
    const groupSession = await GroupSession.findById(
      req.params.sessionId
    ).populate("mentor");
    const user = await User.findById(req.userId);

    if (!groupSession || !user) {
      return res
        .status(404)
        .json({ success: false, message: "Session or user not found" });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.CLIENT_SITE_URL}/checkout-success`,
      cancel_url: `${req.protocol}://${req.get("host")}/sessions/${
        groupSession.id
      }`,
      customer_email: user.email,
      client_reference_id: req.params.sessionId,
      line_items: [
        {
          price_data: {
            currency: "USD",
            unit_amount: groupSession.ticketPrice * 100,
            product_data: {
              name: groupSession.topic,
              description: groupSession.description,
              images: [groupSession.imageURL],
            },
          },
          quantity: 1,
        },
      ],
    });

    const booking = new GroupBooking({
      groupSession: groupSession._id,
      user: user._id,
      isPaid: true,
      status: "confirmed",
    });

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Checkout session created successfully",
      session,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Error creating checkout session" });
  }
};
