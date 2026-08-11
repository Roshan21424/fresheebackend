import mongoose from "mongoose";

const skillGroupSchema = new mongoose.Schema(
  {
    category: String, // e.g. "Languages", "Backend", "Frontend", "CI/CD"
    items: [String]
  },
  { _id: false }
);

const jobSchema = new mongoose.Schema({
  jobId: { type: String, required: true, unique: true }, // e.g. FR-1042
  company: { type: String, required: true },
  role: { type: String, required: true },
  roleType: { type: String, required: true }, // Full-time / Internship
  location: { type: String, required: true },
  salary: { type: String, default: "Not disclosed" },
  category: { type: String, required: true }, // used by the category filter chips
  skills: [skillGroupSchema], // grouped so the UI can show "Backend: Node, Express"

  // detail panel — kept short, point-by-point, no fluff
  aboutRole: { type: String, required: true }, // 1-2 line crux
  responsibilities: [String],
  qualifications: [String],
  preferredQualifications: [String],
  benefits: [String],
  aboutCompany: { type: String, required: true }, // 1-2 line crux

  applyLink: { type: String, required: true },
  postedAt: { type: Date, default: Date.now }
});

export default mongoose.model("Job", jobSchema);