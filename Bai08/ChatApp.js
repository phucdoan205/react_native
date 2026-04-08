import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import io from "socket.io-client"; // Thư viện kết nối Socket
import axios from "axios"; // Thư viện gọi API

// Kết nối tới server (Thay địa chỉ IP bằng IP máy tính của bạn)
const socket = io("http://localhost:3000");

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Lắng nghe tin nhắn mới từ server
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => socket.off("message");
  }, []);

  const sendMessage = async () => {
    if (input.trim() !== "") {
      // 1. Tạo và gửi tin nhắn của người dùng
      const userMsg = {
        id: Date.now().toString(),
        text: input,
        sender: "user",
      };
      socket.emit("message", userMsg);

      // 2. Gọi API Gemini để lấy phản hồi tự động
      try {
        const apiUrl =
          "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_API_KEY";
        const payload = {
          contents: [{ parts: [{ text: input }] }],
        };

        const response = await axios.post(apiUrl, payload, {
          headers: { "Content-Type": "application/json" },
        });

        const aiText = response.data.candidates[0].content.parts[0].text;
        const aiMsg = {
          id: (Date.now() + 1).toString(),
          text: aiText,
          sender: "ai",
        };

        // Gửi phản hồi của AI lên server
        socket.emit("message", aiMsg);
      } catch (error) {
        console.error("Lỗi gọi Gemini API:", error);
      }

      setInput("");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBox,
              item.sender === "user" ? styles.userMsg : styles.aiMsg,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f0f0", padding: 10 },
  messageBox: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  userMsg: { alignSelf: "flex-end", backgroundColor: "#007bff" },
  aiMsg: { alignSelf: "flex-start", backgroundColor: "#28a745" },
  messageText: { color: "#fff" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 40,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  sendButtonText: { color: "#fff", fontWeight: "bold" },
});

export default ChatApp;
