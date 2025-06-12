import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  specialization: { type: String, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  experience: { type: Number },
  availableDays: [{ type: String }],
  availableTime: { type: String },
});

export default mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
