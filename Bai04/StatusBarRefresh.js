import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  StatusBar,
} from "react-native";

const StatusBarRefresh = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [statusBarColor, setStatusBarColor] = useState("#6200EE");

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setStatusBarColor((prev) => (prev === "#6200EE" ? "#FF5722" : "#6200EE"));
    }, 2000);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: statusBarColor + "10" }]}
    >
      <StatusBar backgroundColor={statusBarColor} barStyle="light-content" />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            color={statusBarColor}
          />
        }
      >
        <View style={styles.centerBox}>
          <Text style={[styles.header, { color: statusBarColor }]}>
            Kéo để đổi màu
          </Text>
          <Text style={styles.paragraph}>
            Giao diện sẽ tự làm mới và thay đổi màu sắc hệ thống.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  }, // Căn giữa nội dung
  centerBox: {
    padding: 30,
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 20,
    margin: 20,
    elevation: 4,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  paragraph: { fontSize: 16, color: "#666", textAlign: "center" },
});

export default StatusBarRefresh;
