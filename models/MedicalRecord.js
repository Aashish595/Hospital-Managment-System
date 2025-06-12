import mongoose from "mongoose";

const medicalRecordSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
  diagnosis: { type: String, required: true },
  prescription: { type: String },
  visitDate: { type: Date, default: Date.now },
  notes: { type: String },
});

export default mongoose.models.MedicalRecord || mongoose.model("MedicalRecord", medicalRecordSchema);
