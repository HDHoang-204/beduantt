const sanPhamModel = require("../models/sanpham.js");
const fs = require('fs');

//them san pham

const addSanPham = async (req, res) => {
    let imagefilename = `${req.file.filename}`;
    const sp = new sanPhamModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: imagefilename,
        category: req.body.category
    })

    try {
        await sp.save()
        res.json({ success: true, message: " Thêm thành công" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: " Lỗi" })
    }
}


// xóa
const deleteSanPham = async (req, res) => {
    const { id } = req.params;  // Lấy ID từ params

    try {
        const sp = await sanPhamModel.findById(id);  // Tìm sản phẩm theo ID

        if (!sp) {
            return res.json({ success: false, message: "Sản phẩm không tồn tại" });
        }

        // Xóa sản phẩm
        await sanPhamModel.findByIdAndDelete(id);

        // Nếu có ảnh liên quan, bạn có thể xóa ảnh khỏi thư mục uploads
        if (sp.image) {
            fs.unlinkSync(`uploads/${sp.image}`);  // Xóa file ảnh
        }

        res.json({ success: true, message: "Xóa thành công" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi khi xóa sản phẩm" });
    }
};

//load san phẩm

const loadSanPham = async (req, res) => {
    try {
        const sp = await sanPhamModel.find({});
        res.json({ success: true, data: sp })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Lỗi khi load sản phẩm" })

    }
}

module.exports = { addSanPham, deleteSanPham, loadSanPham };