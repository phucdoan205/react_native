import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Animated, // Thêm Animated để làm hiệu ứng thông báo
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Ref cho hiệu ứng thông báo thành công
  const slideAnim = useRef(new Animated.Value(-100)).current;

  const showSuccessToast = () => {
    // Hiệu ứng trượt thông báo xuống
    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: 50,
        duration: 500,
        useNativeDriver: Platform.OS !== "web", // Web không hỗ trợ native driver cho vị trí
      }),
      Animated.delay(2000),
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 500,
        useNativeDriver: Platform.OS !== "web",
      }),
    ]).start();
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setIsLoading(true);

    setTimeout(async () => {
      if (email === "123" && password === "123") {
        const token = `jwt_foodie_${Date.now()}`;
        try {
          await AsyncStorage.setItem("@jwt_token", token);

          // Chạy hiệu ứng thông báo trên Web/Mobile
          showSuccessToast();

          // Chờ 1 chút để user kịp thấy thông báo rồi mới chuyển trang
          setTimeout(() => {
            navigation.reset({ index: 0, routes: [{ name: "Home" }] });
          }, 2500);
        } catch (error) {
          Alert.alert("Lỗi", "Không thể lưu phiên đăng nhập");
        }
      } else {
        Alert.alert("Thất bại", "Email hoặc mật khẩu không đúng!");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* --- THÔNG BÁO THÀNH CÔNG (CUSTOM TOAST) --- */}
      <Animated.View style={[styles.successToast, { top: slideAnim }]}>
        <LinearGradient
          colors={["#22c55e", "#16a34a"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.toastGradient}
        >
          <Ionicons name="checkmark-circle" size={24} color="#fff" />
          <Text style={styles.successText}>Đăng nhập thành công!</Text>
        </LinearGradient>
      </Animated.View>

      {/* Background Decor */}
      <View
        style={[
          styles.circle,
          { top: -50, right: -50, backgroundColor: "#dcfce7" },
        ]}
      />
      <View
        style={[
          styles.circle,
          { bottom: -80, left: -80, backgroundColor: "#dbeafe" },
        ]}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoid}
        >
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <LinearGradient
                colors={["#60a5fa", "#3b82f6"]}
                style={styles.logoGradient}
              >
                <Ionicons name="restaurant" size={40} color="#fff" />
              </LinearGradient>
            </View>

            <Text style={styles.title}>Chào mừng!</Text>
            <Text style={styles.subtitle}>
              Đăng nhập để bắt đầu hành trình ẩm thực
            </Text>

            <View style={styles.form}>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color="#64748b"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email của bạn"
                  placeholderTextColor="#94a3b8"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputWrapper}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#64748b"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Mật khẩu"
                  placeholderTextColor="#94a3b8"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity style={styles.forgotLink}>
                <Text style={styles.linkText}>Quên mật khẩu?</Text>
              </TouchableOpacity>

              {isLoading ? (
                <ActivityIndicator
                  size="large"
                  color="#3b82f6"
                  style={styles.loader}
                />
              ) : (
                <TouchableOpacity onPress={handleLogin} activeOpacity={0.8}>
                  <LinearGradient
                    colors={["#60a5fa", "#2563eb"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.button}
                  >
                    <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
                    <Ionicons name="arrow-forward" size={20} color="#fff" />
                  </LinearGradient>
                </TouchableOpacity>
              )}
            </View>

            <Text style={styles.hintText}>
              Test:{" "}
              <Text style={{ fontWeight: "600" }}>
                123 / 123
              </Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  // Style cho thông báo thành công
  successToast: {
    position: "absolute",
    left: (width - 280) / 2, // Căn giữa
    width: 280,
    zIndex: 9999,
    ...Platform.select({
      web: { position: "fixed", left: "50%", marginLeft: -140 }, // Căn giữa chuẩn Web
    }),
  },
  toastGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 50,
    gap: 10,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  successText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
  circle: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    opacity: 0.6,
  },
  keyboardAvoid: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logoGradient: {
    width: 80,
    height: 80,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1e293b",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 40,
    marginTop: 5,
  },
  form: {
    width: "100%",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 16,
    paddingHorizontal: 15,
    height: 60,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: "#1e293b",
    fontSize: 16,
  },
  forgotLink: {
    alignSelf: "flex-end",
    marginBottom: 30,
  },
  linkText: {
    color: "#3b82f6",
    fontWeight: "600",
  },
  button: {
    height: 60,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    elevation: 5,
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 1,
  },
  loader: {
    marginTop: 10,
  },
  hintText: {
    marginTop: 40,
    color: "#94a3b8",
    fontSize: 13,
    textAlign: "center",
  },
});

export default LoginScreen;
