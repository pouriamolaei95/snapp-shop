import { products } from "@/lib/const/mock-data";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(products);
}
