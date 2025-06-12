import connectDB from "@/config/db";
import Doctor from "@/models/Doctor";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectDB();
  const doctor = await Doctor.findById(params.id)
    .populate("user")
    .populate("department");
  return NextResponse.json(doctor);
}

export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();
  const updated = await Doctor.findByIdAndUpdate(params.id, data, {
    new: true,
  });
  return NextResponse.json(updated);
}

export async function DELETE(_, { params }) {
  await connectDB();
  await Doctor.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Doctor deleted" });
}
