import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Checkbox, RadioButton } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CheckboxRadioImageScreen = () => {
  const [checked, setChecked] = useState(false);
  const [selectedValue, setSelectedValue] = useState("option1");

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.mainTitle}>Tùy chọn hiển thị</Text>

      {/* Section 1: Checkbox Card */}
      <View style={styles.card}>
        <View style={styles.row}>
          <MaterialCommunityIcons
            name="bell-outline"
            size={24}
            color="#6200ee"
          />
          <Text style={styles.label}>Nhận thông báo mỗi ngày</Text>
          <Checkbox
            status={checked ? "checked" : "unchecked"}
            onPress={() => setChecked(!checked)}
            color="#6200ee"
          />
        </View>
      </View>

      {/* Section 2: Radio Card */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Chọn giới tính</Text>
        <TouchableOpacity
          style={styles.row}
          onPress={() => setSelectedValue("option1")}
        >
          <RadioButton
            value="option1"
            status={selectedValue === "option1" ? "checked" : "unchecked"}
            color="#6200ee"
          />
          <Text style={styles.label}>Nam</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.row}
          onPress={() => setSelectedValue("option2")}
        >
          <RadioButton
            value="option2"
            status={selectedValue === "option2" ? "checked" : "unchecked"}
            color="#6200ee"
          />
          <Text style={styles.label}>Nữ</Text>
        </TouchableOpacity>
      </View>

      {/* Section 3: Image Frame */}
      <View style={[styles.card, { alignItems: "center" }]}>
        <Text style={[styles.cardTitle, { alignSelf: "flex-start" }]}>
          Ảnh đại diện
        </Text>
        <Image
          source={{
            uri: "https://cdn3.pixelcut.app/7/20/uncrop_hero_bdf08a8ca6.jpg",
          }}
          style={styles.image}
        />
        <TouchableOpacity style={styles.uploadBtn}>
          <Text style={styles.uploadText}>Thay đổi ảnh</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 16 },
  mainTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 16,
    marginBottom: 16,
    elevation: 4, // Đổ bóng cho Android
    shadowColor: "#000", // Đổ bóng cho iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#666",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
  },
  label: { flex: 1, marginLeft: 10, fontSize: 16 },
  image: { width: "100%", height: 200, borderRadius: 12, marginTop: 10 },
  uploadBtn: {
    marginTop: 15,
    backgroundColor: "#6200ee",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  uploadText: { color: "#fff", fontWeight: "600" },
});

export default CheckboxRadioImageScreen;
