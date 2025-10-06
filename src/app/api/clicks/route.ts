import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Return total clicks using COUNT(id)
    const result = await prisma.clicks.count({});

    const count = result ?? 0;
    return NextResponse.json({ count, source: "db" });
  } catch (e) {
    // Database is unreachable or query failed. Do NOT return a fallback
    // count; caller should treat this as an unavailable service.
    // Log concise error message only to avoid printing large client stacks
    console.error(
      "Error reading click count from DB:",
      e instanceof Error ? e.message : String(e)
    );
    return NextResponse.json({ error: "service unavailable" }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || body.action !== "Increment-Count") {
      return NextResponse.json({ error: "invalid action" }, { status: 400 });
    }

    // Insert a single row into the clicks table
    try {
      await prisma.clicks.create({ data: {} });
      // Return updated count
      const result = await prisma.clicks.aggregate({ _count: { id: true } });
      const count = result._count?.id ?? 0;
      return NextResponse.json({ count, source: "db" });
    } catch (e) {
      // Writing failed because DB is unreachable or other DB error.
      console.error(
        "Error writing click to DB:",
        e instanceof Error ? e.message : String(e)
      );
      return NextResponse.json(
        { error: "service unavailable" },
        { status: 503 }
      );
    }
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }
}
