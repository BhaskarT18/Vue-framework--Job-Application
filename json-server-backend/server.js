const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const FILE_PATH = './jobs.json';

// Function to read jobs data
const readJobs = () => {
  const data = fs.readFileSync(FILE_PATH);
  return JSON.parse(data);
};

// GET all jobs
app.get("/jobs", (req, res) => {
  res.json(readJobs().jobs);
});

// GET a job by ID
app.get("/jobs/:id", (req, res) => {
  const jobs = readJobs().jobs;
  const job = jobs.find((j) => j.id === req.params.id);
  if (job) {
    res.json(job);
  } else {
    res.status(404).json({ message: "Job not found" });
  }
});

// POST a new job
app.post("/jobs", (req, res) => {
  const jobsData = readJobs();
  const newJob = { id: (jobsData.jobs.length + 1).toString(), ...req.body };
  jobsData.jobs.push(newJob);
  fs.writeFileSync(FILE_PATH, JSON.stringify(jobsData, null, 2));
  res.status(201).json(newJob);
});

// PUT (Update) a job by ID
app.put("/jobs/:id", (req, res) => {
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
app.delete("/jobs/:id", (req, res) => {
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
