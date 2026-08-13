import { Router } from "express";
import Job from "../models/Job.js";

const router = Router();

// shared gate for every write route (POST / PUT / DELETE)
function requireAdmin(req, res, next) {
  if (req.headers["x-admin-key"] !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
}

// GET /api/jobs?search=&category=
router.get("/", async (req, res) => {
  const { search, category } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (search) {
    filter.$or = [
      { company: new RegExp(search, "i") },
      { role: new RegExp(search, "i") }
    ];
  }
  const jobs = await Job.find(filter).sort({ postedAt: -1 });
  res.json(jobs);
});

// GET /api/jobs/categories  (must come before /:id)
router.get("/categories", async (_req, res) => {
  const categories = await Job.distinct("category");
  res.json(categories);
});

// GET /api/jobs/:jobId
router.get("/:jobId", async (req, res) => {
  const job = await Job.findOne({ jobId: req.params.jobId });
  if (!job) return res.status(404).json({ error: "Job not found" });
  res.json(job);
});

// POST /api/jobs  (create)
router.post("/", requireAdmin, async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({ error: "jobId already exists" });
    }
    res.status(400).json({ error: err.message });
  }
});

// PUT /api/jobs/:jobId  (update)
router.put("/:jobId", requireAdmin, async (req, res) => {
  const job = await Job.findOneAndUpdate(
    { jobId: req.params.jobId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) return res.status(404).json({ error: "Job not found" });
  res.json(job);
});

// DELETE /api/jobs/:jobId
router.delete("/:jobId", requireAdmin, async (req, res) => {
  const job = await Job.findOneAndDelete({ jobId: req.params.jobId });
  if (!job) return res.status(404).json({ error: "Job not found" });
  res.json({ success: true });
});

// POST /api/jobs/verify-admin  (lets the frontend check a key without creating anything)
router.post("/verify-admin", requireAdmin, (_req, res) => {
  res.json({ ok: true });
});

export default router;