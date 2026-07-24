import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SubmitGame from "@/models/SubmitGame";

export async function POST(req: Request) {
  const { studioName, contactEmail, gameTitle, gameDescription, links } = await req.json();

  if (!studioName || !contactEmail || !gameTitle || !gameDescription) {
    return NextResponse.json({ error: "Required fields are missing" }, { status: 400 });
  }

  await dbConnect();
  await SubmitGame.create({ studioName, contactEmail, gameTitle, gameDescription, links });

  return NextResponse.json({ ok: true });
}
