import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import NewsletterSubscriber from "@/models/NewsletterSubscriber";

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email || typeof email !== "string" || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "A valid email is required" }, { status: 400 });
  }

  await dbConnect();
  await NewsletterSubscriber.updateOne(
    { email: email.toLowerCase() },
    { $setOnInsert: { email: email.toLowerCase(), subscribedAt: new Date() } },
    { upsert: true }
  );

  return NextResponse.json({ ok: true });
}
