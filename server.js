const cors = require("cors");
const express = require("express");

require("dotenv").config();

const PORT = process.env.PORT || 5000;

const app = express();

const authRoute = require("./routes/authRoutes");
const blogRoute = require("./routes/blogRoutes");
const profileRoute = require("./routes/profileRoutes");
const skillRoute = require("./routes/skillRoutes");
const workRoute = require("./routes/workRoutes");

app.use(express.json());
app.use(cors());

app.use("/api/home", (req, res) => {
  res.send("Home Route");
});
app.use("/api/auth", authRoute);
app.use("/api/blog", blogRoute);
app.use("/api/profile", profileRoute);
app.use("/api/skill", skillRoute);
app.use("/api/work", workRoute);

app.listen(PORT, () => console.log(`Express app running on port ${PORT}`));
