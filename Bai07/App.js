import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import HomeScreen from "./HomeScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native"; // Thêm để làm màn hình chờ

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Trạng thái chờ kiểm tra token

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        // Quan trọng: Phải ép kiểu Boolean rõ ràng
        setUser(!!token); 
      } catch (e) {
        setUser(false);
      } finally {
        setLoading(false); // Đã kiểm tra xong
      }
    };
    checkToken();
  }, []);

  // Nếu đang loading thì hiện vòng xoay, tránh render Navigator quá sớm gây lỗi cast boolean
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user === false ? (
          // Nhóm màn hình khi chưa đăng nhập
          <>
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} setUser={setUser} />}
            </Stack.Screen>
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          // Nhóm màn hình khi đã đăng nhập
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;