import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import fs from "fs";

import authRouter from "./routes/auth.js";
import uploadRouter from "./routes/upload.js";
import { createProjectRouter } from "./routes/projectRouter.js";
import blogsRouter from "./routes/blogs.js";
import miscRouter from "./routes/misc.js";
import categoriesRouter from "./routes/categories.js";
import newsletterAdminRouter from "./routes/newsletter.js";

const app = express();

const UPLOAD_DIR =
  process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads");

// Local development માટે uploads folder બનાવો
// Vercel filesystem permanent નથી, એટલે production uploads માટે Cloudinary recommend છે.
try {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
} catch (error) {
  console.warn("Upload directory could not be created:", error.message);
}

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json({ limit: "5mb" }));
app.use(morgan("dev"));

app.use("/uploads", express.static(UPLOAD_DIR));
app.use("/api/uploads", express.static(UPLOAD_DIR));

// Health check
app.get("/", (_req, res) => {
  res.json({
    ok: true,
    service: "etherauthority-api",
    message: "Backend is running",
  });
});

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "etherauthority-api",
  });
});

// API routes
app.use("/api/auth", authRouter);
app.use("/api/upload", uploadRouter);

app.use(
  "/api/games",
  createProjectRouter({
    model: "game",
    type: "game",
  })
);

app.use(
  "/api/dapps",
  createProjectRouter({
    model: "dapp",
    type: "dapp",
  })
);

app.use("/api/blogs", blogsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/admin/newsletter", newsletterAdminRouter);
app.use("/api", miscRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
  });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error("[error]", err);

  res.status(err.status || 500).json({
    error: err.message || "Server error",
  });
});

export default app;

// Local development only
if (process.env.NODE_ENV !== "production") {
  const PORT = parseInt(process.env.PORT || "8001", 10);

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[api] listening on http://localhost:${PORT}`);
  });
}
