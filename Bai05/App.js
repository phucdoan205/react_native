import 'react-native-gesture-handler'; // 🔴 BẮT BUỘC – DÒNG ĐẦU TIÊN
import React from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TextInput,
} from "react-native";
import TodoScreen from "./TodoScreen";
import { AppointmentLogic } from "./AppointmentLogic";
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Tab = createBottomTabNavigator();

const AppointmentScreen = () => {
  const {
    appointments,
    date,
    isDatePickerVisible,
    handleConfirm,
    showDatePicker,
    appointmentText,
    setAppointmentText,
    editAppointment,
    deleteAppointment,
    setDatePickerVisibility,
  } = AppointmentLogic();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lịch Hẹn</Text>

      <TextInput
        style={styles.input}
        value={appointmentText}
        onChangeText={setAppointmentText}
        placeholder="Nhập nội dung lịch hẹn"
      />

      <Button title="Chọn Ngày / Giờ" onPress={showDatePicker} />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        date={date}
        onConfirm={handleConfirm}
        onCancel={() => setDatePickerVisibility(false)}
      />

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.appointmentItem}>
            <Text>{item.date.toLocaleString()} - {item.text}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Sửa" onPress={() => editAppointment(item)} />
              <Button title="Xóa" onPress={() => deleteAppointment(item.id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="Todo" component={TodoScreen} />
          <Tab.Screen name="Lịch Hẹn" component={AppointmentScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  appointmentItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
});
