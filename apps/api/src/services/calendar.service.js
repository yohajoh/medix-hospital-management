import { google } from "googleapis";
import { oauth2Client } from "../config/google.config.js";

class CalendarService {
  /**
   * Automatically creates a hospital event for any stakeholder
   * @param {Object} user - The plain JS user object fetched from Prisma
   * @param {Object} eventDetails - The details for the appointment
   */
  static async createHospitalEvent(user, eventDetails) {
    // 1. Validation
    // In Prisma, we check the property on the plain object
    if (!user || !user.googleRefreshToken) {
      throw new Error("User has not linked Google Calendar or refresh token is missing.");
    }

    // 2. Setup Client & Auto-Refresh tokens
    oauth2Client.setCredentials({
      refresh_token: user.googleRefreshToken,
    });

    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    // 3. Construct Event Resource
    const event = {
      summary: `Medix: ${eventDetails.title}`,
      location: eventDetails.location || "Medix Hospital Center",
      description: eventDetails.description,
      start: {
        // PostgreSQL/Prisma Date objects are native JS Dates, so we still use .toISOString()
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
      // Logic for PostgreSQL: If the token is invalid, you might want to
      // flag the user record in your database as 'calendarConnected: false'
      if (error.response && error.response.status === 401) {
        console.error("Refresh token invalid. User must re-authenticate.");
        // Note: You would call a prisma.user.update here if you wanted to sync status
      }
      throw error;
    }
  }
}

export default CalendarService;
