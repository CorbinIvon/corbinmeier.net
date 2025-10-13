import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Return total clicks using COUNT(id)
    const total = await prisma.clicks.count({});

    // last click timestamp
    const last = await prisma.clicks.findFirst({
      orderBy: { created_at: "desc" },
      select: { created_at: true },
    });

    // counts in last 1 hour and 24 hours
    const oneHourAgo = new Date(Date.now() - 1000 * 60 * 60);
    const oneDayAgo = new Date(Date.now() - 1000 * 60 * 60 * 24);

    const lastHourCount = await prisma.clicks.count({
      where: { created_at: { gte: oneHourAgo } },
    });

    const last24hCount = await prisma.clicks.count({
      where: { created_at: { gte: oneDayAgo } },
    });

    const count = total ?? 0;
    return NextResponse.json({
      count,
      lastClick: last?.created_at ?? null,
      lastHourCount,
      last24hCount,
      source: "db",
    });
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
      // Return updated counts and timestamps
      const total = await prisma.clicks.count();

      const last = await prisma.clicks.findFirst({
        orderBy: { created_at: "desc" },
        select: { created_at: true },
      });

      const oneHourAgo = new Date(Date.now() - 1000 * 60 * 60);
      const oneDayAgo = new Date(Date.now() - 1000 * 60 * 60 * 24);

      const lastHourCount = await prisma.clicks.count({
        where: { created_at: { gte: oneHourAgo } },
      });

      const last24hCount = await prisma.clicks.count({
        where: { created_at: { gte: oneDayAgo } },
      });

      const count = total ?? 0;
      return NextResponse.json({
        count,
        lastClick: last?.created_at ?? null,
        lastHourCount,
        last24hCount,
        source: "db",
      });
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
