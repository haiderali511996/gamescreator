import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import CareerPosting from "@/models/CareerPosting";
import { requireAdminSession } from "@/lib/requireAdmin";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const postings = await CareerPosting.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(postings);
}

export async function POST(req: Request) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  await dbConnect();
  const posting = await CareerPosting.create(body);
  return NextResponse.json(posting, { status: 201 });
}
