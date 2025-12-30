import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const StyleSheetSpinner = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="monetization-on" size={32} color="#FFF" />
        <Text style={styles.headerTitle}>Thông tin bán hàng</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.salesCard}>
          <Text style={styles.cardLabel}>Doanh thu hôm nay</Text>
          <Text style={styles.cardValue}>2.500.000đ</Text>
          <View style={styles.badge}>
            <MaterialIcons name="trending-up" size={16} color="#4CAF50" />
            <Text style={styles.badgeText}>+12% so với hôm qua</Text>
          </View>
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200EE" />
          <Text style={styles.loadingText}>Đang đồng bộ dữ liệu...</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#6200EE" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 25,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginLeft: 10,
  },
  content: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  salesCard: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 25,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginTop: -50,
  },
  cardLabel: { fontSize: 16, color: "#666" },
  cardValue: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1A1C1E",
    marginVertical: 8,
  },
  badge: { flexDirection: "row", alignItems: "center" },
  badgeText: { color: "#4CAF50", fontWeight: "600", marginLeft: 4 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 15, color: "#666", fontSize: 16 },
});

export default StyleSheetSpinner;
