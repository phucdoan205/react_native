const mongoose = require('mongoose');

// Xóa hoàn toàn { useNewUrlParser: true, useUnifiedTopology: true }
// Sử dụng 127.0.0.1 và tên database là baitap
mongoose.connect('mongodb://127.0.0.1:27017/baitap')
    .then(() => {
        console.log("Kết nối thành công tới database 'baitap'!");
        fetchItems(); // Chỉ gọi hàm lấy dữ liệu khi đã kết nối thành công
    })
    .catch(err => {
        console.error("Lỗi kết nối MongoDB:", err.message);
    });

const itemSchema = new mongoose.Schema({
    name: String,
    description: String,
});

const Item = mongoose.model('Item', itemSchema);

const fetchItems = async () => {
    try {
        const items = await Item.find();
        console.log('Dữ liệu lấy được:', items);
    } catch (error) {
        console.error('Lỗi khi truy vấn:', error);
    } finally {
        mongoose.connection.close();
    }
};