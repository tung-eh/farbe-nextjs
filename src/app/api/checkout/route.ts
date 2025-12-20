import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const data = Object.fromEntries(formData);

    return NextResponse.json({ data });
  } catch (error) {
    console.error("Error checking out:", error);
    return NextResponse.json({ error: "Error checking out" }, { status: 500 });
  }
}
