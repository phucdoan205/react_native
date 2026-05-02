import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
  Dimensions,
} from "react-native";
import { Audio } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient"; // Cần: npx expo install expo-linear-gradient

const { width } = Dimensions.get("window");

const songs = [
  // ... (Giữ nguyên danh sách bài hát của bạn)
  {
    id: "1",
    title: "Acoustic Guitar",
    artist: "Corporate Music",
    artwork: {
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_SdZWIMacymfJuZ19Zxc-vwmlbHZCSOzCLg&s",
    },
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "2",
    title: "Chill Lofi",
    artist: "Lofi Study",
    artwork: {
      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiwynYg4HMA3FzKQA8KI73Netabg2RuHI5jw&s",
    },
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "3",
    title: "Summer Walk",
    artist: "Olexy",
    artwork: {
      uri: "https://img.pikbest.com/png-images/20250401/music-logo-beautiful-note-musical-vector-illustration-sound-icon_11641164.png!f305cw",
    },
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: "4",
    title: "Tropical Fusion",
    artist: "Mix",
    artwork: {
      uri: "https://img.pikbest.com/ai/illus_our/20230423/ad956650ba24abea110d2c9a554bd822.jpg!w700wp",
    },
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: "5",
    title: "Deep Night",
    artist: "Electronic",
    artwork: {
      uri: "https://cdn2.baodongthap.vn/image/news/2024/20240111/fckimage/images1922434-23r.jpg",
    },
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  },
];

const PlayerScreen = ({ route, navigation }) => {
  const { song, index, autoPlay = false } = route.params;
  const soundRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const rotateValue = useRef(new Animated.Value(0)).current;
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);

  // Logic phát nhạc (Giữ nguyên các hàm: replaySound, nextTrack, onPlaybackStatusUpdate, useEffect load nhạc)
  // ... [Giữ nguyên phần Logic của bạn để đảm bảo app chạy đúng] ...

  const replaySound = async () => {
    if (!soundRef.current) return;
    await soundRef.current.setPositionAsync(0);
    await soundRef.current.playAsync();
  };

  const nextTrack = () => {
    const nextIndex = shuffle
      ? Math.floor(Math.random() * songs.length)
      : (index + 1) % songs.length;
    navigation.navigate("Player", {
      song: songs[nextIndex],
      index: nextIndex,
      autoPlay: true,
    });
  };

  const onPlaybackStatusUpdate = (status) => {
    if (!status.isLoaded) return;
    setPosition(status.positionMillis);
    setDuration(status.durationMillis || 0);
    setIsPlaying(status.isPlaying);
    if (status.didJustFinish) {
      repeat ? replaySound() : nextTrack();
    }
  };

  useEffect(() => {
    let isMounted = true;
    const loadSound = async () => {
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: song.url },
        { shouldPlay: autoPlay },
      );
      if (!isMounted) {
        await newSound.unloadAsync();
        return;
      }
      newSound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      soundRef.current = newSound;
      setIsPlaying(autoPlay);
    };
    loadSound();
    return () => {
      isMounted = false;
      if (soundRef.current) soundRef.current.unloadAsync();
    };
  }, [song]);

  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.timing(rotateValue, {
          toValue: 1,
          duration: 12000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      rotateValue.stopAnimation();
    }
  }, [isPlaying]);

  const playPauseSound = async () => {
    if (!soundRef.current) return;
    isPlaying
      ? await soundRef.current.pauseAsync()
      : await soundRef.current.playAsync();
  };

  const previousTrack = () => {
    const prevIndex = (index - 1 + songs.length) % songs.length;
    navigation.navigate("Player", {
      song: songs[prevIndex],
      index: prevIndex,
      autoPlay: true,
    });
  };

  const seekToPosition = async (value) => {
    if (!soundRef.current) return;
    await soundRef.current.setPositionAsync(value);
  };

  const rotateInterpolate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds.padStart(2, "0")}`;
  };

  return (
    <LinearGradient colors={["#2c3e50", "#000000"]} style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>ĐANG PHÁT</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={25} color="white" />
        </TouchableOpacity>
      </View>

      {/* Disk Artwork */}
      <View style={styles.artworkContainer}>
        <Animated.Image
          source={song.artwork}
          style={[
            styles.artwork,
            { transform: [{ rotate: rotateInterpolate }] },
          ]}
        />
        <View style={styles.diskCenter} />
      </View>

      {/* Info */}
      <View style={styles.infoContainer}>
        <Text numberOfLines={1} style={styles.title}>
          {song.title}
        </Text>
        <Text style={styles.artist}>{song.artist || "Unknown Artist"}</Text>
      </View>

      {/* Slider */}
      <View style={styles.sliderContainer}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration || 1}
          value={position}
          onSlidingComplete={seekToPosition}
          minimumTrackTintColor="#A29BFE"
          maximumTrackTintColor="rgba(255,255,255,0.2)"
          thumbTintColor="#A29BFE"
        />
        <View style={styles.timeRow}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>

      {/* Controls */}
      <View style={styles.controls}>
        <TouchableOpacity onPress={() => setShuffle(!shuffle)}>
          <Ionicons
            name="shuffle"
            size={24}
            color={shuffle ? "#A29BFE" : "white"}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={previousTrack}>
          <Ionicons name="play-back" size={40} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playBtn} onPress={playPauseSound}>
          <Ionicons
            name={isPlaying ? "pause" : "play"}
            size={40}
            color="#2c3e50"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={nextTrack}>
          <Ionicons name="play-forward" size={40} color="white" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setRepeat(!repeat)}>
          <Ionicons
            name="repeat"
            size={24}
            color={repeat ? "#A29BFE" : "white"}
          />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
  },
  headerTitle: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  artworkContainer: {
    alignItems: "center",
    marginTop: 40,
    // Hiệu ứng đổ bóng cho đĩa nhạc
    shadowColor: "#A29BFE",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.3,
    shadowRadius: 30,
    elevation: 20,
  },
  artwork: {
    width: width * 0.75,
    height: width * 0.75,
    borderRadius: (width * 0.75) / 2,
    borderWidth: 8,
    borderColor: "rgba(255,255,255,0.1)",
  },
  diskCenter: {
    position: "absolute",
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#2c3e50",
    top: (width * 0.75) / 2 - 25,
    borderWidth: 5,
    borderColor: "rgba(255,255,255,0.2)",
  },
  infoContainer: {
    marginTop: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  artist: {
    fontSize: 18,
    color: "rgba(255,255,255,0.5)",
    marginTop: 5,
  },
  sliderContainer: {
    marginTop: 30,
    width: "100%",
  },
  slider: {
    width: "105%",
    height: 40,
    alignSelf: "center",
  },
  timeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  timeText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },
  playBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
});

export default PlayerScreen;
