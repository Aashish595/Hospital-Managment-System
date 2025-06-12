import connectDB from "@/config/db";
import MedicalRecord from "@/models/MedicalRecord";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  await connectDB();
  const record = await MedicalRecord.findById(params.id)
    .populate("patient")
    .populate("doctor");
  return NextResponse.json(record);
}

export async function PUT(req, { params }) {
  await connectDB();
  const data = await req.json();
  const updated = await MedicalRecord.findByIdAndUpdate(params.id, data, {
    new: true,
  });
  return NextResponse.json(updated);
}

export async function DELETE(_, { params }) {
  await connectDB();
  await MedicalRecord.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Medical record deleted" });
}
