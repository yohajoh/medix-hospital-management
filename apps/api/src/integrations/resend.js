import { Resend } from "resend";

const resendClient = new Resend(process.env.RESEND_API_KEY);

export const transport = {
  send: async ({ to, subject, html, from, replyTo }) => {
    try {
      const { data, error } = await resendClient.emails.send({
        from:
          from ||
          `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
        to,
        subject,
        html,
        reply_to: replyTo || process.env.MAIL_REPLY_TO,
      });

      if (error) throw error;
      return { success: true, messageId: data.id };
    } catch (error) {
      console.error("[Mail Transport Error]:", error);
      return { success: false, error: error.message };
    }
  },
};
