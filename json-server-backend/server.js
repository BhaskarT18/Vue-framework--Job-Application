const express = require("express");
const fs = require("fs");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid"); // Import UUID

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // Allow frontend requests
app.use(express.json());

const FILE_PATH = "./jobs.json";

// Function to read jobs data
const readJobs = () => {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      fs.writeFileSync(FILE_PATH, JSON.stringify({ jobs: [] }, null, 2));
    }
    return JSON.parse(fs.readFileSync(FILE_PATH, "utf8"));
  } catch (error) {
    console.error("Error reading jobs file:", error);
    return { jobs: [] };
  }
};

// GET all jobs
app.get("/api/jobs", (req, res) => {
  res.json(readJobs().jobs);
});

// GET a job by ID
app.get("/api/jobs/:id", (req, res) => {
  const jobs = readJobs().jobs;
  const job = jobs.find((j) => j.id === req.params.id);
  if (job) {
    res.json(job);
  } else {
    res.status(404).json({ message: "Job not found" });
  }
});

// POST a new job
app.post("/api/jobs", (req, res) => {
  const jobsData = readJobs();
  const newJob = { id: uuidv4(), ...req.body }; // Unique ID
  jobsData.jobs.push(newJob);
  fs.writeFileSync(FILE_PATH, JSON.stringify(jobsData, null, 2));
  res.status(201).json(newJob);
});

// PUT (Update) a job by ID
app.put("/api/jobs/:id", (req, res) => {
  const jobsData = readJobs();
  const jobIndex = jobsData.jobs.findIndex((j) => j.id === req.params.id);
  if (jobIndex !== -1) {
    jobsData.jobs[jobIndex] = { id: req.params.id, ...req.body };
    fs.writeFileSync(FILE_PATH, JSON.stringify(jobsData, null, 2));
    res.json(jobsData.jobs[jobIndex]);
  } else {
    res.status(404).json({ message: "Job not found" });
  }
});

// DELETE a job by ID
app.delete("/api/jobs/:id", (req, res) => {
  const jobsData = readJobs();
  const newJobs = jobsData.jobs.filter((j) => j.id !== req.params.id);
  if (newJobs.length !== jobsData.jobs.length) {
    jobsData.jobs = newJobs;
    fs.writeFileSync(FILE_PATH, JSON.stringify(jobsData, null, 2));
    res.json({ message: "Job deleted" });
  } else {
    res.status(404).json({ message: "Job not found" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
