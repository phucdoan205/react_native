import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "./TasksSlice";

const { width } = Dimensions.get("window");

const TasksScreen = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#FF6B6B" />
        <Text style={styles.loadingText}>Đang chuẩn bị năng lượng...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>
            🌟 Đừng lo, chỉ là chút sự cố nhỏ thôi!
          </Text>
          <Text style={{ color: "#ef4444", marginTop: 5 }}>{error}</Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background Decor - Tạo hiệu ứng lung linh */}
      <View style={styles.blob1} />
      <View style={styles.blob2} />

      <View style={styles.headerContainer}>
        <Text style={styles.headerSubtitle}>Sẵn sàng bứt phá,</Text>
        <Text style={styles.headerTitle}>Mục tiêu hôm nay 🚀</Text>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <View
              style={[
                styles.card,
                item.completed ? styles.cardCompleted : styles.cardPending,
              ]}
            >
              <View
                style={[
                  styles.iconWrapper,
                  { backgroundColor: item.completed ? "#D1FAE5" : "#FFE4E6" },
                ]}
              >
                <Text style={styles.statusIcon}>
                  {item.completed ? "🌸" : "🔥"}
                </Text>
              </View>

              <View style={styles.taskContent}>
                <Text
                  numberOfLines={1}
                  style={[
                    styles.taskTitle,
                    item.completed && styles.taskTitleCompleted,
                  ]}
                >
                  {item.title}
                </Text>
                <View style={styles.badgeContainer}>
                  <Text
                    style={[
                      styles.statusBadge,
                      { color: item.completed ? "#059669" : "#E11D48" },
                    ]}
                  >
                    {item.completed ? "Hoàn thành xuất sắc" : "Cố gắng lên nào"}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F0F4FF", // Màu nền xanh rất nhạt
  },
  // Hiệu ứng các đốm màu lung linh phía sau
  blob1: {
    position: "absolute",
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#FFD1D1",
    opacity: 0.5,
  },
  blob2: {
    position: "absolute",
    bottom: 100,
    left: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#D1E9FF",
    opacity: 0.6,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    paddingHorizontal: 28,
    paddingTop: 30,
    paddingBottom: 15,
  },
  headerSubtitle: {
    fontSize: 18,
    color: "#6366f1",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "900",
    color: "#1E1B4B",
    marginTop: 4,
    textShadowColor: "rgba(99, 102, 241, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 10,
  },
  cardWrapper: {
    // Tạo đổ bóng mềm mại hơn
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Hiệu ứng kính
    borderRadius: 24,
    padding: 20,
    marginVertical: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  cardPending: {
    borderLeftWidth: 8,
    borderLeftColor: "#FF6B6B", // Màu hồng đỏ rực rỡ
  },
  cardCompleted: {
    borderLeftWidth: 8,
    borderLeftColor: "#4ADE80", // Màu xanh lá tươi sáng
    opacity: 0.9,
  },
  iconWrapper: {
    width: 55,
    height: 55,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  statusIcon: {
    fontSize: 24,
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 6,
  },
  taskTitleCompleted: {
    textDecorationLine: "line-through",
    color: "#94A3B8",
    fontWeight: "400",
  },
  badgeContainer: {
    flexDirection: "row",
  },
  statusBadge: {
    fontSize: 11,
    fontWeight: "800",
    textTransform: "uppercase",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: "hidden",
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#FF6B6B",
    fontWeight: "700",
    fontStyle: "italic",
  },
  errorCard: {
    backgroundColor: "#FFF1F2",
    padding: 25,
    borderRadius: 20,
    alignItems: "center",
    marginHorizontal: 30,
  },
  errorText: {
    color: "#E11D48",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
});

export default TasksScreen;
