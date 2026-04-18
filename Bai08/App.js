// Nhập các thư viện cần thiết
import React from "react";
import { Platform } from "react-native"; // Thêm Platform để kiểm tra môi trường
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";

import store from "./Store";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import ChatApp from "./ChatApp";
import TasksScreen from "./TasksScreen";

// --- ĐOẠN CODE FIX ICON CHO WEB ---
if (Platform.OS === "web") {
  const iconFontStyles = `
    @font-face {
      src: url(${require("react-native-vector-icons/Fonts/Ionicons.ttf")});
      font-family: Ionicons;
    }
  `;
  const style = document.createElement("style");
  style.type = "text/css";
  if (style.styleSheet) {
    style.styleSheet.cssText = iconFontStyles;
  } else {
    style.appendChild(document.createTextNode(iconFontStyles));
  }
  document.head.appendChild(style);
}
// ---------------------------------

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ContactStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContactsList"
        component={ContactList}
        options={{ title: "My Contacts" }}
      />
      <Stack.Screen
        name="AddContact"
        component={AddContact}
        options={{ title: "Add Contact" }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Tasks") {
                iconName = focused ? "list-circle" : "list-circle-outline";
              } else if (route.name === "Contacts") {
                iconName = focused ? "people" : "people-outline";
              } else if (route.name === "Chat") {
                iconName = focused ? "chatbubbles" : "chatbubbles-outline";
              }

              // Trả về component Icon
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#6366f1",
            tabBarInactiveTintColor: "gray",
            tabBarStyle: {
              paddingBottom: 5,
              height: 60,
              // Thêm style cho web để hiển thị chuyên nghiệp hơn
              ...Platform.select({
                web: {
                  borderTopWidth: 1,
                  borderTopColor: "#e2e8f0",
                },
              }),
            },
            headerShown: false,
          })}
        >
          <Tab.Screen
            name="Tasks"
            component={TasksScreen}
            options={{ title: "Công việc" }}
          />
          <Tab.Screen
            name="Contacts"
            component={ContactStack}
            options={{ title: "Danh bạ" }}
          />
          <Tab.Screen
            name="Chat"
            component={ChatApp}
            options={{ title: "Tin nhắn" }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
