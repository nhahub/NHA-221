import express from "express";
import { sendEmail } from "../Controllers/ContactController.js";

const router = express.Router();

router.post("/", sendEmail);

export default router;
