import connectDB from "@/config/db";
import Doctor from "@/models/Doctor";
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
  const doctors = await Doctor.find().populate("user").populate("department");
  return NextResponse.json(doctors);
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
  const doctor = await Doctor.create(body);
  return NextResponse.json(doctor);
}
