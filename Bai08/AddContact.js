// Nhập các thư viện cần thiết
import React, { useState, useEffect } from "react"; // Nhập React và các hook cần thiết
import { View, StyleSheet, Alert } from "react-native"; // Nhập thành phần từ React Native
import { TextInput, Button, Title } from "react-native-paper"; // Nhập các thành phần từ react-native-paper
import AsyncStorage from "@react-native-async-storage/async-storage"; // Nhập AsyncStorage để lưu trữ dữ liệu

// Định nghĩa thành phần AddContact
const AddContact = ({ navigation, route }) => {
  const [name, setName] = useState(""); // Trạng thái cho tên
  const [phoneNumber, setPhoneNumber] = useState(""); // Trạng thái cho số điện thoại

  // Sử dụng useEffect để khôi phục thông tin liên hệ nếu có
  useEffect(() => {
    if (route.params?.contact) {
      const { contact } = route.params;
      setName(contact.name); // Đặt tên từ params
      setPhoneNumber(contact.phoneNumber); // Đặt số điện thoại từ params
    }
  }, [route.params?.contact]);

  // Hàm để lưu liên hệ
  const saveContact = async () => {
    // Kiểm tra xem tên và số điện thoại có được nhập hay không
    if (!name || !phoneNumber) {
      Alert.alert("Error", "Please enter both name and phone number."); // Hiển thị thông báo lỗi
      return; // Kết thúc hàm nếu có lỗi
    }

    const newContact = { name, phoneNumber }; // Tạo đối tượng liên hệ mới
    const storedContacts = await AsyncStorage.getItem("contacts"); // Lấy danh sách liên hệ từ AsyncStorage
    const contacts = storedContacts ? JSON.parse(storedContacts) : []; // Phân tích dữ liệu nếu có, hoặc khởi tạo mảng rỗng

    // Nếu có chỉ số liên hệ, cập nhật liên hệ đó; nếu không, thêm liên hệ mới
    if (route.params?.index !== undefined) {
      contacts[route.params.index] = newContact; // Cập nhật liên hệ đã tồn tại
    } else {
      contacts.push(newContact); // Thêm liên hệ mới
    }

    await AsyncStorage.setItem("contacts", JSON.stringify(contacts)); // Lưu danh sách liên hệ đã cập nhật vào AsyncStorage
    navigation.navigate("Contacts"); // Điều hướng về màn hình danh bạ
  };

  // Giao diện của thành phần
  return (
    <View style={styles.container}>
      <Title style={styles.title}>Add New Contact</Title> {/* Tiêu đề */}
      <TextInput
        label="Enter Name" // Nhãn cho trường nhập tên
        value={name} // Giá trị của trường nhập tên
        onChangeText={setName} // Cập nhật trạng thái khi người dùng nhập
        style={styles.input} // Kiểu dáng cho trường nhập
        mode="outlined" // Chế độ hiển thị
        theme={{ colors: { primary: "#6200ee" } }} // Màu sắc cho đường viền
      />
      <TextInput
        label="Enter Phone Number" // Nhãn cho trường nhập số điện thoại
        value={phoneNumber} // Giá trị của trường nhập số điện thoại
        onChangeText={setPhoneNumber} // Cập nhật trạng thái khi người dùng nhập
        keyboardType="phone-pad" // Loại bàn phím cho số điện thoại
        style={styles.input} // Kiểu dáng cho trường nhập
        mode="outlined" // Chế độ hiển thị
        theme={{ colors: { primary: "#6200ee" } }} // Màu sắc cho đường viền
      />
      <Button
        mode="contained" // Chế độ hiển thị cho nút
        onPress={saveContact} // Gọi hàm lưu liên hệ khi nhấn nút
        style={styles.button} // Kiểu dáng cho nút
        labelStyle={styles.buttonLabel} // Kiểu dáng cho chữ trên nút
      >
        Save Contact {/* Văn bản trên nút */}
      </Button>
    </View>
  );
};

// Định nghĩa các kiểu dáng cho thành phần
const styles = StyleSheet.create({
  container: {
    flex: 1, // Chiếm toàn bộ không gian
    padding: 20, // Padding cho container
    backgroundColor: "#f9f9f9", // Màu nền cho container
    justifyContent: "center", // Căn giữa nội dung
  },
  title: {
    fontSize: 24, // Kích thước chữ cho tiêu đề
    marginBottom: 20, // Khoảng cách dưới tiêu đề
    textAlign: "center", // Căn giữa chữ
  },
  input: {
    marginBottom: 15, // Khoảng cách dưới trường nhập
    backgroundColor: "white", // Màu nền cho trường nhập
  },
  button: {
    marginTop: 20, // Khoảng cách trên nút
    backgroundColor: "#6200ee", // Màu nền cho nút
  },
  buttonLabel: {
    color: "white", // Màu chữ cho nút
  },
});

export default AddContact;
