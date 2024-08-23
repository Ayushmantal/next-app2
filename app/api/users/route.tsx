import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

export function GET(request: NextRequest) {
  return NextResponse.json("hello");
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validate = schema.safeParse(body);
  if (!validate.success)
    return NextResponse.json(validate.error.errors, { status: 400 });
  return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
}
