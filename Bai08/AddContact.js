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
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

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
      Alert.alert("Opps!", "Hãy cho mình biết tên và số điện thoại nhé! ✨");
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
      navigation.goBack();
    } catch (error) {
      Alert.alert("Lỗi", "Không thể lưu liên hệ.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Decor Elements - Tạo sự lung linh đồng bộ */}
      <View style={styles.decorCircleTop} />
      <View style={styles.decorCircleBottom} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <View style={styles.avatarGlow}>
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarIcon}>{isEditing ? "✨" : "🌟"}</Text>
              </View>
            </View>
            <Text style={styles.title}>
              {isEditing ? "Cập nhật" : "Tạo mới"}
            </Text>
            <Text style={styles.subtitle}>
              Mỗi liên hệ là một hạt mầm cho mối quan hệ tuyệt vời! 🚀
            </Text>
          </View>

          <View style={styles.formCard}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>TÊN GỢI NHỚ</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>👤</Text>
                <TextInput
                  placeholder="Hôm nay bạn kết nối với ai?"
                  value={name}
                  onChangeText={setName}
                  style={styles.input}
                  placeholderTextColor="#CBD5E1"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>SỐ ĐIỆN THOẠI</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIcon}>📞</Text>
                <TextInput
                  placeholder="Ghi lại con số may mắn này..."
                  value={phoneNumber}
                  onChangeText={setPhoneNumber}
                  keyboardType="phone-pad"
                  style={styles.input}
                  placeholderTextColor="#CBD5E1"
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={saveContact}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>
                {isEditing ? "CẬP NHẬT NGAY ✨" : "LƯU VÀO KÝ ỨC 🚀"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.cancelButtonText}>Để sau nhé</Text>
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
    backgroundColor: "#F8FAFF", // Trắng xanh nhẹ nhàng
  },
  // Decor circles
  decorCircleTop: {
    position: "absolute",
    top: -60,
    left: -30,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#E0E7FF",
    opacity: 0.5,
  },
  decorCircleBottom: {
    position: "absolute",
    bottom: -20,
    right: -20,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFEDD5",
    opacity: 0.6,
  },
  scrollContent: {
    padding: 24,
    paddingTop: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 35,
  },
  avatarGlow: {
    padding: 10,
    borderRadius: 60,
    backgroundColor: "#FFFFFF",
    // Hiệu ứng đổ bóng phát sáng
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10,
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#F5F3FF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#A5B4FC",
    borderStyle: "dashed",
  },
  avatarIcon: {
    fontSize: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#1E1B4B",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#64748B",
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 30,
    lineHeight: 22,
    fontWeight: "500",
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 35,
    padding: 24,
    // Hiệu ứng kính nhẹ
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.8)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 12,
    fontWeight: "800",
    color: "#818CF8",
    marginBottom: 10,
    marginLeft: 4,
    letterSpacing: 1.5,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderRadius: 20,
    paddingHorizontal: 16,
    borderWidth: 1.5,
    borderColor: "#F1F5F9",
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#6366f1",
    borderRadius: 22,
    alignItems: "center",
    paddingVertical: 18,
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 15,
    elevation: 8,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 1,
  },
  cancelButton: {
    marginTop: 18,
    alignItems: "center",
    paddingVertical: 10,
  },
  cancelButtonText: {
    color: "#94A3B8",
    fontSize: 15,
    fontWeight: "700",
  },
});

export default AddContact;
