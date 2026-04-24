import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Audio } from "expo-av";
import { Ionicons } from "@react-native-vector-icons";
import Slider from "@react-native-community/slider";

// Danh sách các bài hát
const songs = [
  {
    id: "1",
    title: "Vui Đời",
    artwork: require("./assets/vuidet.jpg"),
    url: require("./assets/vuidet.mp3"),
  },
  {
    id: "2",
    title: "Ký ức hoa hồng",
    artwork: require("./assets/kyuchoahong.jpg"),
    url: require("./assets/kyuchoahong.mp3"),
  },
  {
    id: "3",
    title: "Ký ức hoa hồng 1",
    artwork: require("./assets/kyuchoahong.jpg"),
    url: require("./assets/kyuchoahong.mp3"),
  },
  {
    id: "4",
    title: "Ký ức hoa hồng 2",
    artwork: require("./assets/kyuchoahong.jpg"),
    url: require("./assets/kyuchoahong.mp3"),
  },
  {
    id: "5",
    title: "Ký ức hoa hồng 3",
    artwork: require("./assets/kyuchoahong.jpg"),
    url: require("./assets/kyuchoahong.mp3"),
  },
  {
    id: "6",
    title: "Ký ức hoa hồng 4",
    artwork: require("./assets/kyuchoahong.jpg"),
    url: require("./assets/kyuchoahong.mp3"),
  },
  {
    id: "7",
    title: "Ký ức hoa hồng 5",
    artwork: require("./assets/kyuchoahong.jpg"),
    url: require("./assets/kyuchoahong.mp3"),
  },
];

const PlayerScreen = ({ route, navigation }) => {
  const { song, index } = route.params; // Nhận bài hát và chỉ số từ tham số điều hướng
  const [sound, setSound] = useState(null); // Trạng thái âm thanh
  const [isPlaying, setIsPlaying] = useState(false); // Trạng thái phát nhạc
  const [rotateValue, setRotateValue] = useState(new Animated.Value(0)); // Giá trị xoay cho hình ảnh
  const [shuffle, setShuffle] = useState(false); // Trạng thái xáo trộn
  const [repeat, setRepeat] = useState(false); // Trạng thái lặp lại
  const [duration, setDuration] = useState(0); // Thời gian tổng của bài hát
  const [position, setPosition] = useState(0); // Vị trí hiện tại của bài hát

  useEffect(() => {
    const loadSound = async () => {
      const { sound } = await Audio.Sound.createAsync(song.url, {
        shouldPlay: true, // Tự động phát khi tải
      });
      setSound(sound); // Cập nhật âm thanh

      sound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate); // Thiết lập hàm cập nhật trạng thái phát
      startRotation(); // Bắt đầu xoay hình ảnh
    };

    loadSound(); // Gọi hàm tải âm thanh

    return () => {
      if (sound) {
        sound.unloadAsync(); // Giải phóng âm thanh khi component bị hủy
      }
      stopRotation(); // Dừng xoay khi bài hát dừng
    };
  }, [song]); // Theo dõi khi bài hát thay đổi

  const onPlaybackStatusUpdate = async (status) => {
    if (status.didJustFinish) {
      if (repeat) {
        playSound(); // Lặp lại bài
      } else {
        nextTrack(); // Chuyển sang bài tiếp theo
      }
    }

    if (status.isLoaded) {
      setPosition(status.positionMillis); // Cập nhật vị trí hiện tại
      setDuration(status.durationMillis); // Cập nhật thời gian tổng
    }
  };

  const playSound = async () => {
    if (sound) {
      await sound.playAsync(); // Phát âm thanh
      setIsPlaying(true); // Cập nhật trạng thái phát
      startRotation(); // Bắt đầu xoay khi phát
    }
  };

  const pauseSound = async () => {
    if (sound) {
      await sound.pauseAsync(); // Tạm dừng âm thanh
      setIsPlaying(false); // Cập nhật trạng thái tạm dừng
      stopRotation(); // Dừng xoay khi tạm dừng
    }
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync(); // Dừng âm thanh
      setIsPlaying(false); // Cập nhật trạng thái dừng
      stopRotation(); // Dừng xoay khi dừng
    }
  };

  const startRotation = () => {
    rotateValue.setValue(0); // Đặt lại giá trị xoay
    Animated.timing(rotateValue, {
      toValue: 1,
      duration: 6000, // Thời gian xoay
      useNativeDriver: true,
    }).start(() => isPlaying && startRotation()); // Bắt đầu xoay lại nếu đang phát
  };

  const stopRotation = () => {
    rotateValue.stopAnimation(); // Dừng animation
    rotateValue.setValue(0); // Đặt lại giá trị
  };

  const nextTrack = () => {
    stopSound(); // Dừng âm thanh hiện tại
    const nextIndex = shuffle
      ? Math.floor(Math.random() * songs.length)
      : (index + 1) % songs.length; // Chọn bài tiếp theo
    navigation.navigate("Player", { song: songs[nextIndex], index: nextIndex }); // Chuyển đến bài tiếp theo
  };

  const previousTrack = () => {
    stopSound(); // Dừng âm thanh hiện tại
    const prevIndex = (index - 1 + songs.length) % songs.length; // Chọn bài trước
    navigation.navigate("Player", { song: songs[prevIndex], index: prevIndex }); // Chuyển đến bài trước
  };

  const toggleShuffle = () => {
    setShuffle(!shuffle); // Chuyển đổi trạng thái xáo trộn
  };

  const toggleRepeat = () => {
    setRepeat(!repeat); // Chuyển đổi trạng thái lặp lại
  };

  const seekToPosition = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value); // Đặt vị trí phát nhạc
    }
  };

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"], // Xoay từ 0 đến 360 độ
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={song.artwork} // Hình ảnh bìa bài hát
        style={[styles.artwork, { transform: [{ rotate: rotateInterpolate }] }]} // Áp dụng hiệu ứng xoay
      />
      <Text style={styles.title}>{song.title}</Text> {/* Tiêu đề bài hát */}
      <Text style={styles.timeText}>
        {`${Math.floor(position / 60000)}:${Math.floor(
          (position % 60000) / 1000,
        )
          .toString()
          .padStart(2, "0")}`}{" "}
        /{" "}
        {`${Math.floor(duration / 60000)}:${Math.floor(
          (duration % 60000) / 1000,
        )
          .toString()
          .padStart(2, "0")}`}
      </Text>{" "}
      {/* Thời gian đã phát / tổng thời gian */}
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration} // Đặt giá trị tối đa của slider
        value={position} // Giá trị hiện tại của slider
        onSlidingComplete={seekToPosition} // Cập nhật vị trí khi người dùng dừng kéo slider
        minimumTrackTintColor="#1EB1FC" // Màu đường đã trôi qua
        maximumTrackTintColor="#d3d3d3" // Màu đường đi tới đa
      />
      <View style={styles.controls}>
        <TouchableOpacity onPress={previousTrack}>
          <Ionicons name="play-skip-back-outline" size={40} color="black" />{" "}
          {/* Nút quay lại */}
        </TouchableOpacity>

        <TouchableOpacity onPress={isPlaying ? pauseSound : playSound}>
          <Ionicons
            name={isPlaying ? "pause-circle-outline" : "play-circle-outline"}
            size={60}
            color="black"
          />{" "}
          {/* Nút phát / tạm dừng */}
        </TouchableOpacity>

        <TouchableOpacity onPress={nextTrack}>
          <Ionicons name="play-skip-forward-outline" size={40} color="black" />{" "}
          {/* Nút tiếp theo */}
        </TouchableOpacity>
      </View>
      <View style={styles.options}>
        <TouchableOpacity onPress={toggleShuffle}>
          <Text style={[styles.optionText, shuffle && styles.activeOption]}>
            Shuffle
          </Text>{" "}
          {/* Nút xáo trộn */}
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleRepeat}>
          <Text style={[styles.optionText, repeat && styles.activeOption]}>
            Repeat
          </Text>{" "}
          {/* Nút lặp lại */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  artwork: {
    width: 200,
    height: 200,
    borderRadius: 100, // Bo tròn hình ảnh
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
  timeText: {
    marginTop: 20,
    fontSize: 16,
  },
  slider: {
    width: "80%",
    height: 40,
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "40%",
    marginTop: 20,
  },
  optionText: {
    fontSize: 16,
  },
  activeOption: {
    fontWeight: "bold",
    color: "blue", // Màu cho tùy chọn đang hoạt động
  },
});

export default PlayerScreen; // Xuất màn hình PlayerScreen ra ngoài
