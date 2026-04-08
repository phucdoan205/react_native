// Nhập các thư viện cần thiết
import React, { useEffect } from "react"; // Nhập React và hook useEffect
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native"; // Nhập các thành phần từ React Native
import { useDispatch, useSelector } from "react-redux"; // Nhập các hook từ react-redux
import { fetchTasks } from "./TasksSlice"; // Nhập action fetchTasks từ TasksSlice

// Định nghĩa thành phần TasksScreen
const TasksScreen = () => {
  const dispatch = useDispatch(); // Khởi tạo dispatch để gửi actions
  // Lấy tasks, loading và error từ Redux store
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  // Sử dụng useEffect để gọi fetchTasks khi component được mount
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Nếu đang tải dữ liệu, hiển thị ActivityIndicator
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#4caf50" />{" "}
        {/* Vòng chỉ thị tải */}
        <Text style={styles.loadingText}>Loading tasks...</Text>{" "}
        {/* Văn bản thông báo */}
      </View>
    );
  }

  // Nếu có lỗi, hiển thị thông báo lỗi
  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error}</Text> {/* Văn bản lỗi */}
      </View>
    );
  }

  // Nếu không có lỗi và không đang tải, hiển thị danh sách công việc
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task List</Text>{" "}
      {/* Tiêu đề danh sách công việc */}
      <FlatList
        data={tasks} // Dữ liệu để hiển thị
        keyExtractor={(item) => item.id.toString()} // Chìa khóa cho mỗi item
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.taskTitle}>
              {item.completed ? "✅ " : "⏳ "} {item.title}{" "}
              {/* Hiển thị biểu tượng và tiêu đề công việc */}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.listContainer} // Căn chỉnh nội dung của danh sách
      />
    </View>
  );
};

// Định nghĩa các kiểu dáng cho thành phần
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // Màu nền cho container
    padding: 16, // Padding cho container
  },
  center: {
    flex: 1,
    justifyContent: "center", // Căn giữa nội dung
    alignItems: "center", // Căn giữa nội dung theo chiều ngang
    backgroundColor: "#f5f5f5", // Màu nền cho view trung tâm
  },
  header: {
    fontSize: 24, // Kích thước chữ cho tiêu đề
    fontWeight: "bold", // Đậm chữ
    marginBottom: 16, // Khoảng cách dưới tiêu đề
    textAlign: "center", // Căn giữa chữ
    color: "#4caf50", // Màu chữ
  },
  loadingText: {
    marginTop: 8, // Khoảng cách trên văn bản thông báo
    fontSize: 16, // Kích thước chữ cho văn bản thông báo
    color: "#757575", // Màu chữ cho văn bản thông báo
  },
  errorText: {
    fontSize: 18, // Kích thước chữ cho thông báo lỗi
    color: "red", // Màu chữ cho thông báo lỗi
  },
  listContainer: {
    paddingBottom: 16, // Padding dưới danh sách
  },
  card: {
    backgroundColor: "#ffffff", // Màu nền cho thẻ công việc
    borderRadius: 8, // Bo tròn góc
    padding: 16, // Padding cho thẻ
    marginVertical: 8, // Khoảng cách dọc giữa các thẻ
    shadowColor: "#000", // Màu bóng
    shadowOffset: { width: 0, height: 2 }, // Độ lệch bóng
    shadowOpacity: 0.1, // Độ mờ của bóng
    shadowRadius: 4, // Bán kính bóng
    elevation: 2, // Độ cao của bóng trên Android
  },
  taskTitle: {
    fontSize: 16, // Kích thước chữ cho tiêu đề công việc
    color: "#333", // Màu chữ cho tiêu đề công việc
  },
});

// Xuất thành phần TasksScreen để sử dụng trong ứng dụng
export default TasksScreen;
