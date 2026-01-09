import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

const ItemList = () => {
  const API_URL = "http://192.168.1.10:5000/items";//ip máy chủ
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Lấy danh sách items từ API
  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      // Lưu ý: Thay đổi địa chỉ IP phù hợp với máy tính của bạn khi chạy trên điện thoại thật
      const response = await axios.get(API_URL);
      setItems(response.data);
    } catch (error) {
      Alert.alert("Error", "Could not load items");
      console.error(error);
    }
  };

  const addItem = async () => {
    if (!name || !description) {
      Alert.alert("Error", "Please enter both name and description");
      return;
    }
    try {
      const newItem = { name, description };
      await axios.post(API_URL, newItem);
      Alert.alert("Notice", "Item added successfully");
      loadItems();
      resetForm();
    } catch (error) {
      Alert.alert("Error", "Could not add item");
      console.error(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      Alert.alert("Notice", "Item deleted successfully");
      loadItems();
    } catch (error) {
      Alert.alert("Error", "Could not delete item");
      console.error(error);
    }
  };

  const startEditing = (item) => {
    setEditingId(item._id);
    setName(item.name);
    setDescription(item.description);
  };

  const updateItem = async () => {
    if (!name || !description) {
      Alert.alert("Error", "Please enter both name and description");
      return;
    }
    try {
      const updatedItem = { name, description };
      await axios.put(
        `${API_URL}/${editingId}`,
        updatedItem
      );
      Alert.alert("Notice", "Item updated successfully");
      loadItems();
      resetForm();
    } catch (error) {
      Alert.alert("Error", "Could not update item");
      console.error(error);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setEditingId(null);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemSub}>{item.description}</Text>
      </View>
      <View style={styles.actionGroup}>
        <TouchableOpacity
          style={[styles.miniButton, styles.editBg]}
          onPress={() => startEditing(item)}
        >
          <Text style={styles.miniButtonText}>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.miniButton, styles.deleteBg]}
          onPress={() => deleteItem(item._id)}
        >
          <Text style={styles.miniButtonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.mainWrapper}>
      <Text style={styles.headerTitle}>Quản Lý Sản Phẩm</Text>
      
      <View style={styles.inputCard}>
        <TextInput
          style={styles.modernInput}
          placeholder="Tên sản phẩm..."
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.modernInput, { height: 80 }]}
          placeholder="Mô tả chi tiết..."
          placeholderTextColor="#999"
          multiline
          value={description}
          onChangeText={setDescription}
        />
        <TouchableOpacity 
          style={[styles.mainBtn, editingId ? styles.updateBtn : styles.addBtn]} 
          onPress={editingId ? updateItem : addItem}
        >
          <Text style={styles.mainBtnText}>
            {editingId ? "CẬP NHẬT THAY ĐỔI" : "THÊM SẢN PHẨM MỚI"}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

// 2. PHẦN CSS MỚI - HIỆN ĐẠI & SANG TRỌNG
const styles = StyleSheet.create({
  mainWrapper: {
    flex: 1,
    backgroundColor: "#E3F2FD", // Màu nền xám nhạt hiện đại
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A1A1A",
    marginBottom: 25,
    textAlign: "left",
    letterSpacing: 0.5,
  },
  inputCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    // Đổ bóng (Shadow) cho iOS & Android
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  modernInput: {
    backgroundColor: "#F8F9FA",
    borderWidth: 1,
    borderColor: "#E9ECEF",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
  },
  mainBtn: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
  },
  addBtn: { backgroundColor: "#00C851" },
  updateBtn: { backgroundColor: "#007BFF" },
  mainBtnText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 1,
  },
  itemCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderLeftWidth: 5,
    borderLeftColor: "#00C851", // Vạch màu bên trái tạo điểm nhấn
  },
  itemInfo: { flex: 1, marginRight: 10 },
  itemTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2D3436",
    marginBottom: 4,
  },
  itemSub: {
    fontSize: 14,
    color: "#636E72",
    lineHeight: 20,
  },
  actionGroup: { flexDirection: "column", gap: 8 },
  miniButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    minWidth: 70,
  },
  editBg: { backgroundColor: "#E3F2FD" },
  deleteBg: { backgroundColor: "#FFEBEE" },
  miniButtonText: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "700",
    color: "#333",
  },
  editBtnText: { color: "#007BFF" },
  deleteBtnText: { color: "#D32F2F" },
});

export default ItemList;
