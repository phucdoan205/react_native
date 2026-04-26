import React, { useRef } from "react";
import { View, Animated, StyleSheet, Dimensions, Platform } from "react-native";
import { Card, Button, Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export const HomeScreen = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const translateAnim = useRef(new Animated.Value(0)).current;

  // Hiệu ứng Fade In mượt mà hơn
  const handleFadeIn = () => {
    fadeAnim.setValue(0);
    Animated.spring(fadeAnim, {
      toValue: 1,
      tension: 20,
      friction: 7,
      useNativeDriver: true,
    }).start();
  };

  // Hiệu ứng Scale có độ nảy (Spring)
  const handleScale = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1.5,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleTranslate = () => {
    Animated.sequence([
      Animated.timing(translateAnim, {
        toValue: 50,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(translateAnim, {
        toValue: 0,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleGoToScreen2 = () => {
    navigation.navigate("Screen2", {
      param1: "React Native",
      param2: "Animations",
    });
  };

  return (
    <LinearGradient colors={["#667eea", "#764ba2"]} style={styles.container}>
      <View style={styles.overlay}>
        {/* Header tạo động lực */}
        <View style={styles.header}>
          <Text style={styles.titleText}>Khám phá 🚀</Text>
          <Text style={styles.subtitleText}>
            Biến ý tưởng thành hiện thực thông qua chuyển động
          </Text>
        </View>

        {/* Khối Animation Box lung linh */}
        <View style={styles.animationArea}>
          <Animated.View
            style={[
              styles.box,
              {
                opacity: fadeAnim,
                transform: [
                  { scale: scaleAnim },
                  { translateX: translateAnim },
                ],
              },
            ]}
          >
            <LinearGradient
              colors={["#FF9A8B", "#FF6A88", "#FF99AC"]}
              style={styles.boxGradient}
            >
              <MaterialIcons name="auto-awesome" size={40} color="#fff" />
            </LinearGradient>
          </Animated.View>
        </View>

        {/* Card phong cách Glassmorphism */}
        <Card style={styles.card}>
          <Card.Content style={styles.cardInner}>
            <View>
              <Text style={styles.cardTitle}>Phòng Deluxe</Text>
              <Text style={styles.cardPrice}>Chỉ từ $100 / đêm</Text>
            </View>
            <MaterialIcons name="star" size={24} color="#FFD700" />
          </Card.Content>
        </Card>

        {/* Cụm nút bấm hiện đại */}
        <View style={styles.buttonContainer}>
          <View style={styles.row}>
            <TouchableOpacityAction
              icon="wb-sunny"
              label="Fade"
              onPress={handleFadeIn}
            />
            <TouchableOpacityAction
              icon="zoom-out-map"
              label="Scale"
              onPress={handleScale}
            />
            <TouchableOpacityAction
              icon="compare-arrows"
              label="Move"
              onPress={handleTranslate}
            />
          </View>

          <Button
            mode="contained"
            onPress={handleGoToScreen2}
            style={styles.navigateButton}
            contentStyle={styles.navigateButtonContent}
            labelStyle={styles.navigateButtonLabel}
          >
            Tiếp tục hành trình <MaterialIcons name="arrow-forward" size={18} />
          </Button>
        </View>
      </View>
    </LinearGradient>
  );
};

// Component con cho nút bấm nhanh
const TouchableOpacityAction = ({ icon, label, onPress }) => (
  <View style={styles.actionItem}>
    <Button
      mode="elevated"
      onPress={onPress}
      style={styles.actionButton}
      contentStyle={{ height: 60 }}
    >
      <MaterialIcons name={icon} size={24} color="#764ba2" />
    </Button>
    <Text style={styles.actionLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    padding: 20,
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    marginTop: 50,
    alignItems: "center",
  },
  titleText: {
    fontSize: 32,
    fontWeight: "900",
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  subtitleText: {
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    marginTop: 10,
    fontSize: 14,
    paddingHorizontal: 20,
  },
  animationArea: {
    height: 150,
    justifyContent: "center",
  },
  box: {
    width: 100,
    height: 100,
    borderRadius: 25,
    elevation: 20,
    shadowColor: "#FF6A88",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
  boxGradient: {
    flex: 1,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    overflow: "hidden",
    ...Platform.select({
      web: { backdropFilter: "blur(10px)" },
    }),
  },
  cardInner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  cardPrice: {
    fontSize: 14,
    color: "#00E676",
    fontWeight: "600",
    marginTop: 4,
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 25,
  },
  actionItem: {
    alignItems: "center",
  },
  actionButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 65,
  },
  actionLabel: {
    color: "#fff",
    marginTop: 8,
    fontWeight: "600",
    fontSize: 12,
  },
  navigateButton: {
    borderRadius: 20,
    backgroundColor: "#00c6ff",
    elevation: 8,
    shadowColor: "#00c6ff",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  navigateButtonContent: {
    height: 60,
  },
  navigateButtonLabel: {
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});
