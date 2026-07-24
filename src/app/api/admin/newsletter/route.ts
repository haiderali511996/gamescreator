import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import NewsletterSubscriber from "@/models/NewsletterSubscriber";
import { requireAdminSession } from "@/lib/requireAdmin";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const subscribers = await NewsletterSubscriber.find().sort({ subscribedAt: -1 }).lean();
  return NextResponse.json(subscribers);
}
