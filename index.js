const express = require("express");
const mongoose = require("mongoose");
const { dbConnection } = require("./database/config");
const cors = require("cors");
require("dotenv").config();

const app = express();

// DB
dbConnection();

//CORS
app.use(cors());

// public dir
app.use(express.static("public"));

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth-routes"));
app.use("/api/events", require("./routes/calendar-events-routes"));

//Digital Ocean health check
app.get("/api/health", (req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;
  const jwtSecretConfigured = !!process.env.JWT_SECRET;

  if (dbConnected && jwtSecretConfigured) {
    return res.status(200).json({
      ok: true,
      db: "MongoDB is connected",
      jwt: "JWT secret is configured",
    });
  }

  return res.status(500).json({
    ok: false,
    db: dbConnected ? "MongoDB is connected" : "MongoDB is disconnected",
    jwt: jwtSecretConfigured
      ? "JWT secret is configured"
      : "JWT secret is missing",
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
