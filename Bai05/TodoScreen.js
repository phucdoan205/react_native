import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

// Khởi tạo thành phần TodoScreen
const TodoScreen = () => {
  // Khai báo trạng thái cho danh sách công việc và công việc mới
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Sử dụng useEffect để khởi tạo danh sách công việc ban đầu
  useEffect(() => {
    const initialTodos = [
      { id: 1, text: 'Học lập trình React Native', completed: false },
      { id: 2, text: 'Làm ứng dụng Todo List', completed: false },
    ];
    setTodos(initialTodos);
  }, []);

  // Hàm để thêm công việc mới vào danh sách
  const addTodo = () => {
    if (newTodo.trim() !== '') {
      const newTodoItem = { id: Date.now(), text: newTodo, completed: false };
      setTodos([...todos, newTodoItem]); // Cập nhật danh sách công việc
      setNewTodo(''); // Đặt lại giá trị input
    }
  };

  // Hàm để đánh dấu công việc là hoàn thành hoặc chưa hoàn thành
  const toggleTodoComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos); // Cập nhật danh sách công việc
  };

  // Hàm để xóa công việc khỏi danh sách
  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos); // Cập nhật danh sách công việc
  };

  return (
    <View style={styles.container}>
      {/* Input để thêm công việc mới */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder="Nhập công việc mới"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>Thêm</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách công việc */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity onPress={() => toggleTodoComplete(item.id)}>
              <Text style={[styles.todoText, item.completed && styles.completedTodo]}>
                {item.text}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Text style={styles.deleteButton}>X</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

// Các kiểu dáng cho các thành phần
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  todoText: {
    fontSize: 16,
  },
  completedTodo: {
    textDecorationLine: 'line-through',
    color: '#ccc',
  },
  deleteButton: {
    color: '#ff0000',
    fontWeight: 'bold',
  },
});

export default TodoScreen;