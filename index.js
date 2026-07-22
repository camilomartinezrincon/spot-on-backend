const express = require("express");
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

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
