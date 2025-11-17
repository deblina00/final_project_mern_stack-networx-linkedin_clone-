const transporter = require("./mailer");
const ejs = require("ejs");
const path = require("path");

async function sendEmail(to, templateName, data, subject) {
  try {
    const templatePath = path.join(
      __dirname,
      "../email-templates",
      `${templateName}.ejs`
    );

    const html = await ejs.renderFile(templatePath, data);

    await transporter.sendMail({
      from: `"Networx Support" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });

    console.log(`✅ Email sent to ${to} with template ${templateName}`);
  } catch (err) {
    console.error("❌ Error sending email:", err);
  }
}

module.exports = sendEmail;
