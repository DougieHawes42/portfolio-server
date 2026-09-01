const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const userRoute = require("./routes/userRoutes");
const workRoute = require("./routes/workRoutes");
const blogRoute = require("./routes/blogRoutes");

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoute);
app.use("/api/work", workRoute);
app.use("/api/blog", blogRoute);

app.listen(PORT, () => console.log(`Express app running on port ${PORT}`));
