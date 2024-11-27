const express = require("express");
const multer = require('multer');
const { addSanPham, deleteSanPham, loadSanPham } = require("../controllers/sanphamController");

const SanPhamRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()} ${file.originalname}`)
    }
})

const upload = multer({ storage: storage })

SanPhamRouter.get("/sanpham", loadSanPham)

SanPhamRouter.post("/add", upload.single("image"), addSanPham)
SanPhamRouter.delete("/delete/:id", deleteSanPham)



module.exports = SanPhamRouter