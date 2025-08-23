const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { connectDB } = require("./config/db");
const { authRoutes } = require("./routes/authRoutes");
const { authMiddleware, isAdmin } = require("./middleware/authMiddleware");
const { cartRoutes } = require("./routes/cartRoutes");
const { bagRoutes } = require("./routes/bagRoutes");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

dotenv.config();
connectDB();

app.use(authRoutes);
app.use("/admin", isAdmin, bagRoutes);
app.use("/profile", authMiddleware, cartRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
