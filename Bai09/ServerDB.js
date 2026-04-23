const express = require("express"); // Import thư viện Express
const mongoose = require("mongoose"); // Import thư viện Mongoose để làm việc với MongoDB
const cors = require("cors"); // Import thư viện CORS để cho phép yêu cầu từ các nguồn khác
const bodyParser = require("body-parser"); // Import thư viện body-parser để phân tích dữ liệu từ request
require("dotenv").config(); // Import dotenv để sử dụng biến môi trường

const app = express(); // Khởi tạo ứng dụng Express
const PORT = 5000; // Cổng mà server sẽ lắng nghe

// Kết nối MongoDB
mongoose
  .connect("mongodb://localhost:27017/lab9", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected")) // Log khi kết nối thành công
  .catch((err) => console.error("MongoDB connection error:", err)); // Log lỗi nếu có

// Middleware
app.use(cors()); // Cho phép CORS
app.use(bodyParser.json()); // Phân tích dữ liệu JSON từ request

// Định nghĩa schema và model cho bạn bè
const friendSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Tên bạn bè
  phone: { type: String, required: true }, // Số điện thoại
  email: { type: String, required: true }, // Địa chỉ email
  avatar: { type: String, required: true }, // URL ảnh đại diện
});

const Friend = mongoose.model("Friend", friendSchema); // Tạo model từ schema

// API endpoint để lấy danh sách bạn bè
app.get("/friends", async (req, res) => {
  try {
    const { search } = req.query; // Lấy tham số tìm kiếm từ query
    let friends;

    if (search) {
      // Nếu có tham số tìm kiếm, tìm kiếm theo tên
      friends = await Friend.find({ name: new RegExp(search, "i") }); // Tìm kiếm không phân biệt chữ hoa chữ thường
    } else {
      // Nếu không có tham số tìm kiếm, lấy tất cả bạn bè
      friends = await Friend.find();
    }

    res.json(friends); // Trả dữ liệu về cho client
  } catch (error) {
    res.status(500).json({ message: "Error fetching friends" }); // Trả lỗi nếu có
  }
});

// API endpoint để thêm bạn bè
app.post("/friends", async (req, res) => {
  try {
    const newFriend = new Friend(req.body); // Tạo mới một bạn bè từ dữ liệu request
    await newFriend.save(); // Lưu bạn bè vào MongoDB
    res.status(201).json(newFriend); // Trả về bạn bè mới được tạo
  } catch (error) {
    res.status(500).json({ message: "Error adding friend" }); // Trả lỗi nếu có
  }
});

// Cập nhật thông tin bạn bè
app.put("/friends/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedFriend = await Friend.findByIdAndUpdate(id, req.body, {
      new: true,
    }); // Cập nhật bạn bè
    if (!updatedFriend) {
      return res.status(404).send("Friend not found"); // Nếu không tìm thấy bạn bè
    }
    res.json(updatedFriend); // Trả về bạn bè đã được cập nhật
  } catch (error) {
    res.status(500).json({ message: "Error updating friend" }); // Trả lỗi nếu có
  }
});

// Xóa bạn bè
app.delete("/friends/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFriend = await Friend.findByIdAndDelete(id); // Xóa bạn bè
    if (!deletedFriend) {
      return res.status(404).send("Friend not found"); // Nếu không tìm thấy bạn bè
    }
    res.status(204).send(); // Trả về trạng thái 204 No Content
  } catch (error) {
    res.status(500).json({ message: "Error deleting friend" }); // Trả lỗi nếu có
  }
});

// Bắt đầu server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`); // Log khi server bắt đầu
});
