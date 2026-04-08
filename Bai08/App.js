// Nhập các thư viện cần thiết
import React from "react"; // Nhập React để sử dụng
import { NavigationContainer } from "@react-navigation/native"; // Nhập NavigationContainer để quản lý điều hướng
import { createNativeStackNavigator } from "@react-navigation/native-stack"; // Nhập stack navigator cho điều hướng ngăn xếp
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; // Nhập bottom tab navigator cho điều hướng tab
import { Provider } from "react-redux"; // Nhập Provider từ react-redux để kết nối store Redux
import store from "./Store"; // Nhập store từ file Store.js
import ContactList from "./ContactList"; // Nhập thành phần danh sách liên hệ
import AddContact from "./AddContact"; // Nhập thành phần thêm liên hệ
import ChatApp from "./ChatApp"; // Nhập thành phần ứng dụng chat
import TasksScreen from "./TasksScreen"; // Nhập thành phần màn hình công việc

// Tạo một stack navigator
const Stack = createNativeStackNavigator();
// Tạo một bottom tab navigator
const Tab = createBottomTabNavigator();

// Định nghĩa stack cho danh bạ
const ContactStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Contacts" // Tên màn hình
        component={ContactList} // Thành phần hiển thị cho màn hình này
        options={{ title: "My Contacts" }} // Thiết lập tiêu đề cho màn hình danh bạ
      />
      <Stack.Screen
        name="AddContact" // Tên màn hình thêm liên hệ
        component={AddContact} // Thành phần hiển thị cho màn hình này
        options={{ title: "Add Contact" }} // Thiết lập tiêu đề cho màn hình thêm liên hệ
      />
    </Stack.Navigator>
  );
};

// Định nghĩa thành phần chính của ứng dụng
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="Tasks" component={TasksScreen} />
          <Tab.Screen name="Contacts" component={ContactStack} />
          <Tab.Screen name="Chat" component={ChatApp} />
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

// Xuất thành phần App để sử dụng trong ứng dụng
export default App;
