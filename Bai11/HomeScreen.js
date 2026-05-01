import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";

// Danh sách các bài hát sử dụng link ONLINE
const songs = [
  {
    id: "1",
    title: "Acoustic Guitar",
    artist: "Corporate Music",
    // Link ảnh online dùng uri
    artwork: {
      uri: "https://cdn.pixabay.com/audio/2022/08/31/21-14-11-205_200x200.jpg",
    },
    // Link nhạc online là một chuỗi string
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  },
  {
    id: "2",
    title: "Chill Lofi",
    artist: "Lofi Study",
    artwork: {
      uri: "https://cdn.pixabay.com/audio/2022/05/27/23-51-43-941_200x200.jpg",
    },
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
  },
  {
    id: "3",
    title: "Summer Walk",
    artist: "Olexy",
    artwork: {
      uri: "https://cdn.pixabay.com/audio/2022/03/10/13-27-33-314_200x200.jpg",
    },
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
  },
  {
    id: "4",
    title: "Tropical Fusion",
    artist: "Mix",
    artwork: {
      uri: "https://cdn.pixabay.com/audio/2022/01/21/10-21-48-251_200x200.jpg",
    },
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
  },
  {
    id: "5",
    title: "Deep Night",
    artist: "Electronic",
    artwork: {
      uri: "https://cdn.pixabay.com/audio/2021/11/25/12-34-56-789_200x200.jpg",
    },
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
  },
];

const HomeScreen = ({ navigation }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const playSong = (index) => {
    setCurrentSongIndex(index);
    // Chú ý: Đảm bảo màn hình "Player" của bạn nhận 'url' dưới dạng string hoặc uri tùy logic
    navigation.navigate("Player", { song: songs[index], index });
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity style={styles.item} onPress={() => playSong(index)}>
        {/* source bây giờ nhận object {uri: ...} từ item.artwork */}
        <Image source={item.artwork} style={styles.artwork} />
        <View style={styles.info}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.artist}>{item.artist}</Text>
        </View>
        <Ionicons name="play-circle-outline" size={30} color="black" />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách phát Online</Text>
      <FlatList
        data={songs}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
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
          <Ionicons name="play-skip-back-outline" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.playButton}
          onPress={() => playSong(currentSongIndex)}
        >
          <Ionicons name="play-circle-outline" size={50} color="white" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => playSong((currentSongIndex + 1) % songs.length)}
        >
          <Ionicons name="play-skip-forward-outline" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// ... (Phần styles giữ nguyên như code cũ của bạn)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  artwork: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 15,
    backgroundColor: "#ccc", // Màu nền tạm khi ảnh đang load
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  artist: {
    fontSize: 14,
    color: "gray",
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  playButton: {
    backgroundColor: "black",
    borderRadius: 50,
    padding: 10,
    marginHorizontal: 20,
  },
});

export default HomeScreen;
