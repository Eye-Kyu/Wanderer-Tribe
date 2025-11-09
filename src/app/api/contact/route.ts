import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);


export async function POST(req: Request) {
    try {
        const { name, email, category, message, country } = await req.json();

        // --- HTML Template Function ---
        const generateEmailHTML = (
            title: string,
            content: string,
            footerNote = "This email was sent by Wanderer Tribe."
        ) => `
      <div style="font-family: 'Poppins', Arial, sans-serif; background:#FAF6EF; color:#0E2A2A; padding:20px;">
        <table style="max-width:600px; margin:auto; background:white; border-radius:12px; overflow:hidden; box-shadow:0 2px 10px rgba(0,0,0,0.08);">
          <tr>
            <td style="background:#0E2A2A; color:#FAF6EF; text-align:center; padding:24px;">
              <h1 style="margin:0; font-size:24px; letter-spacing:1px;">🌍 Wanderer Tribe</h1>
              <p style="margin:8px 0 0; font-size:14px;">Discover Wonders Around the World</p>
            </td>
          </tr>
          <tr>
            <td style="padding:30px;">
              <h2 style="color:#B5661F; font-size:20px; margin-bottom:16px;">${title}</h2>
              ${content}
              <hr style="margin:24px 0; border:none; border-top:1px solid #eee;">
              <p style="font-size:12px; color:#777;">${footerNote}</p>
            </td>
          </tr>
          <tr>
            <td style="background:#0E2A2A; color:#FAF6EF; text-align:center; padding:16px; font-size:12px;">
              &copy; ${new Date().getFullYear()} Wanderer Tribe. All rights reserved.<br>
              <a href="https://wanderertribe.ke" style="color:#B5661F; text-decoration:none;">wanderertribe.ke</a>
            </td>
          </tr>
        </table>
      </div>
    `;

        // --- 1️⃣ Email to your Wanderer Tribe inbox ---
        const adminContent = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Category:</strong> ${category || "General"}</p>
      <p><strong>Country:</strong> ${country || "Not specified"}</p>
      <p><strong>Message:</strong></p>
      <div style="background:#FAF6EF; padding:10px 14px; border-left:3px solid #B5661F; border-radius:8px;">
        ${message}
      </div>
    `;

        await resend.emails.send({
            from: "Wanderer Tribe <info@wanderertribe.ke>",
            to: "info@wanderertribe.ke",
            replyTo: email,
            subject: `New ${category || "contact"} inquiry from ${name}`,
            html: generateEmailHTML("New Website Inquiry", adminContent),
        });

        // --- 2️⃣ Auto-reply confirmation to the client ---
        const clientContent = `
      <p>Hi ${name || "Traveler"},</p>
      <p>Thank you for reaching out to <strong>Wanderer Tribe</strong>!</p>
      <p>We've received your message and our travel team will get back to you soon.</p>
      <p>Here's a copy of your message:</p>
      <blockquote style="border-left:3px solid #B5661F; padding-left:10px; color:#444; margin:10px 0;">
        ${message}
      </blockquote>
      <p>Warm regards,<br><strong>The Wanderer Tribe Team</strong></p>
    `;

        await resend.emails.send({
            from: "Wanderer Tribe <info@wanderertribe.ke>",
            to: email,
            subject: "We've received your message 🌍",
            html: generateEmailHTML(
                "We've received your message 🌍",
                clientContent,
                "This is an automated confirmation email from Wanderer Tribe."
            ),
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Email send failed:", error);
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}
