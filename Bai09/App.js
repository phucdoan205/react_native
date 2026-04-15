import React from "react"; // Nhập React
import { NavigationContainer } from "@react-navigation/native"; // Nhập NavigationContainer để điều hướng
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Nhập stack navigator
import { HomeScreen } from "./Animation"; // Import HomeScreen từ file logic.js
import { View, Text, StyleSheet } from "react-native"; // Nhập các thành phần từ React Native
import { Provider as PaperProvider } from "react-native-paper"; // Nhập provider cho react-native-paper

// Tạo stack navigator
const Stack = createNativeStackNavigator();

// Định nghĩa component cho màn hình Screen2
const Screen2 = ({ route }) => {
  const { param1, param2 } = route.params; // Lấy tham số từ route

  return (
    <View style={styles.container2}>
      <Text style={styles.text}>Parameter 1: {param1}</Text>
      <Text style={styles.text}>Parameter 2: {param2}</Text>
    </View>
  );
};

// Định nghĩa component chính của ứng dụng
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "Animation Demo" }}
          />
          <Stack.Screen
            name="Screen2"
            component={Screen2}
            options={{ title: "Route Parameters" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

// Định nghĩa các style cho Screen 2
const styles = StyleSheet.create({
  container2: {
    flex: 1, // Chiếm toàn bộ không gian
    justifyContent: "center", // Căn giữa theo chiều dọc
    alignItems: "center", // Căn giữa theo chiều ngang
    backgroundColor: "#FFF3E0", // Màu nền cho Screen 2
  },
  text: {
    fontSize: 20, // Kích thước chữ
    fontWeight: "bold", // Đậm chữ
    color: "#4E342E", // Màu chữ
    marginVertical: 10, // Khoảng cách dọc giữa các chữ
  },
});
