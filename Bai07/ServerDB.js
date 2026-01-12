
const express = require("express"); // Import thư viện Express
const mongoose = require("mongoose"); // Import thư viện Mongoose để làm việc với MongoDB
const cors = require("cors"); // Import thư viện CORS để cho phép yêu cầu từ các nguồn khác
const bodyParser = require("body-parser"); // Import thư viện body-parser để phân tích dữ liệu từ request
const bcrypt = require("bcryptjs"); // Import thư viện bcryptjs để mã hóa mật khẩu
const jwt = require("jsonwebtoken"); // Import thư viện jsonwebtoken để tạo và xác thực token

const app = express(); // Tạo một ứng dụng Express
const port = 5000; // Cổng mà server sẽ lắng nghe

// Kết nối với MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/baitap")
  .then(() => console.log("✅ Kết nối thành công!"))
  .catch((err) => console.error("❌ Lỗi kết nối:", err));
// Middleware
app.use(cors()); // Sử dụng CORS để cho phép yêu cầu từ các nguồn khác
app.use(bodyParser.json()); // Phân tích dữ liệu JSON từ request
app.use(bodyParser.urlencoded({ extended: true })); // Phân tích dữ liệu URL-encoded từ request

// 1. Khai báo Schema cho người dùng
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});

// 2. Khai báo Schema cho Item
const itemSchema = new mongoose.Schema({
  name: String,
  description: String,
});

// 3. Tạo Model và ép tên Collection chính xác
// Việc này giúp tránh tự tạo ra các collection lạ như 'logins', 'registers'
const User = mongoose.model("User", userSchema, "users");
const Item = mongoose.model("Item", itemSchema, "items");

// Middleware để xác thực token
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]; // Lấy token từ header
  if (!token) return res.sendStatus(401); // Nếu không có token, trả về lỗi 401 Unauthorized
  jwt.verify(token, "your_secret_key", (err, user) => {
    // Xác thực token
    if (err) return res.sendStatus(403); // Nếu token không hợp lệ, trả về lỗi 403 Forbidden
    req.user = user; // Lưu thông tin người dùng vào request
    next(); // Tiếp tục với middleware tiếp theo
  });
};

// Route đăng ký
app.post("/api/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Mã hóa mật khẩu
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
    }); // Tạo một người dùng mới
    await user.save(); // Lưu trữ người dùng vào MongoDB
    res.status(201).send("User registered!"); // Trả về thông báo thành công
  } catch (error) {
    res.status(400).send("Error registering user: " + error.message); // Trả về lỗi nếu có
  }
});

// Route đăng nhập
app.post("/api/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username }); // Tìm người dùng theo tên
  if (!user) {
    return res.status(400).send("Cannot find user"); // Nếu không tìm thấy người dùng, trả về lỗi
  }
  if (await bcrypt.compare(req.body.password, user.password)) {
    // So sánh mật khẩu đã nhập với mật khẩu đã mã hóa
    const token = jwt.sign({ username: user.username }, "your_secret_key"); // Tạo token
    res.json({ token }); // Gửi token về cho phía client
  } else {
    res.send("Not Allowed"); // Nếu mật khẩu không đúng, trả về thông báo không cho phép
  }
});

// Route để lấy thông tin người dùng
app.get("/api/user", authenticateToken, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }); // Tìm người dùng theo tên đã xác thực
  if (user) {
    res.json({ username: user.username }); // Nếu tìm thấy, trả về thông tin người dùng
  } else {
    res.status(404).send("User not found"); // Nếu không tìm thấy, trả về lỗi 404
  }
});

// Thêm đường dẫn này để test nhanh trên web
app.get("/all-users", async (req, res) => {
  try {
    const data = await User.find(); // Truy vấn trực tiếp từ collection 'users'
    res.json(data);
  } catch (error) {
    res.status(500).send("Lỗi lấy danh sách user");
  }
});

// ServerDB.js
app.get("/items", async (req, res) => {
  try {
    // Luôn lấy dữ liệu mới nhất từ MongoDB
    const items = await Item.find();
    res.json(items); // Trả dữ liệu về trình duyệt
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy dữ liệu" });
  }
});

// Bắt đầu server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`); // Thông báo server đang chạy
});
