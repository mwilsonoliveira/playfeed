import { NextResponse } from "next/server";
import { getNews } from "@/lib/getNews";

export const revalidate = 3600; // 1h

export async function GET() {
  const news = await getNews();
  return NextResponse.json(news);
}