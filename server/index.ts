import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const httpServer = createServer(app);

// Serve static files from the client build directory
app.use(express.static(path.join(__dirname, "../client")));

// Serve index.html for all other routes (SPA)
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});

// ALWAYS serve the app on the port specified in the environment variable PORT
// Other ports are firewalled. Default to 5000 if not specified.
// this serves both the API and the client.
// It is the only port that is not firewalled.
const port = parseInt(process.env.PORT || "5000", 10);
httpServer.listen(
  {
    port,
    host: "127.0.0.1",
  },
  () => {
    console.log(`serving on port ${port}`);
  },
);
