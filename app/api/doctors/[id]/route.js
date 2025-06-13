import connectDB from "@/config/db";
import Doctor from "@/models/Doctor";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";

export async function GET(req, { params }) {
  const {userId} = getAuth(req);
  if (!userId) {
    return NextResponse.json(
      { success: false, message: "Unauthorized" },
      { status: 401 }
    );
  }
  await connectDB();
  const doctor = await Doctor.findById(params.id)
    .populate("user")
    .populate("department");
  return NextResponse.json(doctor);
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
  const updated = await Doctor.findByIdAndUpdate(params.id, data, {
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
  await Doctor.findByIdAndDelete(params.id);
  return NextResponse.json({ message: "Doctor deleted" });
}
