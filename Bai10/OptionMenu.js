import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  BackHandler,
  Platform,
} from "react-native";

function OptionMenu() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [popupConfig, setPopupConfig] = useState({
    visible: false,
    title: "",
    message: "",
    buttonText: "OK",
    onClose: null,
  });

  const showPopup = ({ title, message, buttonText = "OK", onClose = null }) => {
    setPopupConfig({
      visible: true,
      title,
      message,
      buttonText,
      onClose,
    });
  };

  const closePopup = () => {
    const callback = popupConfig.onClose;

    setPopupConfig((prev) => ({
      ...prev,
      visible: false,
      onClose: null,
    }));

    if (callback) {
      callback();
    }
  };

  const handleExitApp = () => {
    if (Platform.OS === "web") {
      showPopup({
        title: "Thoát",
        message: "Muốn đóng ứng dụng thì hãy tắt tab trình duyệt này.",
      });
      return;
    }

    BackHandler.exitApp();
  };

  const handleMenuPress = (option) => {
    switch (option) {
      case "Mode": {
        const nextMode = !isDarkMode;
        setIsDarkMode(nextMode);
        showPopup({
          title: "Chế độ",
          message: nextMode
            ? "Chế độ tối đã được bật"
            : "Chế độ sáng đã được bật",
        });
        break;
      }
      case "Info":
        setIsInfoModalVisible(true);
        break;
      case "Exit":
        showPopup({
          title: "Thoát",
          message: "Bạn có muốn đóng ứng dụng này không?",
          buttonText: "Đóng",
          onClose: handleExitApp,
        });
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
          isDarkMode ? styles.activeButton : styles.inactiveButton,
        ]}
        onPress={() => handleMenuPress("Mode")}
      >
        <Text
          style={[
            styles.optionText,
            isDarkMode ? styles.activeText : styles.inactiveText,
          ]}
        >
          Chế độ
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.optionButton,
          isDarkMode ? styles.activeButton : styles.inactiveButton,
        ]}
        onPress={() => handleMenuPress("Info")}
      >
        <Text
          style={[
            styles.optionText,
            isDarkMode ? styles.activeText : styles.inactiveText,
          ]}
        >
          Thông tin
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.optionButton,
          isDarkMode ? styles.activeButton : styles.inactiveButton,
        ]}
        onPress={() => handleMenuPress("Exit")}
      >
        <Text
          style={[
            styles.optionText,
            isDarkMode ? styles.activeText : styles.inactiveText,
          ]}
        >
          Thoát
        </Text>
      </TouchableOpacity>

      <Modal
        transparent
        animationType="fade"
        visible={popupConfig.visible}
        onRequestClose={closePopup}
      >
        <View style={styles.popupOverlay}>
          <View style={styles.popupCard}>
            <Text style={styles.popupTitle}>{popupConfig.title}</Text>
            <Text style={styles.popupMessage}>{popupConfig.message}</Text>

            <TouchableOpacity style={styles.popupAction} onPress={closePopup}>
              <Text style={styles.popupActionText}>
                {popupConfig.buttonText}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent
        animationType="fade"
        visible={isInfoModalVisible}
        onRequestClose={() => setIsInfoModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: isDarkMode ? "#333" : "#FFFFFF" },
            ]}
          >
            <Text
              style={[
                styles.modalTitle,
                { color: isDarkMode ? "#FFFFFF" : "#000000" },
              ]}
            >
              Thông tin
            </Text>
            <Text
              style={[
                styles.infoText,
                { color: isDarkMode ? "#D7D7D7" : "#333333" },
              ]}
            >
              👤 Nguyễn Văn A
            </Text>
            <Text
              style={[
                styles.infoText,
                { color: isDarkMode ? "#D7D7D7" : "#333333" },
              ]}
            >
              🎂 20 tuổi
            </Text>
            <Text
              style={[
                styles.infoText,
                { color: isDarkMode ? "#D7D7D7" : "#333333" },
              ]}
            >
              🎓 Lớp: 20CTT1
            </Text>
            <Text
              style={[
                styles.infoText,
                { color: isDarkMode ? "#D7D7D7" : "#333333" },
              ]}
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
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    minWidth: 90,
    alignItems: "center",
  },
  inactiveButton: {
    backgroundColor: "#E3F2FD",
  },
  activeButton: {
    backgroundColor: "#6200EE",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "600",
  },
  inactiveText: {
    color: "#6200EE",
  },
  activeText: {
    color: "#FFFFFF",
  },
  popupOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    paddingHorizontal: 20,
  },
  popupCard: {
    width: "100%",
    maxWidth: 320,
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
    paddingTop: 18,
    paddingHorizontal: 18,
    paddingBottom: 12,
    elevation: 8,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  popupTitle: {
    fontSize: 24,
    fontWeight: "500",
    color: "#222222",
    marginBottom: 10,
  },
  popupMessage: {
    fontSize: 16,
    color: "#555555",
    lineHeight: 22,
    marginBottom: 18,
  },
  popupAction: {
    alignSelf: "flex-end",
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  popupActionText: {
    color: "#2196F3",
    fontSize: 15,
    fontWeight: "700",
    textTransform: "uppercase",
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
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default OptionMenu;
