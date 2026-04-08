// Nhập configureStore từ Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";
// Nhập reducer cho tasks từ TasksSlice
import tasksReducer from "./TasksSlice";

// Tạo store với configureStore
const store = configureStore({
  // Định nghĩa reducer cho store
  reducer: {
    tasks: tasksReducer, // Gán reducer tasks cho tên 'tasks'
  },
  // Thiết lập middleware
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // Chỉ cần sử dụng middleware mặc định
});

// Xuất store để sử dụng trong ứng dụng
export default store;
