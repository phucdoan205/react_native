import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
  Animated,
  Dimensions,
  Easing,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [token, setToken] = useState(null);

  // Animation Refs
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const floatingAnim = useRef(new Animated.Value(0)).current; // Cho icon bay bổng
  const fadeAnim = useRef(new Animated.Value(0)).current; // Cho nội dung hiện dần

  useEffect(() => {
    // 1. Load Token
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem("@jwt_token");
      setToken(storedToken);
      // Hiện nội dung mượt mà
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    };
    loadToken();

    // 2. Tạo hiệu ứng icon bay lơ lửng (Floating)
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatingAnim, {
          toValue: -15,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(floatingAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const showLogoutToast = () => {
    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: 50,
        duration: 600,
        easing: Easing.out(Easing.back(1.5)),
        useNativeDriver: false,
      }),
      Animated.delay(1500),
      Animated.timing(slideAnim, {
        toValue: -100,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handleLogout = async () => {
    showLogoutToast();
    await AsyncStorage.removeItem("@jwt_token");
    setTimeout(() => {
      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    }, 2200);
  };

  return (
    <View style={styles.container}>
      {/* Background Phức Hợp: Nhiều lớp màu để tạo chiều sâu */}
      <LinearGradient
        colors={["#f0f9ff", "#e0e7ff", "#f5f3ff"]}
        style={StyleSheet.absoluteFill}
      />

      {/* Các khối cầu phát sáng (Glow Orbs) */}
      <View
        style={[
          styles.orb,
          {
            top: -20,
            left: -40,
            backgroundColor: "#60a5fa",
            width: 200,
            height: 200,
          },
        ]}
      />
      <View
        style={[
          styles.orb,
          {
            bottom: 100,
            right: -50,
            backgroundColor: "#c084fc",
            width: 250,
            height: 250,
          },
        ]}
      />
      <View
        style={[
          styles.orb,
          {
            top: 200,
            right: -20,
            backgroundColor: "#f472b6",
            width: 100,
            height: 100,
            opacity: 0.3,
          },
        ]}
      />

      {/* Toast Thông báo */}
      <Animated.View style={[styles.logoutToast, { top: slideAnim }]}>
        <LinearGradient
          colors={["#f43f5e", "#9f1239"]}
          style={styles.toastGradient}
        >
          <Ionicons name="sparkles" size={18} color="#fff" />
          <Text style={styles.toastText}>Hẹn gặp lại bạn nhé! ✨</Text>
        </LinearGradient>
      </Animated.View>

      <SafeAreaView style={{ flex: 1 }}>
        <Animated.View style={[styles.mainWrapper, { opacity: fadeAnim }]}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header lộng lẫy với Icon Floating */}
            <Animated.View
              style={[
                styles.headerSection,
                { transform: [{ translateY: floatingAnim }] },
              ]}
            >
              <LinearGradient
                colors={["#8b5cf6", "#d946ef"]}
                style={styles.mainIconCircle}
              >
                <Ionicons name="restaurant" size={55} color="#fff" />
              </LinearGradient>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Premium Member</Text>
              </View>
            </Animated.View>

            <View style={styles.textSection}>
              <Text style={styles.title}>
                Foodie <Text style={{ color: "#8b5cf6" }}>Elite</Text>
              </Text>
              <Text style={styles.subtitle}>
                Khám phá thế giới ẩm thực đẳng cấp dành riêng cho bạn.
              </Text>
            </View>

            {/* Glassmorphism Card */}
            <View style={styles.glassCard}>
              <View style={styles.cardInfo}>
                <View style={styles.infoRow}>
                  <View style={styles.statusDot} />
                  <Text style={styles.cardLabel}>TRẠNG THÁI HỆ THỐNG</Text>
                </View>
                <Text style={styles.statusValue}>Đã kết nối an toàn</Text>
              </View>

              <View style={styles.tokenBox}>
                <Text style={styles.tokenHint}>Session Token</Text>
                <Text style={styles.tokenText} numberOfLines={1}>
                  {token || "••••••••••••"}
                </Text>
              </View>

              <TouchableOpacity
                onPress={handleLogout}
                activeOpacity={0.9}
                style={styles.buttonWrapper}
              >
                <LinearGradient
                  colors={["#1e293b", "#0f172a"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.logoutBtn}
                >
                  <Text style={styles.logoutText}>ĐĂNG XUẤT</Text>
                  <Ionicons name="power-outline" size={20} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </Animated.View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, overflow: "hidden" },
  orb: {
    position: "absolute",
    borderRadius: 999,
    opacity: 0.4,
    // Hiệu ứng nhòe (Chỉ hoạt động tốt trên iOS, trên Android sẽ là vòng tròn màu)
  },
  logoutToast: {
    position: "absolute",
    alignSelf: "center",
    width: 280,
    zIndex: 10000,
    ...Platform.select({
      web: { position: "fixed", left: "50%", marginLeft: -140 },
    }),
  },
  toastGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    borderRadius: 20,
    gap: 10,
    shadowColor: "#f43f5e",
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  toastText: { color: "#fff", fontWeight: "800", fontSize: 14 },
  scrollContent: { alignItems: "center", paddingBottom: 50 },
  headerSection: { alignItems: "center", marginTop: 40, marginBottom: 20 },
  mainIconCircle: {
    width: 120,
    height: 120,
    borderRadius: 45,
    justifyContent: "center",
    alignItems: "center",
    transform: [{ rotate: "15deg" }],
    shadowColor: "#d946ef",
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  badge: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: -15,
    borderWidth: 2,
    borderColor: "#8b5cf6",
  },
  badgeText: { fontSize: 12, fontWeight: "800", color: "#8b5cf6" },
  textSection: {
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 42,
    fontWeight: "900",
    color: "#1e293b",
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 15,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
    marginTop: 10,
  },

  // GLASSMORPHISM CARD
  glassCard: {
    width: width * 0.88,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 35,
    padding: 25,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.8)",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 10,
    backdropFilter: "blur(20px)", // Chỉ web hỗ trợ trực tiếp
  },
  cardInfo: { marginBottom: 20 },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#10b981",
  },
  cardLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#94a3b8",
    letterSpacing: 1,
  },
  statusValue: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
    marginTop: 4,
  },

  tokenBox: {
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    padding: 18,
    borderRadius: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.05)",
  },
  tokenHint: {
    fontSize: 10,
    fontWeight: "700",
    color: "#64748b",
    marginBottom: 5,
    textTransform: "uppercase",
  },
  tokenText: {
    fontSize: 13,
    color: "#475569",
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
  },

  buttonWrapper: { width: "100%" },
  logoutBtn: {
    height: 65,
    borderRadius: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 2,
  },
});

export default HomeScreen;
