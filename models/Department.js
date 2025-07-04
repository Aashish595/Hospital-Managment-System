import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
});

export default mongoose.models.Department || mongoose.model("Department", departmentSchema);
