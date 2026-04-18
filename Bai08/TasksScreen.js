import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "./TasksSlice";

const TasksScreen = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <View style={styles.errorCard}>
          <Text style={styles.errorText}>⚠️ Có lỗi xảy ra: {error}</Text>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.headerContainer}>
        <Text style={styles.headerSubtitle}>Chào buổi sáng,</Text>
        <Text style={styles.headerTitle}>Danh sách công việc</Text>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              item.completed ? styles.cardCompleted : styles.cardPending,
            ]}
          >
            <View style={styles.iconWrapper}>
              <Text style={styles.statusIcon}>
                {item.completed ? "✓" : "⚡"}
              </Text>
            </View>
            <View style={styles.taskContent}>
              <Text
                style={[
                  styles.taskTitle,
                  item.completed && styles.taskTitleCompleted,
                ]}
              >
                {item.title}
              </Text>
              <Text style={styles.statusText}>
                {item.completed ? "Đã hoàn thành" : "Đang thực hiện"}
              </Text>
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
    backgroundColor: "#F8FAFC", // Màu nền xám nhạt hiện đại
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  headerContainer: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#64748B",
    fontWeight: "500",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1E293B",
    letterSpacing: -0.5,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    marginVertical: 10,
    alignItems: "center",
    // Shadow cho iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    // Shadow cho Android
    elevation: 4,
  },
  cardPending: {
    borderLeftWidth: 6,
    borderLeftColor: "#6366f1", // Màu tím Indigo
  },
  cardCompleted: {
    borderLeftWidth: 6,
    borderLeftColor: "#10B981", // Màu xanh Emerald
    opacity: 0.8,
  },
  iconWrapper: {
    width: 45,
    height: 45,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  statusIcon: {
    fontSize: 20,
    fontWeight: "bold",
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 17,
    fontWeight: "600",
    color: "#334155",
    lineHeight: 22,
  },
  taskTitleCompleted: {
    textDecorationLine: "line-through",
    color: "#94A3B8",
  },
  statusText: {
    fontSize: 12,
    color: "#94A3B8",
    marginTop: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  loadingText: {
    marginTop: 15,
    fontSize: 15,
    color: "#6366f1",
    fontWeight: "600",
  },
  errorCard: {
    backgroundColor: "#FEF2F2",
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  errorText: {
    color: "#DC2626",
    fontWeight: "500",
  },
});

export default TasksScreen;
