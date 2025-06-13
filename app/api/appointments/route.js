import connectDB from "@/config/db";
import Appointment from "@/models/Appointment";
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
  const appointments = await Appointment.find()
    .populate("patient")
    .populate("doctor");
  return NextResponse.json(appointments);
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
  const appointment = await Appointment.create(body);
  return NextResponse.json(appointment);
}
