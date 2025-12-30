import React, { useState, useEffect } from 'react'; //Nhập React và useState, useEffect
import { View, Text, Button, Modal, ActivityIndicator, StyleSheet, Alert, BackHandler } from 'react-native';
// Nhập các thành phần cần thiết từ React Native

const ModalActivityIndicator = () => {
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái cho Modal
  const [loading, setLoading] = useState(false); // Trạng thái cho ActivityIndicator

  const handleButtonPress = () => {
    setLoading(true); // Bắt đầu tải
    setModalVisible(true); // Hiển thị modal

    setTimeout(() => {
      setLoading(false); // Kết thúc tải
      // Không đóng modal tự động
    }, 3000); // Thời gian giả lập là 3 giây
  };

  const hideModal = () => {
    setModalVisible(false); // Ẩn modal
  };

  // Hàm xử lý khi nhấn nút back
  const handleBackPress = () => {
    Alert.alert(
      "Thông báo",
      "Bạn đã tắt modal bằng nút back của thiết bị",
      [
        {
          text: "OK",
          onPress: hideModal, // Đóng modal sau khi nhấn OK
        },
      ]
    );
    return true; // Ngăn không cho hành động back mặc định
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress); // Đăng ký sự kiện back
    return () => backHandler.remove(); // Gỡ bỏ sự kiện khi component unmount
  }, []);

  return (
    <View style={styles.container}>
      <Button title="Mở Modal" onPress={handleButtonPress} />

      <Modal
        animationType="slide" // Kiểu hoạt ảnh khi mở modal
        transparent={true} // Để modal có nền trong suốt
        visible={modalVisible} // Điều kiện hiển thị modal
        onRequestClose={hideModal} // Đóng modal khi nhấn nút quay lại (Android)
      >
        <View style={styles.modalView}>
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Text>Đang chờ...</Text>
          )}
          <Button title="Ẩn Modal" onPress={hideModal} />
        </View>
      </Modal>
    </View>
  );
};

// Các kiểu dáng cho thành phần
const styles = StyleSheet.create({
  container: {
    flex: 1, // Chiếm toàn bộ không gian
    justifyContent: 'center', // Căn giữa theo chiều dọc
    alignItems: 'center', // Căn giữa theo chiều ngang
  },
  modalView: {
    flex: 1, // Chiếm toàn bộ không gian modal
    justifyContent: 'center', // Căn giữa nội dung modal
    alignItems: 'center', // Căn giữa nội dung modal
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền tối với độ trong suốt
  },
});

// Xuất thành phần chính
export default ModalActivityIndicator;