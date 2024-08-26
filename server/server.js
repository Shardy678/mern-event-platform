const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use("/api/events", require("./routes/events"));
app.use("/api/auth", require("./routes/auth"));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
