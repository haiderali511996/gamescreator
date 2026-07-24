import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SubmitGame from "@/models/SubmitGame";
import { requireAdminSession } from "@/lib/requireAdmin";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { status } = await req.json();
  await dbConnect();
  const submission = await SubmitGame.findByIdAndUpdate(id, { status }, { new: true });
  return NextResponse.json(submission);
}
