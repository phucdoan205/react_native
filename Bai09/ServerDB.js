const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000; // Sử dụng biến môi trường hoặc cổng 5000

// --- KẾT NỐI MONGODB (ĐÃ SỬA LỖI) ---
// Đã xóa useNewUrlParser và useUnifiedTopology vì chúng không còn cần thiết ở phiên bản mới
mongoose
  .connect("mongodb://localhost:27017/lab9")
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Định nghĩa schema và model cho bạn bè
const friendSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  avatar: { type: String, required: true },
});

const Friend = mongoose.model("Friend", friendSchema);

// --- API ENDPOINTS ---

// 1. Lấy danh sách bạn bè (Có hỗ trợ tìm kiếm)
app.get("/friends", async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};

    if (search) {
      // Tìm kiếm theo tên (không phân biệt hoa thường)
      query = { name: { $regex: search, $options: "i" } };
    }

    const friends = await Friend.find(query);
    res.json(friends);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching friends", error: error.message });
  }
});

// 2. Thêm bạn bè mới
app.post("/friends", async (req, res) => {
  try {
    const newFriend = new Friend(req.body);
    await newFriend.save();
    res.status(201).json(newFriend);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding friend", error: error.message });
  }
});

// 3. Cập nhật thông tin bạn bè
app.put("/friends/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const updatedFriend = await Friend.findByIdAndUpdate(id, req.body, {
      new: true, // Trả về object sau khi đã cập nhật
      runValidators: true, // Đảm bảo dữ liệu mới vẫn đúng validate của Schema
    });

    if (!updatedFriend) {
      return res.status(404).json({ message: "Friend not found" });
    }
    res.json(updatedFriend);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating friend", error: error.message });
  }
});

// 4. Xóa bạn bè
app.delete("/friends/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedFriend = await Friend.findByIdAndDelete(id);
    if (!deletedFriend) {
      return res.status(404).json({ message: "Friend not found" });
    }
    res.status(200).json({ message: "Deleted successfully" }); // Thay vì 204 để client dễ nhận diện hơn
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting friend", error: error.message });
  }
});

// Bắt đầu server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
