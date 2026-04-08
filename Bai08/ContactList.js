// Nhập các thư viện cần thiết
import React, { useEffect, useState } from "react"; // Nhập React và các hook cần thiết
import { View, FlatList, StyleSheet, Alert } from "react-native"; // Nhập thành phần từ React Native
import { Card, Title, Paragraph, IconButton, FAB } from "react-native-paper"; // Nhập các thành phần từ react-native-paper
import AsyncStorage from "@react-native-async-storage/async-storage"; // Nhập AsyncStorage để lưu trữ dữ liệu

// Định nghĩa thành phần ContactList
const ContactList = ({ navigation }) => {
  const [contacts, setContacts] = useState([]); // Khởi tạo trạng thái cho danh bạ

  // Hàm để tải danh bạ từ AsyncStorage
  const loadContacts = async () => {
    try {
      const storedContacts = await AsyncStorage.getItem("contacts"); // Lấy dữ liệu từ AsyncStorage
      if (storedContacts) {
        setContacts(JSON.parse(storedContacts)); // Cập nhật trạng thái với dữ liệu đã phân tích
      }
    } catch (error) {
      console.error("Error loading contacts", error); // Ghi lỗi nếu có
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadContacts(); // Tải lại danh bạ mỗi khi màn hình được focus
    });
    return unsubscribe;
  }, [navigation]);

  // Hàm để chỉnh sửa liên hệ
  const editContact = (index) => {
    const contact = contacts[index]; // Lấy liên hệ theo chỉ số
    navigation.navigate("AddContact", { contact, index }); // Điều hướng đến màn hình thêm liên hệ
  };

  // Hàm để xóa liên hệ
  const deleteContact = (index) => {
    Alert.alert(
      "Delete Contact", // Tiêu đề của hộp thoại
      "Are you sure you want to delete this contact?", // Thông báo
      [
        { text: "Cancel", style: "cancel" }, // Nút hủy
        {
          text: "OK",
          onPress: () => {
            const updatedContacts = contacts.filter((_, i) => i !== index); // Lọc liên hệ để xóa
            setContacts(updatedContacts); // Cập nhật trạng thái
            AsyncStorage.setItem("contacts", JSON.stringify(updatedContacts)); // Lưu dữ liệu đã cập nhật
          },
        },
      ],
    );
  };

  // Giao diện của thành phần
  return (
    <View style={styles.container}>
      <FlatList
        data={contacts} // Dữ liệu để hiển thị
        keyExtractor={(item, index) => index.toString()} // Chìa khóa cho mỗi item
        renderItem={({ item, index }) => (
          <Card style={styles.contactCard}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.contactInfo}>
                <Title style={styles.contactName}>{item.name}</Title>{" "}
                {/* Tên liên hệ */}
                <Paragraph style={styles.contactNumber}>
                  {item.phoneNumber}
                </Paragraph>{" "}
                {/* Số điện thoại */}
              </View>
              <View style={styles.cardActions}>
                <IconButton icon="pencil" onPress={() => editContact(index)} />{" "}
                {/* Nút chỉnh sửa */}
                <IconButton
                  icon="trash-can"
                  onPress={() => deleteContact(index)}
                />{" "}
                {/* Nút xóa */}
              </View>
            </Card.Content>
          </Card>
        )}
      />
      <FAB
        style={styles.fab} // Nút thêm liên hệ
        icon="plus"
        onPress={() => navigation.navigate("AddContact")} // Điều hướng đến màn hình thêm liên hệ
      />
    </View>
  );
};

// Định nghĩa các kiểu dáng cho thành phần
const styles = StyleSheet.create({
  container: {
    flex: 1, // Làm cho container chiếm toàn bộ không gian
    padding: 20, // Padding cho container
  },
  contactCard: {
    marginBottom: 10, // Khoảng cách dưới thẻ liên hệ
    borderRadius: 10, // Bo tròn góc
    elevation: 3, // Độ cao bóng
  },
  cardContent: {
    flexDirection: "row", // Hiển thị các thành phần theo chiều ngang
    justifyContent: "space-between", // Căn giữa các thành phần
    alignItems: "center", // Căn giữa theo chiều dọc
  },
  contactInfo: {
    flex: 1, // Làm cho thông tin liên hệ chiếm toàn bộ không gian còn lại
  },
  contactName: {
    fontSize: 16, // Kích thước chữ cho tên liên hệ
    fontWeight: "bold", // Đậm chữ
  },
  contactNumber: {
    fontSize: 14, // Kích thước chữ cho số điện thoại
    color: "gray", // Màu chữ cho số điện thoại
  },
  cardActions: {
    flexDirection: "row", // Hiển thị các nút theo chiều ngang
    alignItems: "center", // Căn giữa theo chiều dọc
  },
  fab: {
    position: "absolute", // Vị trí tuyệt đối cho nút thêm
    margin: 16, // Khoảng cách
    right: 0, // Căn phải
    bottom: 0, // Căn dưới
  },
});

export default ContactList;
