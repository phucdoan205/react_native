import React from "react";
import { StatusBar, Platform, StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./HomeScreen";
import PlayerScreen from "./PlayerScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    // SafeAreaProvider giúp xử lý phần "tai thỏ" trên mobile và layout chuẩn trên web
    <SafeAreaProvider>
      <View style={styles.container}>
        <NavigationContainer>
          {/* 
            Trên Web, StatusBar sẽ bị bỏ qua, nhưng trên Mobile 
            nó sẽ giúp giao diện tràn viền cực lung linh.
          */}
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          />

          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={{
              headerTransparent: true,
              headerShadowVisible: false,
              headerTitleAlign: "center",
              // Hiệu ứng trượt ngang mượt mà.
              // CardStyleInterpolators hoạt động tốt trên cả Web và Mobile.
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
              headerBackTitleVisible: false,
              // Tăng cường trải nghiệm Web: bỏ qua phần nền xám mặc định
              cardStyle: { backgroundColor: "transparent" },
            }}
          >
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Player"
              component={PlayerScreen}
              options={{
                title: "",
                headerTintColor: "#fff",
                // Chỉnh sửa logic header cho Web để tránh bị lệch
                headerLeftContainerStyle: {
                  paddingLeft: Platform.OS === "web" ? 20 : 0,
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // Trên web, nếu bạn muốn giới hạn độ rộng để trông giống app mobile:
    // maxWidth: Platform.OS === 'web' ? 500 : '100%',
    // alignSelf: 'center',
    // width: '100%',
    backgroundColor: "#000", // Nền ngoài cùng
  },
});

export default App;
