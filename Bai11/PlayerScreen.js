import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";
import { Audio } from "expo-av";
import { Ionicons } from "react-native-vector-icons";
import Slider from "@react-native-community/slider";

// Danh sách các bài hát ONLINE (Dùng chung bộ data với HomeScreen)
const songs = [
  {
    id: "1",
    title: "Acoustic Guitar",
    artwork: {
      uri: "https://cdn.pixabay.com/audio/2022/08/31/21-14-11-205_200x200.jpg",
    },
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "2",
    title: "Chill Lofi",
    artwork: {
      uri: "https://cdn.pixabay.com/audio/2022/05/27/23-51-43-941_200x200.jpg",
    },
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "3",
    title: "Summer Walk",
    artwork: {
      uri: "https://cdn.pixabay.com/audio/2022/03/10/13-27-33-314_200x200.jpg",
    },
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
];

const PlayerScreen = ({ route, navigation }) => {
  const { song, index } = route.params;
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [rotateValue] = useState(new Animated.Value(0)); // Dùng const cho Animated Value
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const loadSound = async () => {
      // GIẢI PHÓNG âm thanh cũ trước khi load bài mới
      if (sound) {
        await sound.unloadAsync();
      }

      // LOAD NHẠC TỪ URL ONLINE
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: song.url }, // Chỉnh sửa từ require sang uri
        { shouldPlay: true },
      );

      setSound(newSound);
      setIsPlaying(true);

      newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    };

    loadSound();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [song]); // Chạy lại mỗi khi bài hát thay đổi

  // Hiệu ứng xoay đĩa nhạc
  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 10000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      rotateValue.stopAnimation();
    }
  }, [isPlaying]);

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);

      if (status.didJustFinish) {
        if (repeat) {
          replaySound();
        } else {
          nextTrack();
        }
      }
    }
  };

  const replaySound = async () => {
    if (sound) {
      await sound.setPositionAsync(0);
      await sound.playAsync();
    }
  };

  const playPauseSound = async () => {
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    const nextIndex = shuffle
      ? Math.floor(Math.random() * songs.length)
      : (index + 1) % songs.length;
    navigation.navigate("Player", { song: songs[nextIndex], index: nextIndex });
  };

  const previousTrack = () => {
    const prevIndex = (index - 1 + songs.length) % songs.length;
    navigation.navigate("Player", { song: songs[prevIndex], index: prevIndex });
  };

  const seekToPosition = async (value) => {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  };

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  // Hàm format thời gian (ms -> mm:ss)
  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, "0")}`;
  };

  return (
    <View style={styles.container}>
      <Animated.Image
        source={song.artwork} // Nhận object {uri: ...}
        style={[styles.artwork, { transform: [{ rotate: rotateInterpolate }] }]}
      />
      <Text style={styles.title}>{song.title}</Text>

      <Text style={styles.timeText}>
        {formatTime(position)} / {formatTime(duration)}
      </Text>

      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration || 1}
        value={position}
        onSlidingComplete={seekToPosition}
        minimumTrackTintColor="#1EB1FC"
        maximumTrackTintColor="#d3d3d3"
      />

      <View style={styles.controls}>
        <TouchableOpacity onPress={previousTrack}>
          <Ionicons name="play-skip-back-outline" size={40} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={playPauseSound}>
          <Ionicons
            name={isPlaying ? "pause-circle-outline" : "play-circle-outline"}
            size={70}
            color="black"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={nextTrack}>
          <Ionicons name="play-skip-forward-outline" size={40} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.options}>
        <TouchableOpacity onPress={() => setShuffle(!shuffle)}>
          <Ionicons
            name="shuffle-outline"
            size={25}
            color={shuffle ? "blue" : "gray"}
          />
          <Text style={[styles.optionText, shuffle && styles.activeOption]}>
            Shuffle
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setRepeat(!repeat)}>
          <Ionicons
            name="repeat-outline"
            size={25}
            color={repeat ? "blue" : "gray"}
          />
          <Text style={[styles.optionText, repeat && styles.activeOption]}>
            Repeat
          </Text>
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
    padding: 20,
  },
  artwork: {
    width: 250,
    height: 250,
    borderRadius: 125,
    marginBottom: 30,
    borderWidth: 5,
    borderColor: "#ddd",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  timeText: {
    marginTop: 20,
    fontSize: 16,
    color: "#666",
  },
  slider: {
    width: "100%",
    height: 40,
    marginVertical: 10,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
    marginTop: 20,
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 40,
  },
  optionText: {
    fontSize: 12,
    textAlign: "center",
  },
  activeOption: {
    fontWeight: "bold",
    color: "blue",
  },
});

export default PlayerScreen;
