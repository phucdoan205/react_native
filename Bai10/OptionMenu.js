import React, { useState } from "react"; // Nhập React và useState từ thư viện React
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Modal,
  BackHandler,
} from "react-native"; // Nhập các thành phần cần thiết từ React Native

// Component cho menu tùy chọn
function OptionMenu() {
  const [isDarkMode, setIsDarkMode] = useState(false); // Trạng thái cho chế độ tối
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false); // Trạng thái hiển thị modal thông tin

  // Hàm xử lý khi nhấn vào các tùy chọn menu
  const handleMenuPress = (option) => {
    switch (option) {
      case "Mode":
        setIsDarkMode(!isDarkMode); // Chuyển đổi chế độ giữa sáng và tối
        Alert.alert(
          "Chế độ",
          !isDarkMode ? "Chế độ tối đã được bật" : "Chế độ tối đã được tắt",
        ); // Thông báo chế độ đang được bật
        break;
      case "Info":
        setIsInfoModalVisible(true); // Hiển thị modal thông tin
        break;
      case "Exit":
        Alert.alert("Thoát", "Bạn có chắc chắn muốn thoát?", [
          { text: "Không", style: "cancel" },
          { text: "Có", onPress: () => BackHandler.exitApp() }, // Thoát ứng dụng
        ]);
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.optionMenuContainer}>
      {/* Nút cho chế độ sáng/tối */}
      <TouchableOpacity
        style={[
          styles.optionButton,
          { backgroundColor: isDarkMode ? "#555" : "#E3F2FD" },
        ]}
        onPress={() => handleMenuPress("Mode")}
      >
        <Text
          style={[
            styles.optionText,
            { color: isDarkMode ? "#fff" : "#6200EE" },
          ]}
        >
          Chế độ
        </Text>
      </TouchableOpacity>

      {/* Nút thông tin */}
      <TouchableOpacity
        style={[
          styles.optionButton,
          { backgroundColor: isDarkMode ? "#555" : "#E3F2FD" },
        ]}
        onPress={() => handleMenuPress("Info")}
      >
        <Text
          style={[
            styles.optionText,
            { color: isDarkMode ? "#fff" : "#6200EE" },
          ]}
        >
          Thông tin
        </Text>
      </TouchableOpacity>

      {/* Nút thoát */}
      <TouchableOpacity
        style={[
          styles.optionButton,
          { backgroundColor: isDarkMode ? "#555" : "#E3F2FD" },
        ]}
        onPress={() => handleMenuPress("Exit")}
      >
        <Text
          style={[
            styles.optionText,
            { color: isDarkMode ? "#fff" : "#6200EE" },
          ]}
        >
          Thoát
        </Text>
      </TouchableOpacity>

      {/* Modal Thông Tin */}
      <Modal
        transparent={true} // Modal trong suốt
        animationType="slide" // Hiệu ứng trượt cho modal
        visible={isInfoModalVisible} // Điều kiện hiển thị modal
        onRequestClose={() => setIsInfoModalVisible(false)} // Đóng modal khi nhấn nút quay lại
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: isDarkMode ? "#333" : "white" },
            ]}
          >
            <Text
              style={[
                styles.modalTitle,
                { color: isDarkMode ? "#fff" : "#000" },
              ]}
            >
              Thông Tin
            </Text>
            <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>
              Tên: Nguyễn Văn A
            </Text>
            <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>
              Tuổi: 20
            </Text>
            <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>
              Lớp: 20CTT1
            </Text>
            <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>
              Mã số sinh viên: 123456
            </Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsInfoModalVisible(false)} // Đóng modal thông tin
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Các kiểu dáng cho giao diện
const styles = StyleSheet.create({
  optionMenuContainer: {
    flexDirection: "row", // Sắp xếp theo hàng ngang
    paddingRight: 10,
  },
  optionButton: {
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 10,
  },
  optionText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Nền tối cho modal
  },
  modalContent: {
    width: "80%", // Chiều rộng cho modal
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#6200EE", // Màu nền cho nút đóng
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff", // Màu chữ cho nút đóng
  },
});

export default OptionMenu; // Xuất component OptionMenu
