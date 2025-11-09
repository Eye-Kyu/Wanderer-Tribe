import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { firstName, lastName, email, travellers, date, length, details } = await req.json();

        const subject = `New trip inquiry from ${firstName} ${lastName}`;

        // Send booking email to your Zoho inbox
        await resend.emails.send({
            from: "Wanderer Tribe <booking@wanderertribe.ke>", // verified sender
            to: "booking@wanderertribe.ke",
            replyTo: email,
            subject,
            html: `
        <div style="font-family: 'Segoe UI', sans-serif; color: #333;">
          <h2 style="color:#1A4D2E;">🌍 New Trip Booking Inquiry</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Travellers:</strong> ${travellers}</p>
          <p><strong>Preferred Date:</strong> ${date || "Not specified"}</p>
          <p><strong>Trip Length:</strong> ${length}</p>
          <p><strong>Details:</strong></p>
          <p style="white-space: pre-line; background: #f8f8f8; padding: 10px; border-radius: 8px;">${details}</p>
        </div>
      `,
        });

        // Optional: Auto-reply to client
        await resend.emails.send({
            from: "Wanderer Tribe <booking@wanderertribe.ke>",
            to: email,
            subject: "Thank you for planning your journey with Wanderer Tribe 🌿",
            html: `
        <div style="font-family: 'Segoe UI', sans-serif; color: #333;">
          <h2 style="color:#1A4D2E;">Hello ${firstName},</h2>
          <p>Thank you for reaching out to <strong>Wanderer Tribe</strong>! We've received your trip inquiry and our travel experts will get in touch soon to craft your personalized experience.</p>
          <p style="margin-top: 1em;">Safe travels,<br/><strong>The Wanderer Tribe Team</strong></p>
          <hr/>
          <p style="font-size: 12px; color: #888;">© ${new Date().getFullYear()} Wanderer Tribe. All rights reserved.</p>
        </div>
      `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error sending booking email:", error);
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}
