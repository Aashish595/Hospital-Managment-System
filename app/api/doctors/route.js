import connectDB from "@/config/db";
import Doctor from "@/models/Doctor";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const doctors = await Doctor.find().populate("user").populate("department");
  return NextResponse.json(doctors);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const doctor = await Doctor.create(body);
  return NextResponse.json(doctor);
}
