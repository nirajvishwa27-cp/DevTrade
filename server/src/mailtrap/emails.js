import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { resend, sender } from "./mailtrap.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const response = await resend.emails.send({
      from: sender,
      to: email,
      subject: "Email Verification",
      html: `
        <h2>Hello your verification code is ${verificationToken}</h2>
      `,
    });

    console.log("Verification email sent:", response);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const response = await resend.emails.send({
      from: sender,
      to: email,
      subject: "Welcome to our app!",
      html: `
        <h2>Hello ${name},</h2>
        <p>Welcome! Your dashboard is ready:</p>
        <a href="${process.env.CLIENT_URL}/dashboard">Open Dashboard</a>
        <p>Help Center: Authentication</p>
      `,
    });

    console.log("Welcome email sent:", response);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const response = await resend.emails.send({
      from: sender,
      to: email,
      subject: "Reset Your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    });

    console.log("Password reset email sent:", response);
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const response = await resend.emails.send({
      from: sender,
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE.replace("{supportLink}", `${process.env.CLIENT_URL}/support`),
    });

    console.log("Password reset success email sent:", response);
  } catch (error) {
    console.error("Error sending password reset success email:", error);
    throw new Error("Failed to send password reset success email");
  }
};
