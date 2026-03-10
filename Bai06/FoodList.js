import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");

// DỮ LIỆU MẪU ĐƯỢC BỔ SUNG DỒI DÀO
const foodData = [
  {
    name: "Pizza Margherita",
    price: "120k",
    rating: 4.8,
    time: "20 min",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyLCWEbWCyzRRiQoUBSLcY52FedzxjpJn2fA&s",
  },
  {
    name: "Burger Gourmet",
    price: "85k",
    rating: 4.7,
    time: "15 min",
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Sushi Platter",
    price: "250k",
    rating: 4.9,
    time: "30 min",
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Pasta Carbonara",
    price: "110k",
    rating: 4.6,
    time: "25 min",
    image:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Phở Bò Đặc Biệt",
    price: "65k",
    rating: 4.9,
    time: "10 min",
    image:
      "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Bánh Mì Grill",
    price: "35k",
    rating: 4.5,
    time: "5 min",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_o39LH61t6nhEpG-RSht2Ax3iNeKFe6hM5g&s",
  },
  {
    name: "Tôm Hùm Bỏ Lò",
    price: "550k",
    rating: 5.0,
    time: "45 min",
    image:
      "https://images.unsplash.com/photo-1559742811-822873691df8?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Salad Cá Hồi",
    price: "145k",
    rating: 4.7,
    time: "15 min",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Steak Thăn Ngoại",
    price: "320k",
    rating: 4.8,
    time: "25 min",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNu0x8iJtxY2GhpAg8pts3iOWRcTjzDZQ8OA&s",
  },
  {
    name: "Dimsum Tổng Hợp",
    price: "180k",
    rating: 4.6,
    time: "20 min",
    image:
      "https://images.unsplash.com/photo-1496116218417-1a781b1c416c?auto=format&fit=crop&w=800&q=80",
  },
  {
    name: "Gà Rán Hàn Quốc",
    price: "160k",
    rating: 4.7,
    time: "20 min",
    image:
      "https://cdn.tgdd.vn/Files/2017/03/22/963765/cach-lam-ga-ran-thom-ngon-8_760x450.jpg",
  },
  {
    name: "Kem Trái Dừa",
    price: "45k",
    rating: 4.4,
    time: "5 min",
    image:
      "https://file.hstatic.net/200000721249/file/cach_lam_kem_dua_matcha_92c03c90fe6c4e22806e1126feedc319.jpg",
  },
];

const FoodItem = ({ food, index }) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const hoverAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Hiệu ứng hiện ra so le (Staggered)
    Animated.spring(scaleAnim, {
      toValue: 1,
      delay: index * 100,
      tension: 50,
      friction: 7,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.timing(hoverAnim, {
      toValue: 0.95,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(hoverAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleMouseEnter = () => {
    Animated.timing(hoverAnim, {
      toValue: 1.05,
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
      activeOpacity={1}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.foodItem}
    >
      <Animated.View
        style={[
          styles.card,
          { transform: [{ scale: scaleAnim }, { scale: hoverAnim }] },
        ]}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Ảnh món ăn */}
        <Image source={{ uri: food.image }} style={styles.image} />

        {/* Badge Giảm giá hoặc Rating */}
        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={12} color="#FFD700" />
          <Text style={styles.ratingText}>{food.rating}</Text>
        </View>

        {/* Overlay Gradient lộng lẫy */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]}
          style={styles.gradientOverlay}
        >
          <Text style={styles.foodName} numberOfLines={1}>
            {food.name}
          </Text>
          <View style={styles.infoRow}>
            <Text style={styles.foodPrice}>{food.price}</Text>
            <View style={styles.timeRow}>
              <Ionicons name="time-outline" size={12} color="#ddd" />
              <Text style={styles.timeText}>{food.time}</Text>
            </View>
          </View>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

const FoodList = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.sectionTitle}>Món ngon dành cho bạn ✨</Text>
      <View style={styles.grid}>
        {foodData.map((food, index) => (
          <FoodItem key={index} food={food} index={index} />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f1f5f9",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1e293b",
    marginBottom: 20,
    marginTop: 10,
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  foodItem: {
    width: width < 600 ? "48%" : "31%",
    marginBottom: 20,
  },
  card: {
    borderRadius: 24,
    backgroundColor: "#fff",
    height: 240,
    overflow: "hidden",
    // Shadow cho Mobile
    elevation: 8,
    // Shadow cho iOS/Web
    shadowColor: "#64748b",
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  ratingBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  ratingText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  gradientOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "60%",
    justifyContent: "flex-end",
    padding: 15,
  },
  foodName: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 4,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  foodPrice: {
    color: "#60a5fa", // Màu xanh dương sáng lộng lẫy
    fontSize: 15,
    fontWeight: "bold",
  },
  timeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  timeText: {
    color: "#cbd5e1",
    fontSize: 11,
  },
});

export default FoodList;
