import { Router } from "express";
import Job from "../models/Job.js";

const router = Router();

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

// POST /api/jobs  (simple admin-key gate, we're the only ones posting)
router.post("/", async (req, res) => {
  if (req.headers["x-admin-key"] !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const job = await Job.create(req.body);
  res.status(201).json(job);
});

export default router;
