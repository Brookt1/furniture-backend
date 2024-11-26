const express = require("express");
const dotenv = require("dotenv");
const furnitureRoutes = require("./routes/furnitureRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const cors = require("cors");
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello There!");
});

app.use("/api/furniture", furnitureRoutes);
app.use("/api/categories", categoryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
