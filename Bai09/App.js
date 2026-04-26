import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { HomeScreen } from "./Animation";
import { View, Text, StyleSheet, Dimensions, Platform } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient"; // Đảm bảo đã cài expo-linear-gradient
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const Stack = createNativeStackNavigator();

// Màn hình Screen2 - Nơi hiển thị kết quả với phong cách lung linh
const Screen2 = ({ route }) => {
  const { param1, param2 } = route.params;

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container2}>
      {/* Vòng tròn trang trí nền tạo độ lung linh */}
      <View style={styles.circleDecoration} />

      <View style={styles.glassCard}>
        <MaterialIcons
          name="verified"
          size={60}
          color="#00E676"
          style={styles.iconHeader}
        />

        <Text style={styles.title}>Dữ Liệu Đã Nhận</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Tham số 1:</Text>
          <Text style={styles.value}>{param1}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Tham số 2:</Text>
          <Text style={styles.value}>{param2}</Text>
        </View>

        <Text style={styles.motivationText}>
          "Mọi chuyển động lớn đều bắt đầu từ những bước nhỏ nhất." ✨
        </Text>
      </View>
    </LinearGradient>
  );
};

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            // Đồng bộ màu Header với màu Gradient nền
            headerStyle: {
              backgroundColor: "#667eea",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "800",
              fontSize: 18,
            },
            headerTitleAlign: "center",
            headerShadowVisible: false, // Xóa đường kẻ header
          }}
        >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: "ANIMATION LAB" }}
          />
          <Stack.Screen
            name="Screen2"
            component={Screen2}
            options={{ title: "KẾT QUẢ ROUTE" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  // Hiệu ứng vòng tròn mờ ảo phía sau
  circleDecoration: {
    position: "absolute",
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    top: -50,
    right: -50,
  },
  glassCard: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 30,
    padding: 30,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    // Đổ bóng hiện đại
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    ...Platform.select({
      web: { backdropFilter: "blur(15px)" },
    }),
  },
  iconHeader: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: "#fff",
    marginBottom: 25,
    letterSpacing: 1,
  },
  infoRow: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.1)",
    padding: 15,
    borderRadius: 15,
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  label: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 14,
    fontWeight: "600",
  },
  value: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  motivationText: {
    marginTop: 20,
    color: "rgba(255,255,255,0.6)",
    fontSize: 13,
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 20,
  },
});
