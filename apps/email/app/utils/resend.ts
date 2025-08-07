import { Resend } from "resend";

/**
 * Global Resend configuration
 * @returns The Resend object to work with
*/
export const resend = new Resend(process.env.RESEND_API_KEY)