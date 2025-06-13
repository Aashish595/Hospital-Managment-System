import connectDB from "@/config/db";
import MedicalRecord from "@/models/MedicalRecord";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req, { params }) {
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  await connectDB();
  const record = await MedicalRecord.findById(params.id)
    .populate("patient")
    .populate("doctor");
  return NextResponse.json(record);
}

export async function PUT(req, { params }) {
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }

  await connectDB();
  const data = await req.json();
  const updated = await MedicalRecord.findByIdAndUpdate(params.id, data, {
    new: true,
  });
  return NextResponse.json(updated);
}

export async function DELETE(req, { params }) {
  const { userId } = getAuth(req);
  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  await connectDB();
  await MedicalRecord.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Medical record deleted" });
}
