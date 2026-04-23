import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FriendList from "./FriendList";
import AddFriend from "./AddFriend"; // Nhập thành phần thêm bạn bè

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FriendList">
        <Stack.Screen
          name="FriendList"
          component={FriendList}
          options={{
            title: "Danh Sách Bạn Bè",
            headerStyle: { backgroundColor: "#f4511e" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
        <Stack.Screen
          name="AddFriend"
          component={AddFriend}
          options={{
            title: "Thêm Bạn Bè",
            headerStyle: { backgroundColor: "#f4511e" },
            headerTintColor: "#fff",
            headerTitleStyle: { fontWeight: "bold" },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
