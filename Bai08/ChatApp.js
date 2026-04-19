import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import axios from "axios";
import io from "socket.io-client";

const SERVER_URL = "http://localhost:3000";
const socket = io(SERVER_URL, {
  autoConnect: false,
  transports: ["websocket", "polling"],
});

const createMessage = (text, sender) => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  text,
  sender,
});

const ChatApp = () => {
  const [messages, setMessages] = useState([
    createMessage(
      "Chào bạn! Mình là trợ lý AI thông minh. Hôm nay bạn thế nào? ✨",
      "ai",
    ),
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);
    const handleMessage = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("message", handleMessage);
    socket.connect();

    return () => {
      socket.off("connect", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("message", handleMessage);
      socket.disconnect();
    };
  }, []);

  const sendMessage = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput || isSending) return;

    if (!socket.connected) {
      setMessages((prevMessages) => [
        ...prevMessages,
        createMessage(
          "Ối, hình như máy chủ đang nghỉ ngơi chút. Hãy thử lại nhé! 💤",
          "ai",
        ),
      ]);
      return;
    }

    const userMessage = createMessage(trimmedInput, "user");
    socket.emit("message", userMessage);
    setInput("");
    setIsSending(true);

    try {
      await axios.post(`${SERVER_URL}/chat`, { message: trimmedInput });
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        createMessage(
          "Có chút gián đoạn nhỏ, nhưng đừng bỏ cuộc nhé! ✨",
          "ai",
        ),
      ]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar barStyle="dark-content" />

      {/* Background Decor */}
      <View style={styles.circleDecor} />

      {/* Header Status */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>AI Companion 🚀</Text>
          <View style={styles.statusRow}>
            <View
              style={[
                styles.statusDot,
                isConnected ? styles.online : styles.offline,
              ]}
            />
            <Text style={styles.statusText}>
              {isConnected ? "Sẵn sàng hỗ trợ bạn" : "Đang tìm tín hiệu..."}
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageWrapper,
              item.sender === "user" ? styles.userWrapper : styles.aiWrapper,
            ]}
          >
            <View
              style={[
                styles.messageBox,
                item.sender === "user" ? styles.userMsg : styles.aiMsg,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  item.sender === "user" ? styles.userText : styles.aiText,
                ]}
              >
                {item.text}
              </Text>
            </View>
          </View>
        )}
      />

      <View style={styles.bottomContainer}>
        <View style={styles.inputCard}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Viết điều gì đó thật tuyệt..."
            placeholderTextColor="#94A3B8"
            editable={!isSending}
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              (!input.trim() || isSending) && styles.sendButtonDisabled,
            ]}
            onPress={sendMessage}
            disabled={!input.trim() || isSending}
          >
            {isSending ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.sendIcon}>🚀</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFF",
  },
  circleDecor: {
    position: "absolute",
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#E0E7FF",
    opacity: 0.5,
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 24,
    paddingBottom: 15,
    backgroundColor: "rgba(255,255,255,0.8)",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#1E1B4B",
    letterSpacing: -0.5,
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  online: { backgroundColor: "#10B981" },
  offline: { backgroundColor: "#F43F5E" },
  statusText: {
    color: "#64748B",
    fontSize: 13,
    fontWeight: "500",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  messageWrapper: {
    marginVertical: 6,
    flexDirection: "row",
  },
  userWrapper: { justifyContent: "flex-end" },
  aiWrapper: { justifyContent: "flex-start" },
  messageBox: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 22,
    maxWidth: "85%",
    // Shadow hiệu ứng
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  userMsg: {
    backgroundColor: "#6366F1",
    borderBottomRightRadius: 4,
    shadowColor: "#6366F1",
  },
  aiMsg: {
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 4,
    shadowColor: "#000",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "500",
  },
  userText: { color: "#FFFFFF" },
  aiText: { color: "#334155" },
  bottomContainer: {
    padding: 16,
    paddingBottom: Platform.OS === "ios" ? 30 : 16,
    backgroundColor: "#F8FAFF",
  },
  inputCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 30,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    // Glow effect cho input
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    maxHeight: 100,
    color: "#1E293B",
  },
  sendButton: {
    backgroundColor: "#6366F1",
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  sendButtonDisabled: {
    backgroundColor: "#CBD5E1",
    shadowOpacity: 0,
  },
  sendIcon: {
    fontSize: 18,
    color: "#fff",
  },
});

export default ChatApp;
