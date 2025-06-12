import connectDB from "@/config/db";
import Appointment from "@/models/Appointment";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectDB();
  const appointment = await Appointment.findById(params.id)
    .populate("patient")
    .populate("doctor");
  return NextResponse.json(appointment);
}

export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();
  const updated = await Appointment.findByIdAndUpdate(params.id, data, {
    new: true,
  });
  return NextResponse.json(updated);
}

export async function DELETE(_, { params }) {
  await connectDB();
  await Appointment.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Appointment deleted" });
}
