import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  Modal,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import { Calendar } from "react-native-calendars";
import Icon from "react-native-vector-icons/Ionicons";

// Hàm giả lập để lấy tử vi cho một ngày
const gethoroscope = (date) => {
  const horoscopes = {
    "2025-02-01":
      "Ngày tốt để bắt đầu một dự án mới, sự nghiệp có thể thăng tiến.",
    "2025-02-02":
      "Ngày này có thể mang lại tin vui về tình cảm, hãy mở lòng hơn.",
    "2025-02-03": "Cẩn thận với các quyết định tài chính, không nên vội vàng.",
    // ... (Các ngày khác tương tự như trong ảnh)
    "2025-03-31":
      "Ngày cuối cùng của tháng, hãy chuẩn bị cho những điều mới mẻ sắp tới.",
  };
  return horoscopes[date] || "Chưa có thông tin tử vi.";
};

function HomeScreen() {
  // Các trạng thái của ứng dụng
  const [markedDates, setMarkedDates] = useState({}); // Ngày đã đánh dấu
  const [selectedDay, setSelectedDay] = useState(""); // Ngày đang chọn
  const [horoscope, setHoroscope] = useState(""); // Thông điệp tử vi cho ngày được chọn
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái hiển thị modal
  const [eventDescription, setEventDescription] = useState(""); // Mô tả sự kiện
  const [events, setEvents] = useState({}); // Danh sách các sự kiện theo ngày
  const [editingIndex, setEditingIndex] = useState(null); // Chỉ số của sự kiện đang chỉnh sửa

  // Hàm xử lý khi người dùng nhấn vào một ngày
  const onDayPress = (day) => {
    const selectedDay = day.dateString; // Lấy ngày đã chọn
    setSelectedDay(selectedDay); // Cập nhật ngày được chọn
    setHoroscope(gethoroscope(selectedDay)); // Lấy thông điệp tử vi cho ngày đó

    setMarkedDates({
      [selectedDay]: {
        selected: true,
        marked: true,
        selectedColor: "#6200EE", // Màu sắc cho ngày được chọn
      },
    });

    setEventDescription(""); // Reset mô tả sự kiện
    setEditingIndex(null); // Đặt lại chỉ số chỉnh sửa
    setModalVisible(true); // Hiển thị modal
  };

  // Hàm thêm sự kiện
  const addEvent = () => {
    if (!eventDescription.trim()) {
      // Kiểm tra xem mô tả có rỗng không
      Alert.alert("Error", "Vui lòng nhập mô tả sự kiện!");
      return;
    }

    const newEvent = { description: eventDescription }; // Tạo sự kiện mới

    setEvents((prevEvents) => {
      const updatedEvents = { ...prevEvents }; // Sao chép sự kiện hiện tại
      if (!updatedEvents[selectedDay]) {
        updatedEvents[selectedDay] = []; // Nếu chưa có sự kiện cho ngày này, khởi tạo mảng
      }

      if (editingIndex !== null) {
        updatedEvents[selectedDay][editingIndex] = newEvent; // Cập nhật sự kiện nếu đang chỉnh sửa
      } else {
        updatedEvents[selectedDay].push(newEvent); // Thêm sự kiện mới vào mảng
      }
      return updatedEvents;
    });

    Alert.alert("Thành công", "Sự kiện đã được thêm thành công!");
    setEventDescription("");
    setEditingIndex(null);
    setModalVisible(false);
  };

  // Hàm chỉnh sửa sự kiện
  const editEvent = (index) => {
    setEventDescription(events[selectedDay][index].description);
    setEditingIndex(index);
    setModalVisible(true);
  };

  // Hàm xóa sự kiện
  const deleteEvent = (index) => {
    Alert.alert("Xóa", "Bạn có chắc chắn muốn xóa sự kiện này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        onPress: () => {
          setEvents((prevEvents) => {
            const updatedEvents = { ...prevEvents };
            updatedEvents[selectedDay].splice(index, 1);
            return updatedEvents;
          });
        },
      },
    ]);
  };

  const renderEventItem = ({ item, index }) => (
    <View style={styles.eventContainer}>
      <Text style={styles.eventText}>{item.description}</Text>
      <View style={styles.eventActions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => editEvent(index)}
        >
          <Icon name="pencil" size={16} color="#fff" />
          <Text style={styles.buttonText}>Sửa</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteEvent(index)}
        >
          <Icon name="trash" size={16} color="#fff" />
          <Text style={styles.buttonText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: "#FFEBEE" }]}>
      <Calendar
        onDayPress={onDayPress}
        markedDates={markedDates}
        style={styles.calendar}
        theme={{
          selectedDayBackgroundColor: "#6200EE",
          arrowColor: "#6200EE",
          todayTextColor: "#6200EE",
        }}
      />

      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <Text style={styles.selectedDateText}>
            Ngày đã chọn: {selectedDay}
          </Text>
          <Text style={styles.horoscopeText}>Tử vi: {horoscope}</Text>

          <TextInput
            style={styles.input}
            placeholder="Nhập mô tả sự kiện..."
            value={eventDescription}
            onChangeText={setEventDescription}
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity style={styles.addButton} onPress={addEvent}>
            <Text style={styles.addButtonText}>
              {editingIndex !== null ? "Cập nhật Sự Kiện" : "Thêm Sự Kiện"}
            </Text>
          </TouchableOpacity>

          <FlatList
            data={events[selectedDay] || []}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderEventItem}
            style={styles.eventList}
          />

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  calendar: {
    marginBottom: 20,
    height: 350,
    borderRadius: 10,
    overflow: "hidden",
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  horoscopeText: {
    fontSize: 16,
    color: "#FF5722",
    marginBottom: 10,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  input: {
    height: 80,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  eventContainer: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: "#6200EE",
    borderRadius: 10,
  },
  eventText: { fontSize: 16, color: "#fff" },
  eventActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  editButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2070FF",
    padding: 5,
    borderRadius: 5,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D32F2F",
    padding: 5,
    borderRadius: 5,
  },
  buttonText: { color: "#fff", marginLeft: 5 },
  eventList: { marginTop: 10 },
  addButton: {
    backgroundColor: "#6200EE",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  addButtonText: { color: "#fff", fontWeight: "bold" },
  closeButton: {
    backgroundColor: "#FF5722",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: "center",
  },
  closeButtonText: { color: "#fff", fontWeight: "bold" },
});

export default HomeScreen;
