const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db.js");
const SanPhamRouter = require("./routes/sanphamRouter.js");
const userRouter = require("./routes/userRouter.js");
const dotennv = require("dotenv/config")
const app = express();
const PORT = process.env.PORT || 3000;



app.use(cors());
app.use(express.json());


connectDB();

// Routes
app.use("/api/sanpham", SanPhamRouter);
app.use("/api/user", userRouter)

// Route gốc
app.get("/", (req, res) => {
    res.send("Welcome to my Node.js backend project");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});