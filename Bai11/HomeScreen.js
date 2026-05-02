import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; // Cần cài: npx expo install expo-linear-gradient

const { width } = Dimensions.get("window");

const songs = [
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

const HomeScreen = ({ navigation }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const playSong = (index) => {
    setCurrentSongIndex(index);
    navigation.navigate("Player", {
      song: songs[index],
      index,
      autoPlay: true,
    });
  };

  const renderItem = ({ item, index }) => {
    const isActive = currentSongIndex === index;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[styles.item, isActive && styles.activeItem]}
        onPress={() => playSong(index)}
      >
        <Image source={item.artwork} style={styles.artwork} />
        <View style={styles.info}>
          <Text style={[styles.title, isActive && styles.activeText]}>
            {item.title}
          </Text>
          <Text style={[styles.artist, isActive && styles.activeText]}>
            {item.artist}
          </Text>
        </View>
        <View style={styles.playIconContainer}>
          <Ionicons
            name={isActive ? "stats-chart" : "play-circle"}
            size={28}
            color={isActive ? "#FFD700" : "#6C63FF"}
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <LinearGradient colors={["#fdfbfb", "#ebedee"]} style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.headerContainer}>
        <Text style={styles.headerSubtitle}>Chào buổi sáng,</Text>
        <Text style={styles.headerTitle}>Giai điệu của bạn 🎵</Text>
      </View>

      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Mini Player Floating Bar */}
      <View style={styles.playerCard}>
        <LinearGradient
          colors={["#6C63FF", "#4B45B2"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.playerGradient}
        >
          <Image
            source={songs[currentSongIndex].artwork}
            style={styles.miniArtwork}
          />
          <View style={styles.miniInfo}>
            <Text numberOfLines={1} style={styles.miniTitle}>
              {songs[currentSongIndex].title}
            </Text>
            <Text style={styles.miniArtist}>
              {songs[currentSongIndex].artist}
            </Text>
          </View>

          <View style={styles.miniControls}>
            <TouchableOpacity
              onPress={() =>
                playSong(
                  currentSongIndex - 1 < 0
                    ? songs.length - 1
                    : currentSongIndex - 1,
                )
              }
            >
              <Ionicons name="play-skip-back" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.miniPlayBtn}
              onPress={() => playSong(currentSongIndex)}
            >
              <Ionicons name="pause" size={24} color="#6C63FF" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => playSong((currentSongIndex + 1) % songs.length)}
            >
              <Ionicons name="play-skip-forward" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: 60,
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#888",
    fontWeight: "500",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 120, // Để không bị đè bởi player bar
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "white",
    borderRadius: 20,
    marginBottom: 15,
    // Đổ bóng (Shadow) cho iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    // Đổ bóng cho Android
    elevation: 4,
  },
  activeItem: {
    backgroundColor: "#f0efff",
    borderWidth: 1,
    borderColor: "#6C63FF50",
  },
  artwork: {
    width: 60,
    height: 60,
    borderRadius: 15,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#333",
    marginBottom: 4,
  },
  activeText: {
    color: "#6C63FF",
  },
  artist: {
    fontSize: 13,
    color: "#999",
  },
  playIconContainer: {
    paddingHorizontal: 5,
  },
  // --- Floating Mini Player Style ---
  playerCard: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    borderRadius: 25,
    overflow: "hidden",
    elevation: 10,
    shadowColor: "#6C63FF",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
  },
  playerGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  miniArtwork: {
    width: 45,
    height: 45,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.3)",
  },
  miniInfo: {
    flex: 1,
    marginLeft: 12,
  },
  miniTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  miniArtist: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
  },
  miniControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  miniPlayBtn: {
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
