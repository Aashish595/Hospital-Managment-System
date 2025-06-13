import connectDB from "@/config/db";
import User from "@/models/User";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function GET(req, {params}){ // bad habbit _ , _ID , good -> req 
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }
        await connectDB();
        const user = await User.findById(params._id);
        return NextResponse.json(user);
        
    } catch (error) {
        console.error("Error fetching user:" , error);
        return NextResponse.json({error: "failed to fetch user " , status:500});
    }
}

export async function PUT(req, {params}){ 
    try {
        const { userId } = getAuth(req);
        if (!userId) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }
           await connectDB();
           const body = await req.json();
           const user = await User.findByIdAndUpdate(
               params._id,
               {
                   name: body.name,
                   email: body.email,
                   role: body.role,
                   phone: body.phone,
               },
               { new: true } // return the updated user
           );
           return NextResponse.json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({error: "failed to update user", status: 500});    
        
    }
}

export async function DELETE(req, {params}){ 
          try {
            const { userId } = getAuth(req);
            if (!userId) {
                return NextResponse.json(
                    { success: false, message: "Unauthorized" },
                    { status: 401 } 
                );
            }
                   await connectDB();
                   const user = await User.findByIdAndDelete(params._id);
                     if (!user) {
                          return NextResponse.json({error: "User not found", status: 404});
                     }
                     return NextResponse.json({message: "User deleted successfully", status: 200});
          } catch (error) {
            console.error("Error deleting user:", error);
            return NextResponse.json({error: "failed to delete user", status: 500});
          }
}