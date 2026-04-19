import { google } from "googleapis";
import { oauth2Client } from "../config/google.config.js";

class CalendarService {
  static async createHospitalEvent(user, eventDetails) {
    if (!user || !user.googleRefreshToken) {
      throw new Error(
        "User has not linked Google Calendar or refresh token is missing.",
      );
    }

    oauth2Client.setCredentials({
      refresh_token: user.googleRefreshToken,
    });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const event = {
      summary: `Medix: ${eventDetails.title}`,
      location: eventDetails.location || "Medix Hospital Center",
      description: eventDetails.description,
      start: {
        dateTime: new Date(eventDetails.startTime).toISOString(),
        timeZone: user.timezone || "UTC",
      },
      end: {
        dateTime: new Date(eventDetails.endTime).toISOString(),
        timeZone: user.timezone || "UTC",
      },
      attendees: eventDetails.attendees || [],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 60 },
          { method: "popup", minutes: 10 },
        ],
      },
      conferenceData: {
        createRequest: {
          requestId: `medix-appt-${Date.now()}`,
          conferenceSolutionKey: { type: "hangoutsMeet" },
        },
      },
    };

    try {
      const response = await calendar.events.insert({
        calendarId: "primary",
        resource: event,
        conferenceDataVersion: 1,
        sendUpdates: "all",
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Refresh token invalid. User must re-authenticate.");
      }
      throw error;
    }
  }
}

export default CalendarService;
