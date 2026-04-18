const express = require("express");
const http = require("http");
const cors = require("cors");
const axios = require("axios");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

const allowedOrigins = ["http://localhost:8081", "http://localhost:19006"];
const GEMINI_API_KEY = "AIzaSyC3DYVrY1kQoFVT0ryzsYrNJj1tSYjZRWo";
const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  }),
);
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

app.get("/", (_req, res) => {
  res.send("Socket server is running.");
});

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.on("message", (message) => {
    io.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${socket.id}`);
  });
});

app.post("/chat", async (req, res) => {
  const prompt = req.body?.message?.trim();

  if (!prompt) {
    return res.status(400).json({ error: "Tin nhan khong duoc de trong." });
  }

  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
      },
    );

    const aiText =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AI chua tra ve noi dung.";

    const aiMessage = {
      id: `${Date.now()}-ai`,
      text: aiText,
      sender: "ai",
    };

    io.emit("message", aiMessage);
    return res.json(aiMessage);
  } catch (error) {
    const errorMessage =
      error.response?.data?.error?.message ||
      "Khong the goi Gemini API tu server.";

    console.error("Loi goi Gemini API:", error.response?.data || error.message);
    return res.status(error.response?.status || 500).json({ error: errorMessage });
  }
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
  console.log("Hay chay lenh: node ServerIO.js");
});
