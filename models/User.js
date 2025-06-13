import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  Name: { type: String ,required: true},
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["admin", "doctor", "patient"],
    default: "patient",
  },
  phone: { type: String },
  gender: { type: String, enum: ["male", "female", "other"] },
  age: { type: Number },
  address: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.User || mongoose.model("User", userSchema);