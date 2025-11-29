import express from "express";
import {
  createGroupSession,
  updateGroupSession,
  deleteGroupSession,
  getSingleGroupSession,
  getAllGroupSessions,
  getMentorGroupSessions,
  getMyBookedSessions,
} from "../Controllers/groupSessionController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();
router.get("/", getAllGroupSessions);

router.get(
  "/mentor/my-sessions",
  authenticate,
  restrict(["mentor"]),
  getMentorGroupSessions
);

router.get(
  "/user/group-bookings",
  authenticate,
  restrict(["mentee"]),
  getMyBookedSessions
);

router.get("/:id", getSingleGroupSession);

router.post("/", authenticate, restrict(["mentor"]), createGroupSession);

router.put("/:id", authenticate, restrict(["mentor"]), updateGroupSession);

router.delete("/:id", authenticate, restrict(["mentor"]), deleteGroupSession);

export default router;
