const express = require("express");
const dotenv = require("dotenv");
const furnitureRoutes = require("./routes/furnitureRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cors = require("cors");
const swaggerSetup = require("./swagger");
const cookieParser = require("cookie-parser");
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello There!");
});

app.use("/api/furniture", furnitureRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));
app.use("/api/order", require("./routes/orderRoutes"));

app.use("/api/review", require("./routes/reviewRoutes"));

swaggerSetup(app);
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
