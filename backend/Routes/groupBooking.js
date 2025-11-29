import express from "express";
import { getCheckoutSession } from "../Controllers/groupBookingController.js";
import { authenticate } from "../auth/verifyToken.js";

const router = express.Router();

router.post("/checkout_group_session/:sessionId", authenticate, getCheckoutSession);

export default router;
