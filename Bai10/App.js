import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "./HomeScreen"; // Import HomeScreen
import ProfileScreen from "./ProfileScreen"; // Giả định bạn đã tạo ProfileScreen
import WeatherApp from "./WeatherApp"; // Giả định bạn đã tạo SettingsScreen
import OptionMenu from "./OptionMenu"; // Giả định bạn đã tạo OptionMenu

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            } else if (route.name === "WeatherApp") {
              iconName = focused ? "cloud" : "cloud-outline";
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#6200EE",
          tabBarInactiveTintColor: "gray",
          headerRight: () => <OptionMenu />,
          headerShown: true,
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="WeatherApp" component={WeatherApp} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
