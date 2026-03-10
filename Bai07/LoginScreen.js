import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { Card, Title, Paragraph, TextInput, Button } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Thêm navigation vào props
const LoginScreen = ({ setUser, navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ tài khoản và mật khẩu");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/login",
        { username, password },
        { timeout: 5000 },
      );

      if (response.data && response.data.token) {
        await AsyncStorage.setItem("token", response.data.token);
        setUser(true);
      }
    } catch (error) {
      if (error.response) {
        Alert.alert(
          "Thất bại",
          error.response.data.message || "Tài khoản không đúng",
        );
      } else {
        Alert.alert("Lỗi mạng", "Không thể kết nối đến máy chủ.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Đăng Nhập</Title>
          <Paragraph style={styles.paragraph}>
            Nhập thông tin để tiếp tục
          </Paragraph>

          <TextInput
            label="Tên đăng nhập"
            value={username}
            onChangeText={setUsername}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            mode="outlined"
            style={styles.input}
          />

          <Button
            mode="contained"
            onPress={handleLogin}
            loading={loading}
            style={styles.button}
            buttonColor="#6200ee"
          >
            ĐĂNG NHẬP
          </Button>

          {/* Sửa lại phần TouchableOpacity để chuyển sang trang Register */}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text
              style={{ color: "#6200ee", textAlign: "center", marginTop: 10 }}
            >
              Chưa có tài khoản? Đăng ký ngay
            </Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  card: { padding: 10, borderRadius: 12, elevation: 5 },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  paragraph: { marginBottom: 25, textAlign: "center", color: "#666" },
  input: { marginBottom: 15 },
  button: { marginTop: 10, paddingVertical: 6 },
  registerButton: { marginTop: 15 },
});

export default LoginScreen;
