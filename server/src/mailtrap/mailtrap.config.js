import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

export const resend = new Resend(process.env.RESEND_API_KEY);

// Sender email allowed without domain verification
export const sender = "s.s.y.9321423@gmail.com";
