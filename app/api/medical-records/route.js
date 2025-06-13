import connectDB from "@/config/db";
import MedicalRecord from "@/models/MedicalRecord";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req) {
    const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  await connectDB();
  const records = await MedicalRecord.find()
    .populate("patient")
    .populate("doctor");
  return NextResponse.json(records);
}

export async function POST(req) {
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  await connectDB();
  const body = await req.json();
  const record = await MedicalRecord.create(body);
  return NextResponse.json(record);
}
