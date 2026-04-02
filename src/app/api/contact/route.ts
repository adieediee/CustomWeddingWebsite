import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
    od?: string;
    message?: string;
};

const REQUIRED_ENV = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "MAIL_TO"] as const;

function missingEnvVar(): string | null {
    for (const key of REQUIRED_ENV) {
        if (!process.env[key]) return key;
    }

    return null;
}

export const runtime = "nodejs";

export async function POST(request: Request) {
    const missingEnv = missingEnvVar();
    if (missingEnv) {
        return NextResponse.json(
            { error: `Missing environment variable: ${missingEnv}` },
            { status: 500 }
        );
    }

    let payload: ContactPayload;

    try {
        payload = (await request.json()) as ContactPayload;
    } catch {
        return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
    }

    const od = payload.od?.trim();
    const message = payload.message?.trim();

    if (!od || !message) {
        return NextResponse.json(
            { error: "Fields 'od' and 'message' are required." },
            { status: 400 }
        );
    }

    if (od.length > 120 || message.length > 5000) {
        return NextResponse.json(
            { error: "Input is too long." },
            { status: 400 }
        );
    }

    const smtpPort = Number(process.env.SMTP_PORT);
    if (!Number.isFinite(smtpPort)) {
        return NextResponse.json({ error: "SMTP_PORT must be a number." }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: process.env.MAIL_FROM ?? process.env.SMTP_USER,
            to: process.env.MAIL_TO,
            subject: `Svadobny odkaz od: ${od}`,
            text: `OD: ${od}\n\nODKAZ:\n${message}`,
            replyTo: process.env.MAIL_FROM ?? process.env.SMTP_USER,
        });

        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json(
            { error: "Could not send email." },
            { status: 500 }
        );
    }
}
