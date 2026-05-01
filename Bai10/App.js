import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Platform, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

// Mockup components (Thay thế bằng file thực tế của bạn)
import HomeScreen from "./HomeScreen";
import ProfileScreen from "./ProfileScreen";
import WeatherApp from "./WeatherApp";
import OptionMenu from "./OptionMenu";

const Tab = createBottomTabNavigator();

// --- FIX ICON CHO WEB ---
if (Platform.OS === "web") {
  const iconFont = require("react-native-vector-icons/Fonts/Ionicons.ttf");
  const iconFontStyles = `@font-face { src: url(${iconFont}); font-family: Ionicons; }`;
  const style = document.createElement("style");
  style.type = "text/css";
  if (style.styleSheet) style.styleSheet.cssText = iconFontStyles;
  else style.appendChild(document.createTextNode(iconFontStyles));
  document.head.appendChild(style);
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          // Cấu hình Icon
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home")
              iconName = focused ? "home" : "home-outline";
            else if (route.name === "Weather")
              iconName = focused ? "cloudy" : "cloudy-outline";
            else if (route.name === "Profile")
              iconName = focused ? "person" : "person-outline";

            return (
              <View style={focused ? styles.activeIconBg : null}>
                <Icon
                  name={iconName}
                  size={focused ? size + 4 : size}
                  color={color}
                />
              </View>
            );
          },

          // Styling Tab Bar hiện đại (Glassmorphism style)
          tabBarStyle: {
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
            elevation: 10,
            backgroundColor: "#ffffff",
            borderRadius: 25,
            height: 70,
            paddingBottom: 10,
            paddingTop: 10,
            borderTopWidth: 0,
            ...styles.shadowEffect, // Hiệu ứng đổ bóng
          },

          // Màu sắc & Font
          tabBarActiveTintColor: "#6200EE",
          tabBarInactiveTintColor: "#A1A1A1",
          tabBarShowLabel: true,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "700",
          },

          // Cấu hình Header "sang chảnh"
          headerRight: () => (
            <View style={{ marginRight: 15 }}>
              <OptionMenu />
            </View>
          ),
          headerStyle: {
            backgroundColor: "#fff",
            elevation: 0, // Xóa shadow mặc định trên Android
            shadowOpacity: 0, // Xóa shadow mặc định trên iOS
            borderBottomWidth: 1,
            borderBottomColor: "#F3F3F3",
          },
          headerTitleStyle: {
            fontWeight: "900",
            fontSize: 20,
            color: "#333",
            letterSpacing: 0.5,
          },
          headerShown: true,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Tab.Screen
          name="Weather"
          component={WeatherApp}
          options={{ title: "Weather" }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ title: "Profile" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  // Hiệu ứng đổ bóng chuẩn hiện đại
  shadowEffect: {
    shadowColor: "#6200EE",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.15,
    shadowRadius: 15,
  },
  // Nền nhẹ khi icon được nhấn (tăng tính tương tác)
  activeIconBg: {
    padding: 6,
    backgroundColor: "rgba(98, 0, 238, 0.08)",
    borderRadius: 15,
  },
});
