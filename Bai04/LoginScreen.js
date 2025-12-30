import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.loginCard}>
        <Text style={styles.header}>Chào mừng quay lại</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry={!showPassword}
          placeholderTextColor="#999"
        />

        {/* Nút tách nhau ra bằng marginVertical */}
        <TouchableOpacity
          style={styles.secondaryBtn}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Text style={styles.secondaryBtnText}>
            {showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryBtn}>
          <Text style={styles.primaryBtnText}>ĐĂNG NHẬP</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F2F5",
    justifyContent: "center",
    padding: 20,
  },
  loginCard: {
    backgroundColor: "#FFF",
    padding: 30,
    borderRadius: 25,
    elevation: 10,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  primaryBtn: {
    backgroundColor: "#6200EE",
    padding: 18,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  primaryBtnText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
  secondaryBtn: { padding: 10, alignSelf: "flex-end", marginBottom: 15 },
  secondaryBtnText: { color: "#6200EE", fontWeight: "600" },
});

export default LoginScreen;
