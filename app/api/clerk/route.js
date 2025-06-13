import { Webhook } from "svix";
import connectDB from "@/config/db";
import User from "@/models/User";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

// POST route to handle Clerk 'user.created' webhook
export async function POST(req) {
  await connectDB();

  const SIGNING_SECRET = process.env.SIGNING_SECRET;
  if (!SIGNING_SECRET) {
    return NextResponse.json({ message: "Missing SIGNING_SECRET" }, { status: 500 });
  }

  const payload = await req.text();

  // Correctly extract the svix headers using `headers()`
  const headerList = headers();
  const headerPayload = {
    "svix-id": headerList.get("svix-id"),
    "svix-timestamp": headerList.get("svix-timestamp"),
    "svix-signature": headerList.get("svix-signature"),
  };

  const wh = new Webhook(SIGNING_SECRET);
  let evt;

  try {
    evt = wh.verify(payload, headerPayload);
  } catch (err) {
    console.error("Webhook verification failed:", err);
    return NextResponse.json({ message: "Webhook verification failed" }, { status: 400 });
  }

  const { id, email_addresses, first_name, last_name, phone_numbers } = evt.data;

  try {
    await User.create({
      clerkId: id,
      Name: `${first_name} ${last_name}`.trim(),
      email: email_addresses[0]?.email_address,
      phone: phone_numbers[0]?.phone_number || "",
      gender: "other",
      age: undefined,
      address: "",
    });

    return NextResponse.json({ message: "User stored successfully" }, { status: 201 });
  } catch (err) {
    console.error("Error saving user to MongoDB:", err);
    return NextResponse.json({ message: "Failed to store user", error: err.message }, { status: 500 });
  }
}
