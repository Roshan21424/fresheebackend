import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import jobsRouter from "./routes/jobs.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/jobs", jobsRouter);

await connectDB();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Freshees API running on port ${port}`));
