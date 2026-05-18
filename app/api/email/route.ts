import { NextResponse } from "next/server";
import { Resend } from "resend";

const FROM_ADDRESS =
  process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";
const TO_ADDRESS =
  process.env.NEXT_PUBLIC_AUTHOR_EMAIL || "luthfihadi543@gmail.com";

const escapeHtml = (text: string): string =>
  text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const buildHtml = ({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) => {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br />");
  const timestamp = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Jakarta",
  }).format(new Date());

  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Pesan baru dari portfolio</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1f2937;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f4f5f7; padding: 32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 560px; background-color: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);">
          <tr>
            <td style="background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%); padding: 28px 32px;">
              <div style="font-size: 12px; letter-spacing: 0.12em; text-transform: uppercase; color: rgba(255, 255, 255, 0.85); margin-bottom: 6px;">
                Luthfidi.space
              </div>
              <div style="font-size: 22px; font-weight: 600; color: #ffffff; line-height: 1.3;">
                Pesan baru dari portfolio
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding: 28px 32px 8px;">
              <div style="font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280; margin-bottom: 4px;">
                Dari
              </div>
              <div style="font-size: 16px; font-weight: 600; color: #111827; line-height: 1.4;">
                ${safeName}
              </div>
              <div style="font-size: 14px; margin-top: 2px;">
                <a href="mailto:${safeEmail}" style="color: #3b82f6; text-decoration: none;">${safeEmail}</a>
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding: 16px 32px 0;">
              <div style="font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280; margin-bottom: 8px;">
                Pesan
              </div>
              <div style="font-size: 15px; line-height: 1.6; color: #1f2937; background-color: #f9fafb; border-left: 3px solid #60a5fa; padding: 16px 18px; border-radius: 6px;">
                ${safeMessage}
              </div>
            </td>
          </tr>

          <tr>
            <td style="padding: 24px 32px 32px;">
              <a href="mailto:${safeEmail}?subject=Re%3A%20Pesan%20kamu%20di%20portfolio" style="display: inline-block; background-color: #3b82f6; color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 500; padding: 10px 18px; border-radius: 8px;">
                Balas ke ${safeName}
              </a>
            </td>
          </tr>

          <tr>
            <td style="padding: 16px 32px 24px; border-top: 1px solid #e5e7eb;">
              <div style="font-size: 12px; color: #9ca3af; line-height: 1.5;">
                Dikirim ${timestamp} — lewat form kontak di
                <a href="https://luthfidi.space" style="color: #6b7280; text-decoration: underline;">luthfidi.space</a>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

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
      subject: `Pesan baru dari ${name} — portfolio`,
      text: `Pesan baru dari portfolio luthfidi.space\n\nDari: ${name} <${email}>\n\n${message}\n\n—\nBalas: ${email}`,
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
