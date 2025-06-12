import connectDB from "@/config/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    await connectDB();
    const users = await User.find();
    return NextResponse.json(users);
  
}

export async function POST(req){
    await connectDB();
    const body = await req.json();
    const user = await User.create({body})
    return NextResponse.json(user, {status: 201});
}
