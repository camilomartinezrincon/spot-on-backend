const express = require("express");
const { dbConnection } = require("./database/config");
require("dotenv").config();

const app = express();

// DB
dbConnection();

// public dir
app.use(express.static("public"));

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth-routes"));
//TODO: CRUD

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
