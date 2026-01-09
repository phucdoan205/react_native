const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

mongoose.connect('mongodb://127.0.0.1:27017/baitap')
    .then(() => console.log("✅ Đã kết nối thành công tới database: baitap"))
    .catch(err => console.error("❌ Lỗi kết nối MongoDB:", err));

const itemSchema = new mongoose.Schema({
    _id: String,
    name: String,
    description: String,
}, { versionKey: false, strict: false });

const Item = mongoose.model('Item', itemSchema, 'items');

app.use(cors());
app.use(bodyParser.json());

// Hàm hỗ trợ in bảng dữ liệu ra Terminal
const printUpdatedTable = async (actionMessage) => {
    const allItems = await Item.find();
    console.clear(); // Làm sạch màn hình Terminal
    console.log(`🔔 THÔNG BÁO: ${actionMessage}`);
    console.log(`📅 Cập nhật lúc: ${new Date().toLocaleTimeString()}`);
    
    // Tạo mảng dữ liệu đẹp để in bảng
    const displayData = allItems.map(item => ({
        "ID": item._id,
        "Tên Sản Phẩm": item.name,
        "Mô Tả": item.description.substring(0, 30) + "..." // Cắt ngắn mô tả cho gọn bảng
    }));
    
    console.table(displayData);
    console.log("\n🚀 Server đang đợi yêu cầu mới từ App...");
};

// --- API ENDPOINTS ---

app.get('/items', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items' });
    }
});

app.post('/items', async (req, res) => {
    try {
        const data = req.body;
        if (!data._id) data._id = new mongoose.Types.ObjectId().toString();
        const newItem = new Item(data);
        await newItem.save();
        
        res.status(201).json(newItem);
        await printUpdatedTable("Vừa THÊM một mục mới"); // Tự động in bảng
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.put('/items/:id', async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedItem);
        await printUpdatedTable(`Vừa CẬP NHẬT mục ID: ${req.params.id}`); // Tự động in bảng
    } catch (error) {
        res.status(400).json({ message: 'Error updating item' });
    }
});

app.delete('/items/:id', async (req, res) => {
    try {
        await Item.findByIdAndDelete(req.params.id);
        res.json({ message: 'Item deleted' });
        await printUpdatedTable(`Vừa XÓA mục ID: ${req.params.id}`); // Tự động in bảng
    } catch (error) {
        res.status(400).json({ message: 'Error deleting item' });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server chạy tại: http://localhost:${PORT}`);
    printUpdatedTable("Server đã sẵn sàng!"); // In bảng lần đầu khi khởi động
});