import { google } from "googleapis";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";
import { v4 as uuid } from "uuid";
import { oauth2Client } from "../googleAuth.js";

export const createCalendarEvent = async ({ mentor, user, date, time }) => {
  if (!mentor.google || !mentor.google.accessToken) {
    throw new Error("Mentor has not connected Google Calendar");
  }

  oauth2Client.setCredentials({
    access_token: mentor.google.accessToken,
    refresh_token: mentor.google.refreshToken,
    expiry_date: mentor.google.expiryDate,
  });

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  dayjs.extend(customParseFormat);
  const [startRaw] = time.split(" - ").map((t) => t.trim());
  const start24 = dayjs(startRaw, "h A").format("HH:mm");

  const eventResponse = await calendar.events.insert({
    calendarId: "primary",
    conferenceDataVersion: 1,
    requestBody: {
      summary: `Session with ${mentor.name}`,
      description: `Mentorship session booked by ${user.name}`,
      start: {
        dateTime: dayjs(`${date} ${start24}`, "YYYY-MM-DD HH:mm").toISOString(),
        timeZone: mentor.timezone || "Africa/Cairo",
      },
      end: {
        dateTime: dayjs(`${date} ${start24}`, "YYYY-MM-DD HH:mm")
          .add(1, "hour")
          .toISOString(),
        timeZone: mentor.timezone || "Africa/Cairo",
      },
      conferenceData: {
        createRequest: { requestId: uuid() },
      },
      attendees: [{ email: user.email }, { email: mentor.email }],
    },
  });

  return eventResponse.data.hangoutLink;
};
