import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Game from "@/models/Game";
import { requireAdminSession } from "@/lib/requireAdmin";

export async function GET() {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await dbConnect();
  const games = await Game.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(games);
}

export async function POST(req: Request) {
  const session = await requireAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  await dbConnect();
  const game = await Game.create(body);
  return NextResponse.json(game, { status: 201 });
}
