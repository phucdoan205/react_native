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
import { LinearGradient } from "expo-linear-gradient";
import { MotiView } from "moti"; // Thư viện tạo hiệu ứng siêu mượt
import axios from "axios";

const { width } = Dimensions.get("window");

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleRegister = async () => {
    if (!username || !password) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp!");
      return;
    }

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/register", {
        username,
        password,
      });
      Alert.alert("Thành công", "Tài khoản đã sẵn sàng!");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Lỗi", error.response?.data?.message || "Đăng ký thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#9c27b0", "#6200ee"]} style={styles.container}>
      <View style={styles.innerContainer}>
        {/* MotiView dùng để tạo hiệu ứng bay vào cho cả khối Card */}
        <MotiView
          from={{ opacity: 0, scale: 0.5, translateY: 50 }}
          animate={{ opacity: 1, scale: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 800 }}
        >
          <Card style={styles.card}>
            <Card.Content>
              {/* Hiệu ứng bay vào từng phần tử với delay khác nhau */}
              <MotiView
                from={{ opacity: 0, translateX: -20 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{ delay: 300 }}
              >
                <Title style={styles.title}>Join Us</Title>
                <Paragraph style={styles.paragraph}>
                  Tạo tài khoản mới để bắt đầu
                </Paragraph>
              </MotiView>

              <TextInput
                label="Tên đăng nhập"
                value={username}
                onChangeText={setUsername}
                mode="flat"
                style={styles.input}
                left={<TextInput.Icon icon="account-plus" color="#9c27b0" />}
                activeUnderlineColor="#9c27b0"
              />

              <TextInput
                label="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPass}
                mode="flat"
                style={styles.input}
                left={<TextInput.Icon icon="lock-outline" color="#9c27b0" />}
                right={
                  <TextInput.Icon
                    icon={showPass ? "eye-off" : "eye"}
                    onPress={() => setShowPass(!showPass)}
                  />
                }
                activeUnderlineColor="#9c27b0"
              />

              <TextInput
                label="Xác nhận mật khẩu"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showPass}
                mode="flat"
                style={styles.input}
                left={
                  <TextInput.Icon icon="shield-check-outline" color="#9c27b0" />
                }
                activeUnderlineColor="#9c27b0"
              />

              {/* Nút bấm với hiệu ứng Scale nhẹ */}
              <MotiView
                from={{ opacity: 0, translateY: 20 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ delay: 500 }}
              >
                <Button
                  mode="contained"
                  onPress={handleRegister}
                  loading={loading}
                  style={styles.button}
                  contentStyle={styles.buttonContent}
                  labelStyle={styles.buttonLabel}
                >
                  ĐĂNG KÝ NGAY
                </Button>
              </MotiView>

              <TouchableOpacity
                style={styles.loginButton}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.loginText}>
                  Đã có tài khoản?{" "}
                  <Text style={styles.boldText}>Đăng nhập</Text>
                </Text>
              </TouchableOpacity>
            </Card.Content>
          </Card>
        </MotiView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  card: {
    width: width * 0.9,
    paddingVertical: 15,
    borderRadius: 30,
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
  },
  paragraph: { marginBottom: 25, textAlign: "center", color: "#888" },
  input: { marginBottom: 15, backgroundColor: "transparent" },
  button: { marginTop: 10, borderRadius: 30, backgroundColor: "#9c27b0" },
  buttonContent: { height: 55 },
  buttonLabel: { fontWeight: "bold", fontSize: 16 },
  loginButton: { marginTop: 20 },
  loginText: { textAlign: "center", color: "#666" },
  boldText: { color: "#9c27b0", fontWeight: "bold" },
});

export default RegisterScreen;
