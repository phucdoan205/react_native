import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Modal,
  BackHandler,
  Platform,
} from "react-native";

function OptionMenu() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);

  // --- LOGIC THOÁT ĐÃ ĐƯỢC CẬP NHẬT ---
  const handleExitApp = () => {
    if (Platform.OS === "web") {
      // 1. Thử đóng tab ngay lập tức
      window.close();

      // 2. Kiểm tra nếu tab vẫn chưa đóng (do trình duyệt chặn script không được mở bởi window.open)
      // Chúng ta sẽ điều hướng đến một trang trống hoặc thông báo cho người dùng
      setTimeout(() => {
        if (!window.closed) {
          alert(
            "Trình duyệt đã chặn lệnh đóng tab tự động. Vui lòng đóng tab thủ công bằng dấu (x) trên trình duyệt của bạn.",
          );
          // Tùy chọn: Điều hướng về Google hoặc trang trắng để "giả lập" việc thoát
          // window.location.href = "about:blank";
        }
      }, 500);
    } else {
      // Cho Android/iOS
      BackHandler.exitApp();
    }
  };

  const handleMenuPress = (option) => {
    switch (option) {
      case "Mode":
        setIsDarkMode(!isDarkMode);
        Alert.alert(
          "Chế độ",
          !isDarkMode ? "Chế độ tối đã được bật" : "Chế độ tối đã được tắt",
        );
        break;
      case "Info":
        setIsInfoModalVisible(true);
        break;
      case "Exit":
        // Alert này hiển thị đồng nhất trên cả Web và Mobile
        Alert.alert(
          "Xác nhận",
          "Bạn có chắc chắn muốn đóng ứng dụng/tab này không?",
          [
            { text: "Hủy", style: "cancel" },
            {
              text: "Đồng ý",
              onPress: handleExitApp,
            },
          ],
        );
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.optionMenuContainer}>
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
        transparent={true}
        animationType="fade"
        visible={isInfoModalVisible}
        onRequestClose={() => setIsInfoModalVisible(false)}
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
            <Text
              style={[styles.infoText, { color: isDarkMode ? "#ccc" : "#333" }]}
            >
              👤 Nguyễn Văn A
            </Text>
            <Text
              style={[styles.infoText, { color: isDarkMode ? "#ccc" : "#333" }]}
            >
              🎂 20 tuổi
            </Text>
            <Text
              style={[styles.infoText, { color: isDarkMode ? "#ccc" : "#333" }]}
            >
              🎓 Lớp: 20CTT1
            </Text>
            <Text
              style={[styles.infoText, { color: isDarkMode ? "#ccc" : "#333" }]}
            >
              🆔 MSSV: 123456
            </Text>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsInfoModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  optionMenuContainer: {
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
  },
  optionButton: {
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 10,
    minWidth: 90,
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    width: "85%",
    maxWidth: 400,
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    marginVertical: 4,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#6200EE",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default OptionMenu;
