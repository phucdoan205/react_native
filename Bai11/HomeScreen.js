import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@react-native-vector-icons";

// Danh sách các bài hát
const songs = [
  {
    id: "1",
    title: "Giọt Lệ Tình",
    artist: "Trí Hải",
    artwork: require("./assets/vuidet.jpg"),
    url: require("./assets/vuidet.mp3"),
  },
  {
    id: "2",
    title: "Phải Đau Cuộc Đời",
    artist: "Chu Bin",
    artwork: require("./assets/kyuchoahong.jpg"),
    url: require("./assets/kyuchoahong.mp3"),
  },
  {
    id: "3",
    title: "Hãy Xem Là Giấc Mơ",
    artist: "Quang Vinh",
    artwork: require("./assets/kyuchoahong.jpg"),
    url: require("./assets/kyuchoahong.mp3"),
  },
  {
    id: "4",
    title: "Người Ra Đi Vì Vô Duyên",
    artist: "Phạm Khánh Hưng",
    artwork: require("./assets/kyuchoahong.jpg"),
    url: require("./assets/kyuchoahong.mp3"),
  },
  {
    id: "5",
    title: "Mãi Linh Cát Trắng",
    artist: "Quang Vinh",
    artwork: require("./assets/kyuchoahong.jpg"),
    url: require("./assets/kyuchoahong.mp3"),
  },
  {
    id: "6",
    title: "Tình Yêu Mang Theo",
    artist: "Quang Vinh",
    artwork: require("./assets/kyuchoahong.jpg"),
    url: require("./assets/kyuchoahong.mp3"),
  },
];

const HomeScreen = ({ navigation }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0); // Trạng thái chỉ số bài hát hiện tại

  // Hàm phát bài hát
  const playSong = (index) => {
    setCurrentSongIndex(index); // Cập nhật chỉ số bài hát hiện tại
    navigation.navigate("Player", { song: songs[index], index }); // Điều hướng đến màn hình Player
  };

  // Hàm render từng item trong danh sách bài hát
  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => playSong(index)}>
        {/* Hiển thị hình ảnh bìa bài hát */}
        <Image source={item.artwork} style={styles.artwork} />
        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>{" "}
          {/* Hiển thị tiêu đề bài hát */}
          <Text style={styles.artist}>{item.artist}</Text>{" "}
          {/* Hiển thị tên nghệ sĩ */}
        </View>
        <Ionicons
          name="play-circle-outline"
          size={30}
          color="black"
          onPress={() => playSong(index)}
        />{" "}
        {/* Nút play cho từng bài hát */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách phát</Text>{" "}
      {/* Tiêu đề danh sách phát */}
      <FlatList
        data={songs} // Dữ liệu danh sách bài hát
        keyExtractor={(item) => item.id} // Xác định khóa duy nhất cho từng item
        renderItem={renderItem} // Hàm render item
      />
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={() =>
            playSong(
              currentSongIndex - 1 >= 0
                ? currentSongIndex - 1
                : songs.length - 1,
            )
          }
        >
          <Ionicons name="play-skip-back-outline" size={30} color="black" />{" "}
          {/* Nút quay lại bài hát trước */}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.playButton}
          onPress={() => playSong(currentSongIndex)}
        >
          <Ionicons name="play-circle-outline" size={50} color="white" />{" "}
          {/* Nút phát bài hát hiện tại */}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => playSong((currentSongIndex + 1) % songs.length)}
        >
          <Ionicons name="play-skip-forward-outline" size={30} color="black" />{" "}
          {/* Nút chuyển tiếp bài hát tiếp theo */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5", // Màu nền của màn hình
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20, // Khoảng cách dưới tiêu đề
  },
  item: {
    flexDirection: "row", // Sắp xếp item theo hàng ngang
    alignItems: "center", // Căn giữa theo chiều dọc
    padding: 15,
    borderBottomWidth: 1, // Đường viền dưới mỗi item
    borderBottomColor: "#ddd",
  },
  artwork: {
    width: 50,
    height: 50,
    borderRadius: 5, // Bo tròn góc của hình ảnh
    marginRight: 15, // Khoảng cách bên phải của hình ảnh
  },
  info: {
    flex: 1, // Chiếm không gian còn lại
  },
  title: {
    fontSize: 18,
    fontWeight: "bold", // Đậm tiêu đề bài hát
  },
  artist: {
    fontSize: 14,
    color: "gray", // Màu chữ cho tên nghệ sĩ
  },
  controls: {
    flexDirection: "row", // Sắp xếp các nút điều khiển theo hàng ngang
    justifyContent: "center", // Căn giữa các nút
    alignItems: "center",
    marginVertical: 20, // Khoảng cách trên dưới cho phần điều khiển
  },
  playButton: {
    backgroundColor: "black", // Màu nền cho nút phát
    borderRadius: 50, // Bo tròn nút phát
    padding: 10,
    marginHorizontal: 20, // Khoảng cách bên trái và bên phải
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-around", // Căn giữa các tùy chọn
    marginTop: 10,
  },
});

export default HomeScreen; // Xuất component HomeScreen
