import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

function toBoolean(value) {
  if (typeof value === "boolean") return value;
  return String(value).toLowerCase() === "true";
}

function getSmtpConfig() {
  const host = process.env.YANDEX_SMTP_HOST;
  const port = Number(process.env.YANDEX_SMTP_PORT);
  const secure = toBoolean(process.env.YANDEX_SMTP_SECURE);
  const user = process.env.YANDEX_SMTP_USER;
  const pass = process.env.YANDEX_SMTP_PASS;
  const toEmail = process.env.FEEDBACK_TO_EMAIL;
  const fromEmail = process.env.FEEDBACK_FROM_EMAIL;

  const requiredValues = {
    YANDEX_SMTP_HOST: host,
    YANDEX_SMTP_PORT: port,
    YANDEX_SMTP_USER: user,
    YANDEX_SMTP_PASS: pass,
    FEEDBACK_TO_EMAIL: toEmail,
    FEEDBACK_FROM_EMAIL: fromEmail
  };

  for (const [key, val] of Object.entries(requiredValues)) {
    if (!val || (key === "YANDEX_SMTP_PORT" && Number.isNaN(val))) {
      throw new Error(`Missing or invalid env: ${key}`);
    }
  }

  return { host, port, secure, user, pass, toEmail, fromEmail };
}

function validatePayload(data) {
  const name = typeof data?.name === "string" ? data.name.trim() : "";
  const contact = typeof data?.contact === "string" ? data.contact.trim() : "";
  const message = typeof data?.message === "string" ? data.message.trim() : "";

  if (!name || !contact || !message) {
    return { error: "Заполните все поля формы." };
  }

  if (name.length > 120 || contact.length > 200 || message.length > 4000) {
    return { error: "Слишком длинное значение в одном из полей." };
  }

  return { name, contact, message };
}

export async function POST(request) {
  try {
    const body = await request.json();
    const parsed = validatePayload(body);
    if (parsed.error) {
      return NextResponse.json({ ok: false, error: parsed.error }, { status: 400 });
    }

    const config = getSmtpConfig();
    const transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure,
      auth: {
        user: config.user,
        pass: config.pass
      }
    });

    await transporter.sendMail({
      from: config.fromEmail,
      to: config.toEmail,
      subject: "Новая заявка с формы обратной связи",
      text: [
        "Получена новая заявка с сайта.",
        "",
        `Имя: ${parsed.name}`,
        `Контакт: ${parsed.contact}`,
        "Комментарий:",
        parsed.message
      ].join("\n")
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Feedback email send failed:", error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { ok: false, error: "Некорректный формат запроса." },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message.startsWith("Missing or invalid env:")) {
      return NextResponse.json(
        { ok: false, error: "Почтовый сервис не настроен на сервере." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { ok: false, error: "Не удалось отправить заявку. Попробуйте позже." },
      { status: 500 }
    );
  }
}
