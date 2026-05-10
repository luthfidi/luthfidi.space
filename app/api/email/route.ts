import { NextResponse } from "next/server";
import { Resend } from "resend";

const FROM_ADDRESS =
  process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
const TO_ADDRESS =
  process.env.NEXT_PUBLIC_AUTHOR_EMAIL || "luthfihadi543@gmail.com";

const buildHtml = ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) => `
  <div style="font-family: sans-serif; max-width: 600px; margin: auto; border: 1px solid #eee; padding: 20px; border-radius: 10px;">
    <h2 style="color: #333; border-bottom: 2px solid #0070f3; padding-bottom: 10px;">Pesan Baru dari Portfolio</h2>
    <p style="font-size: 16px; color: #555;">Anda mendapatkan pesan baru dari pengunjung situs.</p>

    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px 0; color: #888; width: 100px;">Nama:</td>
        <td style="padding: 10px 0; font-weight: bold; color: #333;">${name}</td>
      </tr>
      <tr>
        <td style="padding: 10px 0; color: #888;">Email:</td>
        <td style="padding: 10px 0; font-weight: bold; color: #333;">${email}</td>
      </tr>
    </table>

    <div style="margin-top: 20px; padding: 15px; background-color: #f9f9f9; border-left: 4px solid #0070f3; color: #444; font-style: italic;">
      "${message}"
    </div>

    <footer style="margin-top: 30px; font-size: 12px; color: #aaa; text-align: center;">
      Pesan ini dikirim otomatis dari portfolio.
    </footer>
  </div>
`;

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Semua field (nama, email, pesan) wajib diisi." },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.warn(
        "[email] RESEND_API_KEY missing — logging payload instead of sending.",
      );
      console.info("[email] Contact form submission:", { name, email, message });
      return NextResponse.json(
        { message: "Email berhasil dikirim!" },
        { status: 200 },
      );
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: TO_ADDRESS,
      replyTo: email,
      subject: `🚀 Contact Form: ${name}`,
      text: `${message} | Dikirim oleh: ${email}`,
      html: buildHtml({ name, email, message }),
    });

    if (error) {
      console.error("[email] Resend error:", error);
      return NextResponse.json(
        { message: "Gagal mengirim email" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Email berhasil dikirim!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("[email] Unexpected error:", error);
    return NextResponse.json(
      { message: "Gagal mengirim email" },
      { status: 500 },
    );
  }
};
