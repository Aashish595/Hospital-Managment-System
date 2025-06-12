import connectDB from "@/config/db";
import Appointment from "@/models/Appointment";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();
  const appointments = await Appointment.find()
    .populate("patient")
    .populate("doctor");
  return NextResponse.json(appointments);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();
  const appointment = await Appointment.create(body);
  return NextResponse.json(appointment);
}
