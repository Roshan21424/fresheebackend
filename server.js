import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import jobsRouter from "./routes/jobs.js";

const app = express();

console.log("🔥 FRESHEES DEPLOY TEST V2");

app.get("/", (req, res) => {
  res.json({
    message: "Freshees backend is alive",
    version: "V2"
  });
});

app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobsRouter);

await connectDB();

const port = process.env.PORT || 5000;

app.listen(port, "0.0.0.0", () => {
  console.log(`Freshees API running on port ${port}`);
});