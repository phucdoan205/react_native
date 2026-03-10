import React from "react";
import { View, Text, StyleSheet, SafeAreaView, Platform, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import FoodList from "./FoodList";

const FavoritesScreen = () => {
  return (
    <View style={styles.mainContainer}>
      {/* Nền Gradient mờ ảo phía sau - adjusted for light theme */}
      <LinearGradient
        colors={["#ffffff", "#f8fafc", "#e2e8f0"]}
        style={StyleSheet.absoluteFill}
      />

      {/* Vòng tròn ánh sáng trang trí góc màn hình - adjusted for light theme */}
      <View style={styles.glowCircle} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>Danh sách của bạn</Text>
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>Món Yêu Thích</Text>
              <View style={styles.heartWrapper}>
                <Ionicons name="heart" size={24} color="#fff" />
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.filterBtn}>
            <Ionicons name="options-outline" size={22} color="#64748b" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          {/* Component FoodList của bạn sẽ tự động hiển thị theo Grid lộng lẫy */}
          <FoodList />
        </View>
      </SafeAreaView>
    </View>
  );
};

// Import TouchableOpacity nếu bạn muốn dùng nút Filter - moved to top

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  safeArea: {
    flex: 1,
  },
  glowCircle: {
    position: "absolute",
    top: -100,
    right: -50,
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(99, 102, 241, 0.1)", // Tím indigo mờ - reduced opacity for light theme
    // blur (chỉ hoạt động tốt trên iOS, Android dùng opacity)
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 10,
  },
  welcomeText: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 4,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#1e293b",
    letterSpacing: -0.5,
  },
  heartWrapper: {
    backgroundColor: "#f43f5e",
    padding: 8,
    borderRadius: 14,
    shadowColor: "#f43f5e",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
    transform: [{ rotate: "12deg" }],
  },
  filterBtn: {
    backgroundColor: "rgba(0,0,0,0.05)",
    padding: 12,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
  },
  content: {
    flex: 1,
    // Đảm bảo FoodList không bị dính sát mép trên
    marginTop: 10,
  },
});

export default FavoritesScreen;
