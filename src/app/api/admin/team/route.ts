import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import TeamMember from "@/models/TeamMember";
import { requireAdminSession } from "@/lib/requireAdmin";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const members = await TeamMember.find().sort({ order: 1 }).lean();
  return NextResponse.json(members);
}

export async function POST(req: Request) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  await dbConnect();
  const member = await TeamMember.create(body);
  return NextResponse.json(member, { status: 201 });
}
