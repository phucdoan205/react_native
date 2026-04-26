import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const API_URL = "http://localhost:5000/friends";

const InputField = ({
  icon,
  placeholder,
  value,
  onChangeText,
  keyboardType,
}) => (
  <View style={styles.inputWrapper}>
    <MaterialIcons
      name={icon}
      size={20}
      color="rgba(255,255,255,0.7)"
      style={styles.icon}
    />
    <TextInput
      placeholder={placeholder}
      placeholderTextColor="rgba(255,255,255,0.5)"
      value={value}
      onChangeText={onChangeText}
      style={styles.input}
      keyboardType={keyboardType}
    />
  </View>
);

const AddFriend = ({ navigation, route }) => {
  const { friend } = route.params || {};
  const [name, setName] = useState(friend ? friend.name : "");
  const [phone, setPhone] = useState(friend ? friend.phone : "");
  const [email, setEmail] = useState(friend ? friend.email : "");
  const [avatar, setAvatar] = useState(friend ? friend.avatar : "");

  const handleAddOrUpdateFriend = async () => {
    if (!name || !phone || !email || !avatar) {
      if (Platform.OS === "web") alert("Vui lòng điền đầy đủ các trường!");
      else Alert.alert("Thông báo", "Vui lòng điền đầy đủ các trường!");
      return;
    }

    try {
      if (friend) {
        await axios.put(`${API_URL}/${friend._id}`, {
          name,
          phone,
          email,
          avatar,
        });
        if (Platform.OS === "web") alert("Cập nhật thành công!");
      } else {
        await axios.post(API_URL, { name, phone, email, avatar });
        if (Platform.OS === "web") alert("Đã thêm bạn mới!");
      }
      navigation.goBack();
    } catch (error) {
      alert("Có lỗi xảy ra khi lưu dữ liệu");
    }
  };

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Tiêu đề & Cảm hứng */}
          <View style={styles.headerSection}>
            <Text style={styles.title}>
              {friend ? "Cập nhật tâm giao 🖊️" : "Thêm bạn mới ✨"}
            </Text>
            <Text style={styles.subtitle}>
              {friend
                ? "Chỉnh sửa để giữ thông tin chính xác"
                : "Mở rộng vòng kết nối, lan tỏa niềm vui"}
            </Text>
          </View>

          {/* Form nhập liệu */}
          <View style={styles.formCard}>
            <InputField
              icon="person"
              placeholder="Họ và tên"
              value={name}
              onChangeText={setName}
            />
            <InputField
              icon="phone"
              placeholder="Số điện thoại"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <InputField
              icon="email"
              placeholder="Địa chỉ Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <InputField
              icon="image"
              placeholder="Link ảnh đại diện (URL)"
              value={avatar}
              onChangeText={setAvatar}
            />

            {/* Nút hành động */}
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={handleAddOrUpdateFriend}
              style={styles.mainButton}
            >
              <LinearGradient
                colors={["#00c6ff", "#0072ff"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Text style={styles.buttonText}>
                  {friend ? "LƯU THAY ĐỔI" : "THÊM VÀO DANH SÁCH"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    paddingHorizontal: 25,
    paddingTop: Platform.OS === "web" ? 20 : 50,
    paddingBottom: 40,
    alignItems: "center",
  },
  backButton: {
    alignSelf: "flex-start",
    padding: 10,
    marginBottom: 10,
  },
  headerSection: {
    width: "100%",
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "left",
  },
  subtitle: {
    fontSize: 15,
    color: "rgba(255,255,255,0.7)",
    marginTop: 8,
    lineHeight: 22,
  },
  formCard: {
    width: Platform.OS === "web" ? Math.min(width * 0.8, 500) : "100%",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
    borderRadius: 30,
    padding: 25,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 15,
    marginBottom: 18,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  icon: { marginRight: 12 },
  input: {
    flex: 1,
    height: 55,
    color: "#fff",
    fontSize: 16,
    ...Platform.select({
      web: { outlineStyle: "none" },
    }),
  },
  mainButton: {
    marginTop: 10,
    borderRadius: 15,
    overflow: "hidden",
    shadowColor: "#00c6ff",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  gradientButton: {
    paddingVertical: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: 1.2,
  },
});

export default AddFriend;
