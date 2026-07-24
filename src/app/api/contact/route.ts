import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import ContactSubmission from "@/models/ContactSubmission";

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }

  await dbConnect();
  await ContactSubmission.create({ name, email, subject, message });

  return NextResponse.json({ ok: true });
}
