import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";

// Import các màn hình của bạn
import LoginScreen from "./LoginScreen";
import HomeScreen from "./HomeScreen";
import RegisterScreen from "./RegisterScreen";
// import RegisterScreen from "./RegisterScreen";

const Stack = createStackNavigator();

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        setUser(!!token); // true nếu có token, false nếu không
      } catch (e) {
        setUser(false);
      } finally {
        setLoading(false);
      }
    };
    checkToken();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user === false ? (
          <>
            <Stack.Screen name="Login">
              {(props) => <LoginScreen {...props} setUser={setUser} />}
            </Stack.Screen>
            {/* Thêm dòng này để Stack biết trang Register tồn tại */}
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          /* <Stack.Screen name="Register" component={RegisterScreen} /> */
          // LUỒNG ĐÃ ĐĂNG NHẬP
          <Stack.Screen name="Home">
            {(props) => <HomeScreen {...props} setUser={setUser} />}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
