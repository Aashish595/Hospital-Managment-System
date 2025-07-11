import connectDB from "@/config/db";
import Appointment from "@/models/Appointment";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const {userId} = getAuth(req);
    if (!userId) {
        return NextResponse.json(
            { success: false, message: "Unauthorized" },
            { status: 401 }
        );
    }
  await connectDB();
  const appointment = await Appointment.findById(params.id)
    .populate("patient")
    .populate("doctor");
  return NextResponse.json(appointment);
}

export async function PUT(req, { params }) {
    const {userId} = getAuth(req);
        if (!userId) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }
  await connectDB();
  const data = await req.json();
  const updated = await Appointment.findByIdAndUpdate(params.id, data, {
    new: true,
  });
  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
    const {userId} = getAuth(req);
            if (!userId) {
                return NextResponse.json(
                    { success: false, message: "Unauthorized" },
                    { status: 401 }
                );
            }
  await connectDB();
  await Appointment.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Appointment deleted" });
}
