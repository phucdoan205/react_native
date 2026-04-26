import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import FriendList from "./FriendList";
import AddFriend from "./AddFriend";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="FriendList"
        screenOptions={{
          // Màu nền header (Dùng màu tím đậm để khớp với Gradient bắt đầu)
          headerStyle: {
            backgroundColor: "#667eea",
            borderBottomWidth: 0, // Xóa đường kẻ dưới header trên iOS
            shadowColor: "transparent", // Xóa bóng đổ trên Android giúp giao diện liền mạch
          },
          headerTintColor: "#fff", // Màu chữ và nút Back là trắng
          headerTitleStyle: {
            fontWeight: "800",
            fontSize: 20,
          },
          headerTitleAlign: "center", // Căn giữa tiêu đề cho hiện đại
          headerShadowVisible: false, // Xóa đường kẻ header trên phiên bản mới
        }}
      >
        <Stack.Screen
          name="FriendList"
          component={FriendList}
          options={{
            title: "DANH BẠ TÂM GIAO",
            // Nếu bạn muốn giao diện tràn viền hoàn toàn lung linh,
            // có thể ẩn header bằng cách: headerShown: false
            headerShown: Platform.OS === "web" ? true : false,
          }}
        />
        <Stack.Screen
          name="AddFriend"
          component={AddFriend}
          options={({ route }) => ({
            title: route.params?.friend ? "CHỈNH SỬA" : "THÊM BẠN MỚI",
            // Hiệu ứng modal khi mở màn hình thêm bạn trên iOS
            presentation: "modal",
            headerStyle: { backgroundColor: "#667eea" },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
