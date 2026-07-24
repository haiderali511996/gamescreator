import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SubmitGame from "@/models/SubmitGame";
import ContactSubmission from "@/models/ContactSubmission";
import { requireAdminSession } from "@/lib/requireAdmin";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const [games, contacts] = await Promise.all([
    SubmitGame.find().sort({ createdAt: -1 }).lean(),
    ContactSubmission.find().sort({ createdAt: -1 }).lean(),
  ]);
  return NextResponse.json({ games, contacts });
}
