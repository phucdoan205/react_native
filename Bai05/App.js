// App.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Import các màn hình riêng
import TodoScreen from "./TodoScreen"; // file của bạn
import AppointmentScreen from "./AppointmentLogic"; // ← sửa ở đây (tên biến import)

// ── Fix icon cho Web ──
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import iconFont from "react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf";

if (Platform.OS === "web") {
  const iconFontStyles = `@font-face {
    src: url(${iconFont});
    font-family: MaterialCommunityIcons;
  }`;
  const style = document.createElement("style");
  style.type = "text/css";
  if (style.styleSheet) {
    style.styleSheet.cssText = iconFontStyles;
  } else {
    style.appendChild(document.createTextNode(iconFontStyles));
  }
  document.head.appendChild(style);
}

// ── HomeScreen ──
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.homeBg}>
      <View style={styles.topDecoration} />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.homeScroll}>
          <View style={styles.userHeader}>
            <View>
              <Text style={styles.greetingText}>Chào buổi sáng 👋</Text>
              <Text style={styles.userName}>Người dùng thân mến</Text>
            </View>
            <TouchableOpacity style={styles.profileCircle}>
              <MaterialCommunityIcons
                name="account"
                size={30}
                color="#6200ee"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.mainHighlightCard}>
            <View style={styles.highlightContent}>
              <Text style={styles.highlightTitle}>Bắt đầu ngày mới</Text>
              <Text style={styles.highlightSub}>
                Bạn có các nhiệm vụ đang chờ xử lý. Kiểm tra ngay!
              </Text>
              <TouchableOpacity
                style={styles.highlightBtn}
                onPress={() => navigation.navigate("TodoTab")}
              >
                <Text style={styles.highlightBtnText}>Xem danh sách</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.highlightIconBg}>
              <MaterialCommunityIcons
                name="rocket-launch"
                size={80}
                color="rgba(255,255,255,0.2)"
              />
            </View>
          </View>

          <Text style={styles.sectionTitle}>Tính năng chính</Text>

          <View style={styles.newMenuGrid}>
            <TouchableOpacity
              style={[styles.newMenuItem, { backgroundColor: "#E3F2FD" }]}
              onPress={() => navigation.navigate("TodoTab")}
            >
              <View
                style={[styles.menuIconCircle, { backgroundColor: "#2196F3" }]}
              >
                <MaterialCommunityIcons
                  name="clipboard-text-outline"
                  size={28}
                  color="#fff"
                />
              </View>
              <Text style={styles.newMenuText}>Việc làm</Text>
              <Text style={styles.newMenuSub}>Quản lý Task</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.newMenuItem, { backgroundColor: "#F3E5F5" }]}
              onPress={() => navigation.navigate("Calendar")}
            >
              <View
                style={[styles.menuIconCircle, { backgroundColor: "#9C27B0" }]}
              >
                <MaterialCommunityIcons
                  name="calendar-star"
                  size={28}
                  color="#fff"
                />
              </View>
              <Text style={styles.newMenuText}>Lịch hẹn</Text>
              <Text style={styles.newMenuSub}>Đặt giờ nhắc</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

// ── Bottom Tab Navigator ──
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />

      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#6200ee",
          tabBarInactiveTintColor: "#757575",
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "600",
            paddingBottom: 4,
          },
          tabBarIconStyle: { marginTop: 4 },
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = "home-variant";
            } else if (route.name === "TodoTab") {
              iconName = "clipboard-list";
            } else if (route.name === "Calendar") {
              iconName = "calendar-clock";
            }
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={size + 4}
                color={color}
              />
            );
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ tabBarLabel: "Trang chủ" }}
        />

        <Tab.Screen
          name="TodoTab"
          component={TodoScreen}
          options={{ tabBarLabel: "Việc làm" }}
        />

        <Tab.Screen
          name="Calendar"
          component={AppointmentScreen} // ← dùng đúng tên biến import
          options={{ tabBarLabel: "Lịch hẹn" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// ── Styles ──
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f2f5", paddingHorizontal: 20 },

  homeBg: { flex: 1, backgroundColor: "#f8f9fd" },
  topDecoration: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 230,
    backgroundColor: "#6200ee",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  homeScroll: { paddingHorizontal: 25, paddingBottom: 100 },

  userHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  greetingText: { color: "rgba(255,255,255,0.8)", fontSize: 16 },
  userName: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  profileCircle: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },

  mainHighlightCard: {
    backgroundColor: "#7c4dff",
    borderRadius: 30,
    padding: 25,
    flexDirection: "row",
    overflow: "hidden",
    elevation: 10,
  },
  highlightContent: { flex: 1, zIndex: 1 },
  highlightTitle: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  highlightSub: {
    color: "rgba(255,255,255,0.7)",
    marginTop: 5,
    marginBottom: 15,
    lineHeight: 20,
  },
  highlightBtn: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignSelf: "flex-start",
  },
  highlightBtnText: { color: "#7c4dff", fontWeight: "bold" },
  highlightIconBg: { position: "absolute", right: -15, bottom: -15 },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginTop: 35,
    marginBottom: 20,
  },

  newMenuGrid: { flexDirection: "row", justifyContent: "space-between" },
  newMenuItem: { width: "47%", borderRadius: 25, padding: 20, elevation: 3 },
  menuIconCircle: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  newMenuText: { fontSize: 18, fontWeight: "bold", color: "#333" },
  newMenuSub: { fontSize: 13, color: "#777", marginTop: 4 },

  // Tab bar style
  tabBar: {
    height: 70,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 25,
    backgroundColor: "#fff",
    elevation: 10,
    borderTopWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
});
