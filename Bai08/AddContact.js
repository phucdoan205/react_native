import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddContact = ({ navigation, route }) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const isEditing = route.params?.index !== undefined;

  useEffect(() => {
    if (route.params?.contact) {
      const { contact } = route.params;
      setName(contact.name || "");
      setPhoneNumber(contact.phoneNumber || "");
    }
  }, [route.params?.contact]);

  const saveContact = async () => {
    if (!name.trim() || !phoneNumber.trim()) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ tên và số điện thoại.");
      return;
    }

    const newContact = {
      name: name.trim(),
      phoneNumber: phoneNumber.trim(),
    };

    try {
      const storedContacts = await AsyncStorage.getItem("contacts");
      const contacts = storedContacts ? JSON.parse(storedContacts) : [];

      if (isEditing) {
        contacts[route.params.index] = newContact;
      } else {
        contacts.push(newContact);
      }

      await AsyncStorage.setItem("contacts", JSON.stringify(contacts));
      navigation.goBack(); // Dùng goBack để quay lại màn hình trước đó mượt hơn
    } catch (error) {
      Alert.alert("Lỗi", "Không thể lưu liên hệ.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarIcon}>👤</Text>
            </View>
            <Text style={styles.title}>
              {isEditing ? "Chỉnh sửa liên hệ" : "Thêm liên hệ mới"}
            </Text>
            <Text style={styles.subtitle}>
              Lưu thông tin liên lạc của bạn an toàn và nhanh chóng
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Họ và tên</Text>
              <TextInput
                placeholder="Ví dụ: Nguyễn Văn A"
                value={name}
                onChangeText={setName}
                style={styles.input}
                placeholderTextColor="#94a3b8"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Số điện thoại</Text>
              <TextInput
                placeholder="Ví dụ: 090 123 4567"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                keyboardType="phone-pad"
                style={styles.input}
                placeholderTextColor="#94a3b8"
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={saveContact}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>
                {isEditing ? "Cập nhật liên hệ" : "Lưu liên hệ"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Hủy bỏ</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Màu nền xám nhạt hiện đại
  },
  scrollContent: {
    padding: 24,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
    marginTop: 20,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#6366f1",
    borderStyle: "dashed",
  },
  avatarIcon: {
    fontSize: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#1E293B",
    textAlign: "center",
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 20,
  },
  form: {
    width: "100%",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#0F172A",
    // Shadow nhẹ cho input
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  button: {
    marginTop: 10,
    backgroundColor: "#6366f1", // Tím Indigo đồng bộ
    borderRadius: 16,
    alignItems: "center",
    paddingVertical: 16,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
  cancelButton: {
    marginTop: 15,
    alignItems: "center",
    paddingVertical: 12,
  },
  cancelButtonText: {
    color: "#94A3B8",
    fontSize: 15,
    fontWeight: "600",
  },
});

export default AddContact;
