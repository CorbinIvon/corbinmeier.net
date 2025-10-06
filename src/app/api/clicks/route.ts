import { NextResponse } from "next/server";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

const dataPath = join(process.cwd(), "src", "data", "global-clicks.json");

function readCount() {
  if (!existsSync(dataPath)) {
    return { count: 0 };
  }
  const raw = readFileSync(dataPath, "utf8");
  try {
    return JSON.parse(raw);
  } catch (e) {
    return { count: 0 };
  }
}

function writeCount(obj: { count: number }) {
  writeFileSync(dataPath, JSON.stringify(obj, null, 2), "utf8");
}

export async function GET() {
  const data = readCount();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || body.action !== "Increment-Count") {
      return NextResponse.json({ error: "invalid action" }, { status: 400 });
    }

    const data = readCount();
    data.count = (data.count || 0) + 1;
    writeCount(data);
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "invalid request" }, { status: 400 });
  }
}
