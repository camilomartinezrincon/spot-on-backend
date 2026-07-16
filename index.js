const express = require("express");
require("dotenv").config();

const app = express();

// public dir
app.use(express.static("public"));

// Routes
app.use("/api/auth", require("./routes/auth"));
//TODO: CRUD

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
