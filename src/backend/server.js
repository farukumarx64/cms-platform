import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { execFile } from "child_process";

const app = express();
const PORT = 5000;

app.use(cors());

// Apply rate limiting middleware
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute window
  max: 10, // Max 10 requests per minute
  message: "Too many requests from this IP, please try again later.",
});

app.use("/generate-ticket", limiter);

app.get("/generate-ticket", (req, res) => {
  execFile("./generate-ticket/output/generate-ticket", (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing child process: ${err}`);
      console.error(`Child process stderr: ${stderr}`);
      return res.status(500).json({ error: "Error generating ticket ID" });
    }
    const ticketID = stdout.trim();
    res.json({ ticketID });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
