import React, { useState } from "react"; // Nhập các hook từ React
import {
  View,
  Text,
  FlatList,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
} from "react-native"; // Nhập các thành phần từ React Native
import axios from "axios"; // Nhập thư viện axios để thực hiện các yêu cầu HTTP
import { useFocusEffect } from "@react-navigation/native"; // Nhập hook để xử lý khi màn hình được hiển thị
import Icon from "react-native-vector-icons/MaterialIcons"; // Nhập biểu tượng từ thư viện Material Icons

const API_URL = "http://localhost:5000/friends"; // Đường dẫn API để lấy danh sách bạn bè

const FriendList = ({ navigation }) => {
  // Component chính nhận navigation prop
  const [friends, setFriends] = useState([]); // State để lưu danh sách bạn bè
  const [searchQuery, setSearchQuery] = useState(""); // State để lưu truy vấn tìm kiếm
  const [filteredFriends, setFilteredFriends] = useState([]); // State để lưu danh sách bạn bè đã lọc
  const [modalVisible, setModalVisible] = useState(false); // State để kiểm soát hiển thị modal
  const [selectedFriend, setSelectedFriend] = useState(null); // State để lưu bạn bè được chọn

  const fetchFriends = async () => {
    // Hàm lấy danh sách bạn bè từ API
    try {
      const response = await axios.get(API_URL, {
        params: { search: searchQuery }, // Thêm tham số tìm kiếm
      });
      setFriends(response.data); // Cập nhật danh sách bạn bè
      setFilteredFriends(response.data); // Cập nhật danh sách bài bè đã lọc
    } catch (error) {
      Alert.alert("Error", "Error fetching friends"); // Hiển thị thông báo lỗi nếu có
    }
  };

  useFocusEffect(
    // Hook để gọi lại hàm khi màn hình được hiển thị
    React.useCallback(() => {
      fetchFriends(); // Gọi hàm lấy danh sách bạn bè
    }, [searchQuery]), // Chạy lại khi searchQuery thay đổi
  );

  const handleSearch = (query) => {
    // Hàm để xử lý tìm kiếm
    setSearchQuery(query); // Cập nhật truy vấn tìm kiếm
  };

  const openModal = (friend) => {
    // Hàm mở modal với thông tin bạn bè được chọn
    setSelectedFriend(friend); // Lưu thông tin bạn bè được chọn
    setModalVisible(true); // Hiển thị modal
  };

  const handleEdit = () => {
    // Hàm để xử lý cập nhật bạn bè
    if (selectedFriend) {
      // Kiểm tra xem có bạn bè nào được chọn không
      navigation.navigate("AddFriend", { friend: selectedFriend }); // Điều hướng đến trang thêm/cập nhật bạn bè
      setModalVisible(false); // Đóng modal
    }
  };

  const handleDelete = async () => {
    // Hàm để xử lý xóa bạn bè
    if (selectedFriend) {
      // Kiểm tra xem có bạn bè nào được chọn không
      try {
        await axios.delete(`${API_URL}/${selectedFriend._id}`); // Gửi yêu cầu DELETE đến API
        Alert.alert("Success", "Friend has been deleted!"); // Hiển thị thông báo thành công
        fetchFriends(); // Gọi lại hàm để cập nhật danh sách bạn bè
      } catch (error) {
        Alert.alert("Error", "Error deleting friend"); // Hiển thị thông báo lỗi nếu có
      } finally {
        setModalVisible(false); // Đóng modal
      }
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search friends" // Placeholder cho ô tìm kiếm
        value={searchQuery} // Giá trị của ô tìm kiếm
        onChangeText={handleSearch} // Hàm xử lý khi thay đổi văn bản
        style={styles.input} // Style cho ô tìm kiếm
      />

      <FlatList
        data={filteredFriends} // Dữ liệu để hiển thị trong danh sách
        keyExtractor={(item) => item._id} // Chỉ định key cho từng phần tử
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <Image
              source={{ uri: item.avatar }} // Hiển thị ảnh đại diện
              style={styles.avatar} // Style cho ảnh
            />
            <View style={styles.friendInfo}>
              <Text style={styles.friendName}>{item.name}</Text>
              <Text style={styles.friendDetail}>{item.phone}</Text>
              <Text style={styles.friendDetail}>{item.email}</Text>
            </View>
            <TouchableOpacity
              style={styles.menuButton} // Nút mở modal
              onPress={() => openModal(item)} // Gọi hàm mở modal với bạn bè được chọn
            >
              <Text style={styles.menuText}>⋮</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton} // Nút thêm bạn
        onPress={() => navigation.navigate("AddFriend")} // Điều hướng đến trang thêm bạn
      >
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      {/* Modal cho các tùy chọn Cập nhật và Xóa */}
      <Modal
        transparent={true} // Modal trong suốt
        visible={modalVisible} // Hiển thị modal
        animationType="slide" // Hiệu ứng mở modal
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Options</Text>

            <TouchableOpacity style={styles.modalButton} onPress={handleEdit}>
              <Icon name="edit" size={20} color="#ffffff" />
              <Text style={styles.modalButtonText}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalButton} onPress={handleDelete}>
              <Icon name="delete" size={20} color="#ffffff" />
              <Text style={styles.modalButtonText}>Delete</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  input: {
    borderWidth: 1,
    borderColor: "#ced4da",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
  friendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 15,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  friendInfo: { flex: 1 },
  friendName: { fontSize: 18, fontWeight: "bold" },
  friendDetail: { color: "#6c757d" },
  menuButton: { marginLeft: 10 },
  menuText: { fontSize: 24 },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 40,
    backgroundColor: "#28a745",
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  addButtonText: { fontSize: 30, color: "#ffffff" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  modalContent: {
    width: 250,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    alignItems: "flex-start",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  modalButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
  },
  modalButtonText: {
    color: "#ffffff",
    textAlign: "center",
    marginLeft: 10,
  },
  closeButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
});

export default FriendList; // Xuất component FriendList
