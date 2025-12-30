import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import StyleSheetSpinner from "./StyleSheetSpinner";
import StatusBarRefresh from "./StatusBarRefresh";
import LoginScreen from "./LoginScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === "Sales") {
              iconName = "storefront";
            } else if (route.name === "Refresh") {
              iconName = "refresh";
            } else if (route.name === "Login") {
              iconName = "person";
            }
            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#6200EE",
          tabBarInactiveTintColor: "gray",
          headerShown: false, // Ẩn header mặc định để dùng header tự chế cho đẹp
        })}
      >
        <Tab.Screen
          name="Sales"
          component={StyleSheetSpinner}
          options={{ title: "Bán hàng" }} // Tên hiển thị dưới icon
        />
        <Tab.Screen
          name="Refresh"
          component={StatusBarRefresh}
          options={{ title: "Làm mới" }}
        />
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "Tài khoản" }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
