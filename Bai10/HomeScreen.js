import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  Modal,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import { Calendar } from "react-native-calendars";
// Sử dụng Lucide để icon hiển thị mượt mà trên mọi nền tảng
import {
  Calendar as CalendarIcon,
  Plus,
  X,
  Trash2,
  Edit3,
  Sparkles,
} from "lucide-react-native";

const { width } = Dimensions.get("window");

const gethoroscope = (date) => {
  const horoscopes = {
    "2026-05-01":
      "🌟 Hào quang rực rỡ! Hôm nay là ngày bạn khẳng định vị thế bản thân.",
    "2026-02-02":
      "💖 Vũ trụ đang gửi tín hiệu tình yêu đến bạn. Hãy cười thật nhiều nhé!",
    "2026-02-03":
      "💰 Tài lộc nở rộ, một khoản thưởng bất ngờ đang chờ đợi bạn.",
  };
  return (
    horoscopes[date] ||
    "🌈 Mỗi bước đi đều dẫn đến thành công. Cố gắng lên bạn nhé!"
  );
};

function HomeScreen() {
  const [markedDates, setMarkedDates] = useState({});
  const [selectedDay, setSelectedDay] = useState("");
  const [horoscope, setHoroscope] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [eventDescription, setEventDescription] = useState("");
  const [events, setEvents] = useState({});
  const [editingIndex, setEditingIndex] = useState(null);

  const onDayPress = (day) => {
    const dateStr = day.dateString;
    setSelectedDay(dateStr);
    setHoroscope(gethoroscope(dateStr));
    setMarkedDates({
      [dateStr]: {
        selected: true,
        selectedColor: "#6C63FF",
        selectedTextColor: "#fff",
      },
    });
    setEventDescription("");
    setEditingIndex(null);
    setModalVisible(true);
  };

  const addEvent = () => {
    if (!eventDescription.trim())
      return Alert.alert("Oops!", "Nhập nội dung đã nè ✨");

    setEvents((prev) => {
      const updated = { ...prev };
      if (!updated[selectedDay]) updated[selectedDay] = [];
      if (editingIndex !== null)
        updated[selectedDay][editingIndex] = { description: eventDescription };
      else updated[selectedDay].push({ description: eventDescription });
      return updated;
    });
    setModalVisible(false);
  };

  const renderEventItem = ({ item, index }) => (
    <View style={styles.eventCard}>
      <Text style={styles.eventText}>{item.description}</Text>
      <View style={styles.eventActions}>
        <TouchableOpacity
          onPress={() => {
            setEventDescription(item.description);
            setEditingIndex(index);
          }}
          style={styles.iconBtn}
        >
          <Edit3 size={18} color="#6C63FF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {}} style={styles.iconBtn}>
          <Trash2 size={18} color="#FF5E5E" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Background Decor Elements - Tạo hiệu ứng lung linh */}
      <View
        style={[
          styles.blurBall,
          { top: -50, right: -50, backgroundColor: "#FFD6FF" },
        ]}
      />
      <View
        style={[
          styles.blurBall,
          { bottom: 100, left: -80, backgroundColor: "#E7E9FF" },
        ]}
      />

      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Mood Calendar</Text>
            <Text style={styles.headerSubtitle}>Tưới mát tâm hồn mỗi ngày</Text>
          </View>
          <Sparkles color="#6C63FF" size={28} />
        </View>

        <View style={styles.calendarWrapper}>
          <Calendar
            onDayPress={onDayPress}
            markedDates={markedDates}
            theme={{
              calendarBackground: "transparent",
              textSectionTitleColor: "#8E94A5",
              selectedDayBackgroundColor: "#6C63FF",
              todayTextColor: "#6C63FF",
              dayTextColor: "#2D3436",
              monthTextColor: "#2D3436",
              textDayFontWeight: "500",
              textMonthFontWeight: "bold",
              arrowColor: "#6C63FF",
            }}
          />
        </View>
      </View>

      <Modal animationType="fade" transparent visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalContent}
          >
            <View style={styles.modalHandle} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalDate}>{selectedDay}</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={24} color="#ABB3C5" />
              </TouchableOpacity>
            </View>

            <View style={styles.glassCard}>
              <Text style={styles.glassTitle}>✨ Thông điệp vũ trụ</Text>
              <Text style={styles.glassText}>{horoscope}</Text>
            </View>

            <TextInput
              style={styles.input}
              placeholder="Ghi chú điều tuyệt vời..."
              value={eventDescription}
              onChangeText={setEventDescription}
              multiline
            />

            <TouchableOpacity style={styles.mainBtn} onPress={addEvent}>
              <Text style={styles.mainBtnText}>Lưu kỉ niệm</Text>
              <Plus size={20} color="#fff" />
            </TouchableOpacity>

            <FlatList
              data={events[selectedDay] || []}
              renderItem={renderEventItem}
              keyExtractor={(_, i) => i.toString()}
              style={{ marginTop: 20 }}
            />
          </KeyboardAvoidingView>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  // Tạo hiệu ứng đốm mờ phía sau
  blurBall: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    opacity: 0.6,
    // Note: Trên web/mobile, filter blur cần thư viện nếu muốn xịn,
    // ở đây dùng màu nhẹ để giả lập chiều sâu
  },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 60 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: "#1A1A1A",
    letterSpacing: -0.5,
  },
  headerSubtitle: { fontSize: 15, color: "#7F8C8D", marginTop: 4 },
  calendarWrapper: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 30,
    padding: 10,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 20 },
      android: { elevation: 10 },
      web: { boxShadow: "0px 10px 30px rgba(0,0,0,0.05)" },
    }),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    height: "80%",
  },
  modalHandle: {
    width: 40,
    height: 5,
    backgroundColor: "#E0E0E0",
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  modalDate: { fontSize: 24, fontWeight: "bold", color: "#2D3436" },
  glassCard: {
    backgroundColor: "#F8F7FF",
    borderRadius: 20,
    padding: 20,
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#EEECFF",
  },
  glassTitle: { fontWeight: "bold", color: "#6C63FF", marginBottom: 8 },
  glassText: { color: "#4B4B4B", lineHeight: 22 },
  input: {
    backgroundColor: "#F5F6FA",
    borderRadius: 18,
    padding: 18,
    fontSize: 16,
    height: 80,
    textAlignVertical: "top",
  },
  mainBtn: {
    backgroundColor: "#6C63FF",
    flexDirection: "row",
    height: 60,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    gap: 10,
  },
  mainBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  eventCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 15,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F0F0F0",
  },
  eventText: { flex: 1, color: "#2D3436", fontSize: 15 },
  eventActions: { flexDirection: "row", gap: 10 },
  iconBtn: { padding: 5 },
});

export default HomeScreen;
