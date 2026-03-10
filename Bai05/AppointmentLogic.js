// AppointmentScreen.js (phiên bản CSS nâng cấp đẹp lung linh, đồng bộ xanh dương)
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Animated,
  Platform,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const AppointmentScreen = () => {
  const [appointments, setAppointments] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [appointmentText, setAppointmentText] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [fadeAnim] = useState(new Animated.Value(0)); // animation khi thêm item

  const showDatePicker = () => setDatePickerVisibility(true);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    setSelectedAppointment(null);
    setAppointmentText("");
  };

  const handleConfirm = (date) => {
    if (!appointmentText.trim()) {
      hideDatePicker();
      return;
    }

    const dateString = date.toLocaleString("vi-VN", {
      weekday: "short",
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    if (selectedAppointment) {
      setAppointments(
        appointments.map((app) =>
          app.id === selectedAppointment.id
            ? { ...app, date: dateString, text: appointmentText.trim() }
            : app,
        ),
      );
    } else {
      const newApp = {
        id: Date.now(),
        text: appointmentText.trim(),
        date: dateString,
      };
      setAppointments([newApp, ...appointments]);

      // Animation fade + scale nhẹ khi thêm mới
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 400,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]).start(() => fadeAnim.setValue(0));
    }

    hideDatePicker();
  };

  const deleteAppointment = (id) => {
    setAppointments(appointments.filter((app) => app.id !== id));
  };

  const startEdit = (item) => {
    setSelectedAppointment(item);
    setAppointmentText(item.text);
    showDatePicker();
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <MaterialCommunityIcons
        name="calendar-blank-outline"
        size={90}
        color="#cbd5e1"
      />
      <Text style={styles.emptyText}>Chưa có lịch hẹn nào</Text>
      <Text style={styles.emptySubText}>
        Nhấn nút + để thêm lịch hẹn mới và quản lý thời gian hiệu quả hơn nhé!
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerGradient}>
        <Text style={styles.headerTitle}>Lịch Hẹn</Text>
        <Text style={styles.headerSubtitle}>Quản lý thời gian thông minh</Text>
      </View>

      <View style={styles.container}>
        {/* Input Area */}
        <View style={styles.inputCard}>
          <TextInput
            style={styles.input}
            placeholder="Bạn định làm gì hôm nay?"
            placeholderTextColor="#94a3b8"
            value={appointmentText}
            onChangeText={setAppointmentText}
            multiline={false}
          />
          <TouchableOpacity
            style={[
              styles.addButton,
              !appointmentText.trim() && styles.addButtonDisabled,
            ]}
            onPress={showDatePicker}
            disabled={!appointmentText.trim()}
            activeOpacity={0.85}
          >
            <MaterialCommunityIcons name="plus" size={32} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Danh sách */}
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Animated.View
              style={[
                styles.appointmentCard,
                {
                  opacity: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.75, 1],
                  }),
                  transform: [
                    {
                      scale: fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.95, 1],
                      }),
                    },
                  ],
                },
              ]}
            >
              <View style={styles.cardContent}>
                <View style={styles.timeContainer}>
                  <MaterialCommunityIcons
                    name="clock-time-four"
                    size={22}
                    color="#0ea5e9"
                  />
                  <Text style={styles.dateText}>{item.date}</Text>
                </View>
                <Text style={styles.appointmentText} numberOfLines={2}>
                  {item.text}
                </Text>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => startEdit(item)}
                >
                  <MaterialCommunityIcons
                    name="pencil"
                    size={24}
                    color="#0ea5e9"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.actionBtn}
                  onPress={() => deleteAppointment(item.id)}
                >
                  <MaterialCommunityIcons
                    name="delete"
                    size={24}
                    color="#f87171"
                  />
                </TouchableOpacity>
              </View>
            </Animated.View>
          )}
        />
      </View>

      {/* DateTime Picker */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={selectedAppointment ? new Date() : new Date()}
        locale="vi"
        confirmTextIOS="Xác nhận"
        cancelTextIOS="Hủy"
        textColorIOS="#0ea5e9"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  headerGradient: {
    backgroundColor: "#0ea5e9",
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    paddingBottom: 30,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    shadowColor: "#0ea5e9",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 12,
  },
  headerTitle: {
    fontSize: 36,
    fontWeight: "800",
    color: "#fff",
    letterSpacing: -0.8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255,255,255,0.9)",
    marginTop: 8,
    fontWeight: "500",
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  // Input Card (Glassmorphism)
  inputCard: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 24,
    padding: 8,
    alignItems: "center",
    marginBottom: 28,
    borderWidth: 1,
    borderColor: "rgba(226,232,240,0.8)",
    shadowColor: "#0ea5e9",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#1e293b",
    paddingVertical: 14,
    paddingHorizontal: 18,
    fontWeight: "500",
  },
  addButton: {
    backgroundColor: "#0ea5e9",
    width: 60,
    height: 60,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#0ea5e9",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  addButtonDisabled: {
    backgroundColor: "#cbd5e1",
    shadowOpacity: 0.1,
    elevation: 3,
  },

  // List
  listContent: {
    paddingBottom: 120,
  },

  // Appointment Card
  appointmentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    borderLeftWidth: 6,
    borderLeftColor: "#0ea5e9",
    shadowColor: "#64748b",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
  },
  cardContent: {
    flex: 1,
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0f2fe",
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
  },
  dateText: {
    fontSize: 14,
    color: "#0ea5e9",
    fontWeight: "700",
    marginLeft: 8,
  },
  appointmentText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#0f172a",
    lineHeight: 24,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionBtn: {
    padding: 12,
    marginLeft: 8,
    borderRadius: 14,
    backgroundColor: "#f1f5f9",
  },

  // Empty state
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 120,
  },
  emptyText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#475569",
    marginTop: 24,
  },
  emptySubText: {
    fontSize: 16,
    color: "#94a3b8",
    marginTop: 12,
    textAlign: "center",
    paddingHorizontal: 40,
  },
});

export default AppointmentScreen;
