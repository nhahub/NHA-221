import express from "express";
import { authenticate } from "../auth/verifyToken.js";
import { getCheckoutSession, getUserBookings } from "../Controllers/bookingController.js";

const router = express.Router();

router.post("/checkout_session/:mentorId", authenticate, getCheckoutSession);
router.get("/my_bookings", authenticate, getUserBookings);

export default router;
