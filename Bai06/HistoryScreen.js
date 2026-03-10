import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

const historyData = [
  {
    id: "ORD-001",
    name: "Pizza Margherita",
    date: "Hôm nay, 14:20",
    price: "120.000đ",
    status: "Đã giao",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQugXpVRngY9P616NZ57jyx2kl-Xoq_DbC58A&s",
    color: "#10b981", // Emerald
    bgIcon: "#dcfce7",
  },
  {
    id: "ORD-002",
    name: "Burger Gourmet & Fries",
    date: "Hôm qua, 18:05",
    price: "95.000đ",
    status: "Đã hủy",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    color: "#f43f5e", // Rose
    bgIcon: "#ffe4e6",
  },
  {
    id: "ORD-003",
    name: "Sushi Platter Premium",
    date: "08 Th3, 12:30",
    price: "350.000đ",
    status: "Đã giao",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400",
    color: "#10b981",
    bgIcon: "#dcfce7",
  },
  {
    id: "ORD-004",
    name: "Phở Bò Đặc Biệt",
    date: "05 Th3, 08:15",
    price: "65.000đ",
    status: "Đã giao",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400",
    color: "#10b981",
    bgIcon: "#dcfce7",
  },
];

const HistoryCard = ({ item }) => {
  const hoverAnim = useRef(new Animated.Value(1)).current;

  const handleMouseEnter = () => {
    Animated.timing(hoverAnim, {
      toValue: 1.02,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleMouseLeave = () => {
    Animated.timing(hoverAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.historyCardWrapper}
    >
      <Animated.View
        style={[
          styles.historyCard,
          { transform: [{ scale: hoverAnim }] },
        ]}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <View style={styles.imageWrapper}>
          <Image source={{ uri: item.image }} style={styles.foodThumb} />
        </View>

        <View style={styles.cardContent}>
          <View style={styles.cardHeader}>
            <Text style={styles.orderId}>{item.id}</Text>
            <View
              style={[
                styles.statusBadge,
                { backgroundColor: item.bgIcon },
              ]}
            >
              <Text style={[styles.statusText, { color: item.color }]}>

                {item.status}
              </Text>
            </View>
          </View>

          <Text style={styles.foodName} numberOfLines={1}>
            {item.name}
          </Text>

          <View style={styles.cardFooter}>
            <View style={styles.timeRow}>
              <Ionicons name="time-outline" size={14} color="#94a3b8" />
              <Text style={styles.dateText}>{item.date}</Text>
            </View>
            <Text style={styles.priceText}>{item.price}</Text>
          </View>
        </View>

        {/* Nút đặt lại món trang trí */}
        <View style={styles.reorderCircle}>
          <Ionicons name="chevron-forward" size={18} color="#6366f1" />
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const HistoryScreen = () => {
  return (
    <View style={styles.mainContainer}>
      {/* Nền sáng với Gradient nhẹ nhàng ở góc */}
      <View style={styles.bgLight} />
      <View
        style={[
          styles.decorationCircle,
          { top: -50, right: -50, backgroundColor: "#e0e7ff" },
        ]}
      />
      <View
        style={[
          styles.decorationCircle,
          { bottom: -100, left: -50, backgroundColor: "#fdf2f8" },
        ]}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.container}
          showsVerticalScrollIndicator={false}
        >
          {/* Header lộng lẫy tông sáng */}
          <View style={styles.header}>
            <View>
              <Text style={styles.headerSubtitle}>Hoạt động gần đây</Text>
              <Text style={styles.headerTitle}>
                Lịch sử <Text style={{ color: "#6366f1" }}>đơn hàng</Text>
              </Text>
            </View>
            <TouchableOpacity style={styles.calendarBtn}>
              <LinearGradient
                colors={["#8b5cf6", "#6366f1"]}
                style={styles.calGradient}
              >
                <Ionicons name="calendar" size={20} color="#fff" />
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* List đơn hàng */}
          {historyData.map((item) => (
            <HistoryCard key={item.id} item={item} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#f8fafc" },
  bgLight: { ...StyleSheet.absoluteFillObject, backgroundColor: "#f8fafc" },
  decorationCircle: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    opacity: 0.6,
  },
  container: { padding: 20 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
    marginTop: 10,
  },
  headerSubtitle: {
    color: "#64748b",
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  headerTitle: {
    color: "#1e293b",
    fontSize: 32,
    fontWeight: "900",
    letterSpacing: -1,
  },
  calendarBtn: {
    elevation: 8,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  calGradient: {
    padding: 12,
    borderRadius: 15,
  },
  historyCardWrapper: {
    marginBottom: 18,
  },
  historyCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 28,
    padding: 12,
    alignItems: "center",
    // Đổ bóng sang trọng (Soft Shadow)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 4,
    borderWidth: 1,
    borderColor: "#f1f5f9",
  },
  imageWrapper: {
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  foodThumb: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "#f1f5f9",
  },
  cardContent: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  orderId: { color: "#94a3b8", fontSize: 11, fontWeight: "800" },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  statusText: { fontSize: 11, fontWeight: "800" },
  foodName: {
    color: "#1e293b",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 6,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timeRow: { flexDirection: "row", alignItems: "center", gap: 4 },
  dateText: { color: "#64748b", fontSize: 12, fontWeight: "500" },
  priceText: { color: "#6366f1", fontSize: 15, fontWeight: "900" },
  reorderCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#eef2ff",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
});

export default HistoryScreen;
