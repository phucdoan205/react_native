import React, { useState } from "react";
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
  Dimensions,
  Platform, // Thêm Platform để xử lý riêng cho Web nếu cần
} from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
// Sử dụng thư viện icon của Expo để hỗ trợ Web tốt nhất
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const API_URL = "http://localhost:5000/friends";

const FriendList = ({ navigation }) => {
  const [friends, setFriends] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const fetchFriends = async () => {
    try {
      const response = await axios.get(API_URL, {
        params: { search: searchQuery },
      });
      setFriends(response.data);
    } catch (error) {
      // Trên Web Alert.alert hoạt động như window.confirm/alert
      if (Platform.OS === "web") {
        alert("Không thể tải danh sách bạn bè");
      } else {
        Alert.alert("Lỗi", "Không thể tải danh sách bạn bè");
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchFriends();
    }, [searchQuery]),
  );

  const openModal = (friend) => {
    setSelectedFriend(friend);
    setModalVisible(true);
  };

  const handleDelete = async () => {
    if (selectedFriend) {
      const confirmDelete = () => {
        axios
          .delete(`${API_URL}/${selectedFriend._id}`)
          .then(() => {
            fetchFriends();
            setModalVisible(false);
          })
          .catch(() => alert("Xóa thất bại"));
      };

      if (Platform.OS === "web") {
        if (window.confirm(`Bạn có chắc muốn xóa ${selectedFriend.name}?`)) {
          confirmDelete();
        }
      } else {
        Alert.alert("Xác nhận", "Bạn có chắc chắn muốn xóa?", [
          { text: "Hủy", style: "cancel" },
          { text: "Xóa", style: "destructive", onPress: confirmDelete },
        ]);
      }
    }
  };

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Kết nối & Lan tỏa ✨</Text>
        <Text style={styles.subGreeting}>
          Danh sách những người bạn tuyệt vời
        </Text>
      </View>

      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <MaterialIcons
          name="search"
          size={22}
          color="#fff"
          style={styles.searchIcon}
        />
        <TextInput
          placeholder="Tìm kiếm tâm giao..."
          placeholderTextColor="rgba(255,255,255,0.7)"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.input}
        />
      </View>

      <FlatList
        data={friends}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.friendCard}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.friendInfo}>
              <Text style={styles.friendName}>{item.name}</Text>
              <View style={styles.rowInfo}>
                <MaterialIcons name="phone" size={14} color="#ddd" />
                <Text style={styles.friendDetail}>{item.phone}</Text>
              </View>
              <View style={styles.rowInfo}>
                <MaterialIcons name="email" size={14} color="#ddd" />
                <Text style={styles.friendDetail}>{item.email}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.moreButton}
              onPress={() => openModal(item)}
            >
              <MaterialIcons name="more-vert" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Nút thêm mới */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.addButton}
        onPress={() => navigation.navigate("AddFriend")}
      >
        <LinearGradient
          colors={["#00c6ff", "#0072ff"]}
          style={styles.addGradient}
        >
          <MaterialIcons name="person-add" size={30} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Modal Tùy chọn */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              Tùy chọn cho {selectedFriend?.name}
            </Text>

            <TouchableOpacity
              style={[styles.modalAction, { backgroundColor: "#4c669f" }]}
              onPress={() => {
                navigation.navigate("AddFriend", { friend: selectedFriend });
                setModalVisible(false);
              }}
            >
              <MaterialIcons name="edit" size={22} color="#fff" />
              <Text style={styles.modalActionText}>Chỉnh sửa thông tin</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalAction, { backgroundColor: "#ff4b5c" }]}
              onPress={handleDelete}
            >
              <MaterialIcons name="delete-outline" size={22} color="#fff" />
              <Text style={styles.modalActionText}>Xóa khỏi danh sách</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelAction}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Platform.OS === "web" ? "10%" : 20, // Canh giữa hơn trên màn hình Web rộng
  },
  header: {
    marginTop: Platform.OS === "web" ? 30 : 50,
    marginBottom: 20,
  },
  greeting: { fontSize: 28, fontWeight: "bold", color: "#fff" },
  subGreeting: { fontSize: 14, color: "rgba(255,255,255,0.8)", marginTop: 5 },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    ...Platform.select({
      web: { outlineStyle: "none" }, // Xóa viền đen khi focus trên Web
    }),
  },
  input: {
    flex: 1,
    height: 45,
    color: "#fff",
    fontSize: 16,
    ...Platform.select({
      web: { outlineStyle: "none" },
    }),
  },
  searchIcon: { marginRight: 10 },

  friendCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    // Shadow cho Mobile
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    // Shadow cho Web
    ...Platform.select({
      web: { cursor: "pointer", transition: "0.3s" },
    }),
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#fff",
  },
  friendInfo: { flex: 1, marginLeft: 15 },
  friendName: {
    fontSize: 19,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 5,
  },
  rowInfo: { flexDirection: "row", alignItems: "center", marginBottom: 2 },
  friendDetail: { color: "#eee", fontSize: 13, marginLeft: 5 },
  moreButton: { padding: 5 },

  addButton: {
    position: "absolute",
    bottom: 30,
    right: Platform.OS === "web" ? "12%" : 25,
    zIndex: 999,
  },
  addGradient: {
    width: 65,
    height: 65,
    borderRadius: 33,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      web: { cursor: "pointer", boxShadow: "0px 10px 20px rgba(0,0,0,0.3)" },
    }),
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: Platform.OS === "web" ? 400 : width * 0.85,
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 25,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  modalAction: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    ...Platform.select({ web: { cursor: "pointer" } }),
  },
  modalActionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 10,
  },
  cancelAction: { marginTop: 10, padding: 10 },
  cancelText: { color: "#999", fontSize: 16, fontWeight: "500" },
});

export default FriendList;
