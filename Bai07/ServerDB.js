const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const port = 5000;
const SECRET_KEY = "your_secret_key";

// --- KẾT NỐI DATABASE ---
mongoose
  .connect("mongodb://127.0.0.1:27017/baitap")
  .then(() => console.log("✅ Kết nối MongoDB thành công!"))
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// --- MIDDLEWARE ---
app.use(cors()); // Cho phép React Native Web truy cập
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- MODELS ---
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", userSchema, "users");

// --- ROUTES ---

// 1. Đăng ký tài khoản (Mã hóa mật khẩu)
app.post("/api/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Tài khoản đã tồn tại!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi đăng ký: " + error.message });
  }
});

// 2. Đăng nhập (Sửa lỗi Not Allowed)
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Tài khoản không tồn tại!" });
    }

    // So sánh mật khẩu đã nhập với mật khẩu đã hashed trong DB
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ username: user.username }, SECRET_KEY, {
        expiresIn: "1h",
      });
      // Trả về đối tượng JSON có chứa token để Frontend xử lý
      return res.json({ token });
    } else {
      // Trả về lỗi 401 thay vì trả về text "Not Allowed" kèm code 200
      return res.status(401).json({ message: "Mật khẩu không chính xác!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server đang chạy tại: http://localhost:${port}`);
});
