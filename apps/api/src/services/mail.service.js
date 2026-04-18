import { transport } from "../integrations/resend.js";
import { baseLayout } from "../templates/layout.js";

export const MailService = {
  /**
   * Internal dispatcher with Debug/Simulation support
   */
  async _send(to, subject, html) {
    if (process.env.MAIL_DEBUG_MODE === "true") {
      console.log(`[MAIL_DEBUG] To: ${to} | Subject: ${subject}`);
      return { success: true, messageId: "debug-mode-active" };
    }
    return await transport.send({ to, subject, html });
  },

  /**
   * OTP Verification Email
   */
  async sendOTP(email, otp, purpose) {
    let title = "Security Verification";
    let message = "Your verification code is:";

    // Customize message based on hospital action
    if (purpose === "PASSWORD_RESET") {
      title = "Password Reset Request";
      message = "Use this code to reset your clinical account password:";
    } else if (purpose === "APPOINTMENT_CONFIRMATION") {
      title = "Appointment Authorization";
      message = "Enter this code to confirm your surgery/appointment:";
    }

    const html = /* html */ `
      <p style="font-size: 16px;">${message}</p>
      <div style="background:#f1f5f9; padding:30px; text-align:center; border-radius:12px; margin: 20px 0;">
        <span style="font-size:38px; font-weight:900; letter-spacing:10px; color:#1A4F95;">${otp}</span>
      </div>
      <p style="color: #718096; font-size: 13px;">Code expires in 10 minutes. Please do not share this code with anyone, including Medix staff.</p>
    `;

    return await this._send(email, `${title}: ${otp}`, baseLayout(html, title));
  },
  /**
   * Appointment Confirmation
   */
  async sendAppointment(email, data) {
    const html = `
      <p>Hello <strong>${data.patientName}</strong>,</p>
      <p>Your appointment with <strong>Dr. ${data.doctorName}</strong> is confirmed.</p>
      <p><strong>Time:</strong> ${data.appointmentTime}</p>
      <a href="${process.env.FRONTEND_URL}/dashboard" class="btn">View Appointment Details</a>
    `;
    return this._send(email, "Appointment Confirmed", baseLayout(html, "Appointment Details"));
  },
};
