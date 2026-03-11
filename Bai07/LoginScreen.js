import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  Dimensions,
} from "react-native";
import { Card, Title, Paragraph, TextInput, Button } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient"; // Hoặc react-native-linear-gradient
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const LoginScreen = ({ setUser, navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ tài khoản và mật khẩu");
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
      const errorMsg =
        error.response?.data?.message ||
        "Tài khoản hoặc mật khẩu không chính xác";
      Alert.alert("Thất bại", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#6200ee", "#9c27b0"]} style={styles.container}>
      <View style={styles.innerContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Title style={styles.title}>Welcome Back</Title>
            <Paragraph style={styles.paragraph}>
              Đăng nhập để tiếp tục khám phá
            </Paragraph>

            <TextInput
              label="Tên đăng nhập"
              value={username}
              onChangeText={setUsername}
              mode="flat"
              style={styles.input}
              left={<TextInput.Icon icon="account" color="#6200ee" />}
              activeUnderlineColor="#6200ee"
            />

            <TextInput
              label="Mật khẩu"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPass}
              mode="flat"
              style={styles.input}
              activeUnderlineColor="#6200ee"
              left={<TextInput.Icon icon="lock" color="#6200ee" />}
              right={
                <TextInput.Icon
                  icon={showPass ? "eye-off" : "eye"}
                  onPress={() => setShowPass(!showPass)}
                />
              }
            />

            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loading}
              style={styles.button}
              contentStyle={styles.buttonContent}
              labelStyle={styles.buttonLabel}
            >
              ĐĂNG NHẬP
            </Button>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => navigation.navigate("Register")}
            >
              <Text style={styles.registerText}>
                Chưa có tài khoản?{" "}
                <Text style={styles.boldText}>Đăng ký ngay</Text>
              </Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: width * 0.9,
    paddingVertical: 20,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    // Hiệu ứng đổ bóng chuẩn cho cả iOS và Android
    elevation: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    color: "#333",
    letterSpacing: 1,
  },
  paragraph: {
    marginBottom: 30,
    textAlign: "center",
    color: "#777",
    fontSize: 14,
  },
  input: {
    marginBottom: 20,
    backgroundColor: "transparent",
  },
  button: {
    marginTop: 15,
    borderRadius: 30,
    overflow: "hidden",
    backgroundColor: "#6200ee",
  },
  buttonContent: {
    height: 55,
  },
  buttonLabel: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  registerButton: {
    marginTop: 25,
  },
  registerText: {
    color: "#666",
    textAlign: "center",
    fontSize: 14,
  },
  boldText: {
    color: "#6200ee",
    fontWeight: "bold",
  },
});

export default LoginScreen;
