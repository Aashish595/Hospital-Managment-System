import connectDB from "@/config/db";
import MedicalRecord from "@/models/MedicalRecord";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const records = await MedicalRecord.find()
    .populate("patient")
    .populate("doctor");
  return NextResponse.json(records);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const record = await MedicalRecord.create(body);
  return NextResponse.json(record);
}
