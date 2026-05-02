import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Alert,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const images = [
  {
    id: "1",
    src: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=500",
    answer: "CAT",
  },
  {
    id: "2",
    src: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=500",
    answer: "DOG",
  },
  {
    id: "3",
    src: "https://images.unsplash.com/photo-1510337550647-e84f83e341ca?q=80&w=500",
    answer: "PUPPY",
  },
  {
    id: "4",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500",
    answer: "HUMAN",
  },
  {
    id: "5",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6pFfpsxhwJnug46t67KGQQz8-qk0YMXeSJg&s",
    answer: "DUCK",
  },
  {
    id: "6",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK7iK9DImBDjaqN0sy-S9rbGZqkWRCGWmscg&s",
    answer: "HERO",
  },
  {
    id: "7",
    src: "https://gcs.tripi.vn/public-tripi/tripi-feed/img/482881ndd/anh-mo-ta.png",
    answer: "CHICKEN",
  },
  {
    id: "8",
    src: "https://cdn.hita.com.vn/storage/blog/meo-vat-gia-dinh/anh-ngoi-nha-9.jpg",
    answer: "HOUSE",
  },
  {
    id: "9",
    src: "https://png.pngtree.com/thumb_back/fh260/background/20230518/pngtree-beautiful-horse-running-in-field-of-field-with-clouds-on-it-image_2584436.jpg",
    answer: "HORSE",
  },
  {
    id: "10",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMY9XWUk81g-OCzyfbsYXKXwZs3O4_DUyrvw&s",
    answer: "PIG",
  },
];

const GuessImageGame = () => {
  const [currentImage, setCurrentImage] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [gameStarted, setGameStarted] = useState(false);
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [letters, setLetters] = useState([]);

  useEffect(() => {
    let timer;
    if (gameStarted && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && gameStarted) {
      alert(`⏰ Hết giờ!\nĐiểm của bạn: ${score}`);
      setGameStarted(false);
    }
    return () => clearInterval(timer);
  }, [gameStarted, timeLeft]);

  const startGame = () => {
    setScore(0);
    setGameStarted(true);
    nextLevel();
  };

  const nextLevel = () => {
    const randomImg = images[Math.floor(Math.random() * images.length)];
    setCurrentImage(randomImg);
    setSelectedLetters([]);
    setTimeLeft(15);

    const answerStr = randomImg.answer.toUpperCase();
    const additional = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    let charList = answerStr.split("");

    while (charList.length < 10) {
      const randomChar =
        additional[Math.floor(Math.random() * additional.length)];
      if (!charList.includes(randomChar)) charList.push(randomChar);
    }
    setLetters(charList.sort(() => Math.random() - 0.5));
  };

  const handleLetterPress = (letter) => {
    if (selectedLetters.length < currentImage.answer.length) {
      const newSelection = [...selectedLetters, letter];
      setSelectedLetters(newSelection);

      if (newSelection.join("") === currentImage.answer.toUpperCase()) {
        setScore((prev) => prev + 1);
        setTimeout(() => {
          if (Platform.OS === "web") {
            if (confirm("✨ Chính xác! Tiếp tục chứ?")) nextLevel();
          } else {
            Alert.alert("✨ Chính xác!", "Bạn thật tuyệt vời!", [
              { text: "Tiếp tục", onPress: nextLevel },
            ]);
          }
        }, 200);
      }
    }
  };

  const deleteLetter = () => {
    setSelectedLetters(selectedLetters.slice(0, -1));
  };

  // Hàm render các ô chữ cái đáp án
  const renderAnswerSlots = () => {
    if (!currentImage) return null;

    const slots = [];
    const answer = currentImage.answer.toUpperCase();

    for (let i = 0; i < answer.length; i++) {
      slots.push(
        <View key={i} style={styles.answerBox}>
          <Text style={styles.answerText}>{selectedLetters[i] || ""}</Text>
        </View>,
      );
    }
    return slots;
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1000",
      }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        {!gameStarted ? (
          <View style={styles.startMenu}>
            <Text style={styles.logoText}>BẮT CHỮ</Text>
            <TouchableOpacity style={styles.startBtn} onPress={startGame}>
              <Text style={styles.startBtnText}>BẮT ĐẦU CHƠI</Text>
            </TouchableOpacity>
            <Text style={styles.versionText}>Version: 10.0</Text>
          </View>
        ) : (
          <View style={styles.playContainer}>
            <Text style={styles.headerTitle}>Đoán Hình Ảnh</Text>

            <View style={styles.imageCard}>
              <Image
                source={{ uri: currentImage?.src }}
                style={styles.mainImage}
              />
            </View>

            <Text style={styles.timerText}>Thời gian còn lại: {timeLeft}s</Text>
            <Text style={styles.scoreText}>Điểm: {score}</Text>

            <View style={styles.answerWrapper}>
              <View style={styles.slotsContainer}>{renderAnswerSlots()}</View>
              <TouchableOpacity onPress={deleteLetter} style={styles.deleteBtn}>
                <MaterialIcons name="backspace" size={30} color="#ff4757" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={letters}
              numColumns={5}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.letterBtn}
                  onPress={() => handleLetterPress(item)}
                >
                  <Text style={styles.letterText}>{item}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.listContainer}
            />
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  startMenu: { alignItems: "center" },
  logoText: {
    fontSize: 60,
    fontWeight: "900",
    color: "#f1c40f",
    textShadowColor: "#2c3e50",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    marginBottom: 30,
  },
  startBtn: {
    backgroundColor: "#8e44ad",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#fff",
  },
  startBtnText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  versionText: { marginTop: 50, color: "#2c3e50", fontWeight: "bold" },
  playContainer: { width: "100%", alignItems: "center" },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 10,
  },
  imageCard: {
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#8e44ad",
    marginBottom: 15,
  },
  mainImage: { width: width * 0.8, height: width * 0.5, borderRadius: 8 },
  timerText: { color: "#ff4757", fontSize: 20, fontWeight: "bold" },
  scoreText: { color: "#2c3e50", fontSize: 18, marginBottom: 10 },

  // Styles mới cho ô chữ cái
  answerWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  slotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  answerBox: {
    width: 40,
    height: 45,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#8e44ad",
    borderRadius: 5,
    margin: 2,
    justifyContent: "center",
    alignItems: "center",
    // Tạo đổ bóng nhẹ cho ô
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
      },
      android: { elevation: 2 },
    }),
  },
  answerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#8e44ad",
  },
  deleteBtn: {
    marginLeft: 10,
  },

  listContainer: { alignItems: "center" },
  letterBtn: {
    backgroundColor: "#8e44ad",
    width: width * 0.15,
    height: width * 0.15,
    margin: 5,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      web: { cursor: "pointer" },
      default: { elevation: 3 },
    }),
  },
  letterText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
});

export default GuessImageGame;
