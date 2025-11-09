import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { firstName, lastName, email, travellers, date, length, details } = await req.json();

        const subject = `New trip inquiry from ${firstName} ${lastName}`;

        // === 1. Send inquiry to internal inboxes ===
        await resend.emails.send({
            from: "Wanderer Tribe <booking@wanderertribe.ke>",
            to: ["booking@wanderertribe.ke", "info@wanderertribe.ke"],
            replyTo: email,
            subject,
            html: `
        <div style="font-family: 'Segoe UI', sans-serif; color: #333; max-width:600px; margin:auto; background:#fff; border-radius:10px; box-shadow:0 2px 10px rgba(0,0,0,0.05); padding:20px;">
          <div style="text-align:center; padding:10px 0;">
            <img src="https://wanderertribe.ke/favicon/logo.png" alt="Wanderer Tribe" width="100" />
          </div>
          <h2 style="color:#1A4D2E;">🌍 New Trip Booking Inquiry</h2>
          <p><strong>Name:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Travellers:</strong> ${travellers}</p>
          <p><strong>Preferred Date:</strong> ${date || "Not specified"}</p>
          <p><strong>Trip Length:</strong> ${length}</p>
          <p><strong>Details:</strong></p>
          <p style="white-space: pre-line; background:#f8f8f8; padding:12px; border-radius:8px;">${details}</p>
          <hr style="margin:20px 0; border:none; border-top:1px solid #ddd;"/>
          <p style="font-size:12px; color:#777;">Sent from Wanderer Tribe website contact form</p>
        </div>
      `,
        });

        // === 2. Auto-reply confirmation email to client ===
        await resend.emails.send({
            from: "Wanderer Tribe <booking@wanderertribe.ke>",
            to: email,
            subject: "Your Wanderer Tribe inquiry has been received 🌿",
            html: `
        <div style="font-family:'Segoe UI',sans-serif; color:#333; max-width:600px; margin:auto; background:#f9fbfa; border-radius:10px; overflow:hidden;">
          <!-- Header -->
          <div style="background:#1A4D2E; color:#fff; text-align:center; padding:20px;">
            <img src="https://wanderertribe.ke/favicon/logo.png" alt="Wanderer Tribe" width="90" style="margin-bottom:10px;" />
            <h1 style="margin:0; font-size:22px;">Wanderer Tribe</h1>
            <p style="margin:5px 0 0; font-size:14px; letter-spacing:0.5px;">Discover Wonders Around the World</p>
          </div>

          <!-- Body -->
          <div style="padding:25px;">
            <h2 style="color:#1A4D2E;">Hello ${firstName},</h2>
            <p>Thank you for reaching out to <strong>Wanderer Tribe</strong>! We’re thrilled that you’re planning your journey with us.</p>
            <p>Our travel experts are reviewing your request and will reach out shortly to help design your perfect adventure.</p>
            <p style="margin-top:1em;">Until then, feel free to explore our destinations across <strong>Africa, Asia, and the Middle East</strong> — your next great escape might just be waiting there 🌍</p>

            <div style="margin-top:20px; text-align:center;">
              <a href="https://wanderertribe.ke" 
                 style="background:#1A4D2E; color:#fff; padding:12px 20px; border-radius:30px; text-decoration:none; font-weight:bold;">
                 Visit WandererTribe.ke
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="background:#f1f5f2; text-align:center; padding:15px; font-size:12px; color:#777;">
            <p>Follow us for travel inspiration ✈️</p>
            <p>
              <a href="https://www.instagram.com/" style="color:#1A4D2E; text-decoration:none; margin:0 6px;">Instagram</a> •
              <a href="https://www.facebook.com/" style="color:#1A4D2E; text-decoration:none; margin:0 6px;">Facebook</a> •
              <a href="https://wanderertribe.ke" style="color:#1A4D2E; text-decoration:none; margin:0 6px;">Website</a>
            </p>
            <p>© ${new Date().getFullYear()} Wanderer Tribe. All rights reserved.</p>
          </div>
        </div>
      `,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error sending booking email:", error);
        return NextResponse.json({ success: false, error }, { status: 500 });
    }
}
