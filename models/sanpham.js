const mongoose = require("mongoose");


const SanPham = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
})

const sanPhamModel = mongoose.model.sp || mongoose.model("sanPham", SanPham);

module.exports = sanPhamModel