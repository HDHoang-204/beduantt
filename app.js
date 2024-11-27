
const express = require('express');
const cors = require('cors')
const connectDB = require('./config/db.js');
const SanPhamRouter = require('./routes/sanphamRouter.js');


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());


connectDB();


app.use("/api/sanpham", SanPhamRouter)

app.get('/', (req, res) => {
    res.send('Welcome to my Node.js backend project');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
