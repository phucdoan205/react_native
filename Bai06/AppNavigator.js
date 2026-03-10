import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Dimensions, View, Text, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

// Import các màn hình của bạn
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import FavoritesScreen from "./FavoritesScreen";
import HistoryScreen from "./HistoryScreen";

const { width } = Dimensions.get("window");
const Drawer = createDrawerNavigator();

// --- CUSTOM DRAWER HEADER (Phần Header trong Menu) ---
const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ paddingTop: 0 }}
    >
      {/* Phần Profile lộng lẫy */}
      <LinearGradient
        colors={["#6366f1", "#a855f7"]}
        style={styles.drawerHeader}
      >
        <Image
          source={{ uri: "https://i.pravatar.cc/150?u=gemini" }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.userName}>Chào, Foodie! ✨</Text>
          <Text style={styles.userEmail}>premium.member@elite.com</Text>
        </View>
      </LinearGradient>

      <View style={styles.drawerItemsContainer}>
        <DrawerItemList {...props} />
      </View>

      {/* Footer của Drawer */}
      <View style={styles.drawerFooter}>
        <Text style={styles.versionText}>Elite Food App v1.0.2</Text>
      </View>
    </DrawerContentScrollView>
  );
};

const AppNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Login"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        // --- STYLE CHO TOÀN BỘ DRAWER ---
        drawerStyle: {
          backgroundColor: "#ffffff",
          width: width * 0.75,
          borderTopRightRadius: 30,
          borderBottomRightRadius: 30,
        },
        // --- STYLE KHI ITEM ĐƯỢC CHỌN ---
        drawerActiveTintColor: "#6366f1",
        drawerActiveBackgroundColor: "#f5f3ff",
        drawerInactiveTintColor: "#64748b",
        drawerLabelStyle: {
          marginLeft: -10,
          fontSize: 15,
          fontWeight: "700",
        },
        drawerItemStyle: {
          borderRadius: 15,
          marginVertical: 4,
          paddingHorizontal: 8,
        },
        // --- STYLE CHO HEADER (THANH TRÊN CÙNG) ---
        headerStyle: {
          backgroundColor: "#f8fafc",
          elevation: 0, // Xóa shadow trên Android
          shadowOpacity: 0, // Xóa shadow trên iOS
        },
        headerTitleStyle: {
          fontWeight: "900",
          color: "#1e293b",
          fontSize: 20,
        },
        headerTintColor: "#6366f1", // Màu của icon Menu
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: "Khám Phá",
          drawerIcon: ({ color }) => (
            <Ionicons name="compass-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: "Yêu Thích",
          drawerIcon: ({ color }) => (
            <Ionicons name="heart-outline" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="History"
        component={HistoryScreen}
        options={{
          title: "Lịch Sử Đặt",
          drawerIcon: ({ color }) => (
            <Ionicons name="time-outline" size={22} color={color} />
          ),
        }}
      />
      {/* Ẩn Login khỏi Drawer nhưng vẫn giữ trong Stack */}
      <Drawer.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
          drawerItemStyle: { display: "none" },
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    height: 180,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingTop: 30,
    marginBottom: 10,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "rgba(255,255,255,0.4)",
    marginBottom: 12,
  },
  userName: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "900",
  },
  userEmail: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontWeight: "500",
  },
  drawerItemsContainer: {
    paddingHorizontal: 10,
  },
  drawerFooter: {
    marginTop: 20,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    alignItems: "center",
  },
  versionText: {
    color: "#cbd5e1",
    fontSize: 11,
    fontWeight: "600",
  },
});

export default AppNavigator;
