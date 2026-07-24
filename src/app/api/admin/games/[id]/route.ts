import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Game from "@/models/Game";
import { requireAdminSession } from "@/lib/requireAdmin";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await dbConnect();
  const game = await Game.findById(id).lean();
  if (!game) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(game);
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  await dbConnect();
  const game = await Game.findByIdAndUpdate(id, body, { new: true });
  return NextResponse.json(game);
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  await dbConnect();
  await Game.findByIdAndDelete(id);
  return NextResponse.json({ ok: true });
}
