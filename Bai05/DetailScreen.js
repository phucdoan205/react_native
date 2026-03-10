// Khai báo thư viện React
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
// Import Icon để giao diện sinh động hơn
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Khai báo component DetailScreen
const DetailScreen = ({ route, navigation }) => {
  // Nhận dữ liệu từ HomeScreen
  const { message } = route.params || { message: "Không có dữ liệu" };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Nút quay lại ở góc trên bên trái (Tùy chọn nếu không dùng Header mặc định) */}
        <TouchableOpacity
          style={styles.backHeader}
          onPress={() => navigation.goBack()}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={32}
            color="#6200ee"
          />
          <Text style={styles.backHeaderText}>Quay lại</Text>
        </TouchableOpacity>

        <View style={styles.card}>
          {/* Biểu tượng minh họa */}
          <View style={styles.iconContainer}>
            <MaterialCommunityIcons
              name="information-variant"
              size={50}
              color="#fff"
            />
          </View>

          <Text style={styles.title}>Màn hình Chi tiết</Text>

          <View style={styles.messageBox}>
            <Text style={styles.messageLabel}>Thông điệp nhận được:</Text>
            <Text style={styles.messageText}>{message}</Text>
          </View>

          {/* Nút bấm quay lại được thiết kế lại */}
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => navigation.goBack()}
          >
            <MaterialCommunityIcons
              name="undo-variant"
              size={20}
              color="#6200ee"
            />
            <Text style={styles.backButtonText}>Trở về Trang chủ</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Khai báo CSS hiện đại
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  backHeader: {
    position: "absolute",
    top: 20,
    left: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  backHeaderText: {
    fontSize: 16,
    color: "#6200ee",
    fontWeight: "600",
  },
  card: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 35,
    padding: 30,
    alignItems: "center",
    // Shadow cho iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    // Shadow cho Android
    elevation: 12,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#6200ee",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#2d3436",
    marginBottom: 25,
  },
  messageBox: {
    width: "100%",
    backgroundColor: "#f1f2f6",
    padding: 20,
    borderRadius: 20,
    marginBottom: 30,
    borderLeftWidth: 5,
    borderLeftColor: "#6200ee",
  },
  messageLabel: {
    fontSize: 13,
    color: "#636e72",
    textTransform: "uppercase",
    marginBottom: 5,
    fontWeight: "700",
  },
  messageText: {
    fontSize: 18,
    color: "#2d3436",
    fontStyle: "italic",
  },
  backButton: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "#6200ee",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 15,
    alignItems: "center",
  },
  backButtonText: {
    color: "#6200ee",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default DetailScreen;
