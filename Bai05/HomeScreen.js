// Khai báo thư viện React
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
// Sử dụng Icon để tăng tính thẩm mỹ
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Khai báo component HomeScreen
const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Phần nội dung chính bọc trong một Card */}
        <View style={styles.card}>
          <View style={styles.iconWrapper}>
            <MaterialCommunityIcons
              name="home-variant"
              size={60}
              color="#6200ee"
            />
          </View>

          <Text style={styles.title}>Màn hình chính</Text>
          <Text style={styles.subtitle}>
            Chào mừng bạn quay trở lại. Hãy bắt đầu khám phá các tính năng ngay!
          </Text>

          {/* Thay thế Button mặc định bằng TouchableOpacity để tùy chỉnh CSS đẹp hơn */}
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() =>
              navigation.navigate("Detail", { message: "Hello from Home!" })
            }
          >
            <Text style={styles.buttonText}>ĐI ĐẾN CHI TIẾT</Text>
            <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Khai báo CSS "lung linh"
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f2f5", // Màu nền xám nhạt hiện đại
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
    // Hiệu ứng đổ bóng cho iOS và Android
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  iconWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#f3eaff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#777",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 30,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#6200ee",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
    letterSpacing: 1,
  },
});

// Xuất component HomeScreen
export default HomeScreen;
