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
      "Xin chao! Hay chay node ServerIO.js truoc, sau do ban co the chat voi AI.",
      "ai",
    ),
  ]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const handleConnect = () => {
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      setIsConnected(false);
    };

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

    if (!trimmedInput || isSending) {
      return;
    }

    if (!socket.connected) {
      setMessages((prevMessages) => [
        ...prevMessages,
        createMessage(
          "Chua ket noi duoc server socket. Hay chay node ServerIO.js truoc.",
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
      await axios.post(
        `${SERVER_URL}/chat`,
        { message: trimmedInput },
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        "Khong the gui tin nhan toi server AI. Kiem tra ServerIO.js.";

      setMessages((prevMessages) => [
        ...prevMessages,
        createMessage(errorMessage, "ai"),
      ]);
      console.error("Loi gui chat len server:", error.response?.data || error.message);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.statusContainer}>
        <View
          style={[
            styles.statusDot,
            isConnected ? styles.statusOnline : styles.statusOffline,
          ]}
        />
        <Text style={styles.statusText}>
          {isConnected ? "Da ket noi socket server" : "Dang mat ket noi server"}
        </Text>
      </View>

      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
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
          editable={!isSending}
          onSubmitEditing={sendMessage}
          returnKeyType="send"
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            (isSending || !isConnected) && styles.sendButtonDisabled,
          ]}
          onPress={sendMessage}
          disabled={isSending || !isConnected}
        >
          {isSending ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.sendButtonText}>Send</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f4f8",
    padding: 10,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  statusOnline: {
    backgroundColor: "#22c55e",
  },
  statusOffline: {
    backgroundColor: "#ef4444",
  },
  statusText: {
    color: "#475569",
    fontSize: 13,
  },
  listContent: {
    paddingVertical: 8,
  },
  messageBox: {
    padding: 10,
    borderRadius: 12,
    marginVertical: 5,
    maxWidth: "80%",
  },
  userMsg: {
    alignSelf: "flex-end",
    backgroundColor: "#007bff",
  },
  aiMsg: {
    alignSelf: "flex-start",
    backgroundColor: "#28a745",
  },
  messageText: {
    color: "#fff",
    lineHeight: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 44,
  },
  sendButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 20,
    height: 44,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 74,
  },
  sendButtonDisabled: {
    opacity: 0.6,
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ChatApp;
