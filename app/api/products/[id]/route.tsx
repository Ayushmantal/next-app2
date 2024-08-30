import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/lib/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const products = await prisma.product.findUnique({
    where: { id: params.id },
  });
  if (!products)
    return NextResponse.json({ error: "Object not found" }, { status: 404 });
  return NextResponse.json(products);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const validation = schema.safeParse(body);
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 });

  const products = await prisma.product.findUnique({
    where: { id: params.id },
  });
  if (!products)
    return NextResponse.json({ error: "User not found" }, { status: 404 });

  const updateProduct = await prisma.product.update({
    where: { id: products.id },
    data: { name: body.name, price: body.price },
  });

  return NextResponse.json(updateProduct);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });
  if (!product)
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  const deleteUser = await prisma.product.delete({
    where: { id: product.id },
  });
  return NextResponse.json({});
}
