// utils/emailTemplates.js
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

function otpTemplate({ f_name, otp }) {
  return {
    subject: "Your Networx verification code",
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.4; color:#111;">
        <h2>Hi ${f_name || "there"},</h2>
        <p>Your 6-digit verification <strong>OTP</strong> is:</p>
        <h1 style="letter-spacing:4px;">${otp}</h1>
        <p>This code is valid for 10 minutes. If you didn't request this, please ignore this email.</p>
        <p>Thanks,<br/>Networx Team</p>
      </div>
    `,
  };
}

function verifySuccessTemplate({ f_name }) {
  return {
    subject: "Your Networx account is verified",
    html: `<p>Hi ${f_name},</p><p>Your email has been successfully verified. You can now login at <a href="${FRONTEND_URL}">${FRONTEND_URL}</a></p><p>— Networx Team</p>`,
  };
}

function supportActionTemplate({ f_name, action, reason, supportTicketId }) {
  return {
    subject: `Account ${action} — Networx Support #${supportTicketId}`,
    html: `
      <p>Hi ${f_name},</p>
      <p>We want to inform you that the following action was taken on your account:</p>
      <ul>
        <li><strong>Action:</strong> ${action}</li>
        <li><strong>Reason:</strong> ${reason}</li>
        <li><strong>Ticket:</strong> ${supportTicketId}</li>
      </ul>
      <p>If you believe this is an error, please reply to this email and our support team will review your case.</p>
      <p>— Networx Support</p>
    `,
  };
}

module.exports = { otpTemplate, verifySuccessTemplate, supportActionTemplate };
