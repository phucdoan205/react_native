import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Animated,
  Easing,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const TodoScreen = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [fadeAnims] = useState({}); // animation cho từng item
  const blinkAnim = useRef(new Animated.Value(1)).current; // animation nhấp nháy riêng cho số lượng task

  useEffect(() => {
    const initialTodos = [
      { id: 1, text: "Thiết kế UI chuyên sâu", completed: false },
      { id: 2, text: "Ăn tối cùng gia đình", completed: true },
    ];
    setTodos(initialTodos);

    initialTodos.forEach((todo) => {
      fadeAnims[todo.id] = new Animated.Value(1);
    });
  }, []);

  // Animation nhấp nháy cho số lượng task còn lại
  useEffect(() => {
    const pendingCount = todos.filter((t) => !t.completed).length;

    if (pendingCount > 0) {
      const loopAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(blinkAnim, {
            toValue: 1.15,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(blinkAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      );
      loopAnimation.start();

      return () => loopAnimation.stop(); // Cleanup khi component unmount hoặc pendingCount thay đổi
    } else {
      blinkAnim.setValue(1); // Reset về kích thước bình thường khi hết task
    }
  }, [todos]); // Chạy lại khi todos thay đổi

  const addTodo = () => {
    if (newTodo.trim() === "") return;

    const newTodoItem = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
    };

    fadeAnims[newTodoItem.id] = new Animated.Value(0);
    setTodos([newTodoItem, ...todos]);
    setNewTodo("");

    Animated.timing(fadeAnims[newTodoItem.id], {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  };

  const toggleTodoComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );

    // Animation scale nhẹ khi check/uncheck
    Animated.sequence([
      Animated.timing(fadeAnims[id], {
        toValue: 0.85,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnims[id], {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const deleteTodo = (id) => {
    Animated.timing(fadeAnims[id], {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      setTodos(todos.filter((todo) => todo.id !== id));
      delete fadeAnims[id];
    });
  };

  const pendingCount = todos.filter((t) => !t.completed).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        {/* Header trang trí gradient */}
        <View style={styles.headerGradient} />

        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Nhiệm vụ hôm nay</Text>
            <View style={styles.subtitleContainer}>
              <Text style={styles.headerSubtitle}>
                Còn{" "}
                <Animated.Text
                  style={[
                    styles.highlightCount,
                    {
                      transform: [{ scale: blinkAnim }],
                      opacity: pendingCount > 0 ? 1 : 0.6,
                    },
                  ]}
                >
                  {pendingCount}
                </Animated.Text>{" "}
                việc cần làm
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.profileBtn}>
            <MaterialCommunityIcons
              name="calendar-check"
              size={28}
              color="#0ea5e9"
            />
          </TouchableOpacity>
        </View>

        {/* Input Glassmorphism */}
        <View style={styles.inputContainer}>
          <View style={styles.inputGlass}>
            <TextInput
              style={styles.input}
              value={newTodo}
              onChangeText={setNewTodo}
              placeholder="Thêm nhiệm vụ mới..."
              placeholderTextColor="#a0aec0"
              returnKeyType="done"
              onSubmitEditing={addTodo}
            />
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={addTodo}
            activeOpacity={0.8}
          >
            <MaterialCommunityIcons name="plus" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Danh sách task */}
        <FlatList
          data={todos}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Animated.View
              style={[
                styles.todoCard,
                item.completed && styles.todoCardCompleted,
                {
                  opacity: fadeAnims[item.id] || 1,
                  transform: [
                    {
                      scale: fadeAnims[item.id]
                        ? fadeAnims[item.id].interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.92, 1],
                          })
                        : 1,
                    },
                  ],
                },
              ]}
            >
              <TouchableOpacity
                style={styles.todoInfo}
                onPress={() => toggleTodoComplete(item.id)}
                activeOpacity={0.7}
              >
                <Animated.View
                  style={[
                    styles.checkCircle,
                    item.completed && styles.checkCircleCompleted,
                  ]}
                >
                  <MaterialCommunityIcons
                    name={item.completed ? "check-bold" : "circle-outline"}
                    size={24}
                    color={item.completed ? "#fff" : "#0ea5e9"}
                  />
                </Animated.View>

                <View style={styles.textContainer}>
                  <Text
                    style={[
                      styles.todoText,
                      item.completed && styles.completedTodoText,
                    ]}
                    numberOfLines={2}
                  >
                    {item.text}
                  </Text>
                  {item.completed && (
                    <Text style={styles.doneTag}>ĐÃ HOÀN THÀNH</Text>
                  )}
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => deleteTodo(item.id)}
                style={styles.deleteBtn}
              >
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  size={24}
                  color="#f87171"
                />
              </TouchableOpacity>
            </Animated.View>
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <MaterialCommunityIcons
                name="playlist-check"
                size={80}
                color="#cbd5e1"
              />
              <Text style={styles.emptyText}>Chưa có nhiệm vụ nào</Text>
              <Text style={styles.emptySubText}>
                Thêm ngay để bắt đầu ngày mới hiệu quả!
              </Text>
            </View>
          }
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  headerGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 180,
    backgroundColor: "#0ea5e9",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    opacity: 0.12,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    marginBottom: 28,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: "#0f172a",
    letterSpacing: -0.8,
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#475569",
    fontWeight: "500",
    marginTop: 6,
  },
  highlightCount: {
    color: "#0ea5e9",
    fontWeight: "800",
    fontSize: 18,
  },
  profileBtn: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0ea5e9",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },

  // Input Glassmorphism
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 28,
  },
  inputGlass: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    overflow: "hidden",
    shadowColor: "#0ea5e9",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    backdropFilter: "blur(10px)", // chỉ web, nhưng không ảnh hưởng mobile
  },
  input: {
    height: 58,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#1e293b",
    fontWeight: "500",
  },
  addButton: {
    backgroundColor: "#0ea5e9",
    width: 58,
    height: 58,
    borderRadius: 20,
    marginLeft: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0ea5e9",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },

  // List
  listContainer: {
    paddingBottom: 100,
  },

  // Todo Card với animation
  todoCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 20,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "rgba(226,232,240,0.8)",
    shadowColor: "#64748b",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  todoCardCompleted: {
    backgroundColor: "rgba(240,253,244,0.7)",
    borderColor: "#86efac",
  },
  todoInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  checkCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 2.5,
    borderColor: "#0ea5e9",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  checkCircleCompleted: {
    backgroundColor: "#10b981",
    borderColor: "#10b981",
    transform: [{ scale: 1.1 }],
  },
  textContainer: {
    marginLeft: 16,
    flex: 1,
  },
  todoText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#1e293b",
    lineHeight: 24,
  },
  completedTodoText: {
    textDecorationLine: "line-through",
    color: "#94a3b8",
    fontWeight: "500",
  },
  doneTag: {
    fontSize: 11,
    color: "#10b981",
    fontWeight: "700",
    marginTop: 4,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  deleteBtn: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "rgba(248,113,113,0.08)",
  },

  // Empty state
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 120,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#64748b",
    marginTop: 20,
  },
  emptySubText: {
    fontSize: 15,
    color: "#94a3b8",
    marginTop: 8,
    textAlign: "center",
  },
});

export default TodoScreen;
