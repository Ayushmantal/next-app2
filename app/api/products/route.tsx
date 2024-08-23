import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

export function GET(request: NextRequest) {
  return NextResponse.json([
    { id: 1, name: "milk", price: 2.5 },
    { id: 2, name: "cake", price: 10.5 },
  ]);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validate = schema.safeParse(body);
  if (!validate.success)
    return NextResponse.json(validate.error.errors, { status: 400 });
  return NextResponse.json(
    { id: 10, name: body.name, price: body.price },
    { status: 201 }
  );
}
