const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/baitap')
    .then(() => {
        console.log("✅ Kết nối thành công tới database 'baitap'!");
        fetchData(); 
    })
    .catch(err => console.error("❌ Lỗi kết nối:", err.message));

// Chỉ cần 2 Schema chính
const itemSchema = new mongoose.Schema({ name: String, description: String });
const userSchema = new mongoose.Schema({ username: String, password: String });

const Item = mongoose.model('Item', itemSchema, 'items');
// Ép buộc model User dùng đúng collection 'users' mà ServerDB.js đang dùng
const User = mongoose.model('User', userSchema, 'users'); 

const fetchData = async () => {
    try {
        const items = await Item.find();
        const users = await User.find();
        
        console.log('--- DANH SÁCH ITEMS ---');
        console.table(items.map(i => ({ Tên: i.name, MoTa: i.description })));

        console.log('--- DANH SÁCH USERS (Chứa cả Login/Register) ---');
        console.table(users.map(u => ({ Tài_khoản: u.username, Mật_khẩu: u.password })));

    } catch (error) {
        console.error('Lỗi khi truy vấn:', error);
    } finally {
        mongoose.connection.close();
    }
};