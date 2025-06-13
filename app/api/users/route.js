import connectDB from "@/config/db";
import User from "@/models/User";
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
    const users = await User.find();
    return NextResponse.json(users);
  
}

export async function POST(req){
    const { userId } = getAuth(req);
    if (!userId) {
        return NextResponse.json(
            { success: false, message: "Unauthorized" },
            { status: 401 }
        );
    }
    await connectDB();
    const body = await req.json();
    const user = await User.create({body})
    return NextResponse.json(user, {status: 201});
}
