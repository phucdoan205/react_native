import React, { useState } from "react";

// Hàm AppointmentLogic là một custom hook để quản lý lịch hẹn
const AppointmentLogic = () => {
  // Khai báo trạng thái cho danh sách lịch hẹn
  const [appointments, setAppointments] = useState([]);
  // Trạng thái cho ngày đã chọn
  const [date, setDate] = useState(new Date());
  // Trạng thái cho việc hiển thị trình chọn ngày
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  // Trạng thái cho lịch hẹn đang được chọn để chỉnh sửa
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  // Trạng thái cho nội dung lịch hẹn
  const [appointmentText, setAppointmentText] = useState("");

  // Hàm để thêm lịch hẹn mới
  const addAppointment = (selectedDate) => {
    setAppointments((prev) => [
      ...prev,
      { id: Date.now(), date: selectedDate, text: appointmentText },
    ]);
    setAppointmentText(""); // Đặt lại nội dung sau khi thêm
  };

  // Hàm để xử lý việc xác nhận chọn ngày
  const handleConfirm = (selectedDate) => {
    setDatePickerVisibility(false); // Ẩn trình chọn ngày
    if (selectedAppointment) {
      // Nếu có lịch hẹn đang được chỉnh sửa
      const updatedAppointments = appointments.map((appointment) =>
        appointment.id === selectedAppointment.id
          ? { ...appointment, date: selectedDate, text: appointmentText }
          : appointment
      );
      setAppointments(updatedAppointments); // Cập nhật danh sách lịch hẹn
      setSelectedAppointment(null); // Đặt lại lịch hẹn đang chọn
    } else {
      // Nếu không, thêm lịch hẹn mới
      addAppointment(selectedDate);
    }
    setDate(selectedDate); // Cập nhật ngày đã chọn
  };

  // Hàm để hiển thị trình chọn ngày
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  // Hàm để chỉnh sửa lịch hẹn
  const editAppointment = (appointment) => {
    setSelectedAppointment(appointment); // Lưu lịch hẹn đang chọn
    setDate(new Date(appointment.date)); // Cập nhật ngày cho trình chọn
    setAppointmentText(appointment.text); // Cập nhật nội dung cho input
    showDatePicker(); // Hiển thị trình chọn ngày
  };

  // Hàm để xóa lịch hẹn
  const deleteAppointment = (id) => {
    setAppointments((prev) =>
      prev.filter((appointment) => appointment.id !== id)
    );
  };

  // Trả về các trạng thái và hàm cần thiết để sử dụng trong các thành phần khác
  return {
    appointments,
    date,
    isDatePickerVisible: !!isDatePickerVisible, // Thêm !! để ép kiểu sang Boolean tuyệt đối
    handleConfirm,
    showDatePicker,
    appointmentText,
    setAppointmentText,
    editAppointment,
    deleteAppointment,
    setDatePickerVisibility,
  };
};

export { AppointmentLogic };
