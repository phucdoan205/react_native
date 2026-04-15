import React, { useRef } from "react";
import { View, Animated, StyleSheet } from "react-native";
import { Card, Button, Text } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";

export const HomeScreen = ({ navigation }) => {
  // 1. Khởi tạo các giá trị động cho hiệu ứng
  const fadeAnim = useRef(new Animated.Value(0)).current; 
  const scaleAnim = useRef(new Animated.Value(1)).current; 
  const translateAnim = useRef(new Animated.Value(0)).current; 

  // 2. Hàm thực hiện hiệu ứng fade in
  const handleFadeIn = () => {
    fadeAnim.setValue(0); 
    Animated.timing(fadeAnim, {
      toValue: 1, 
      duration: 1000, 
      useNativeDriver: true, 
    }).start(); 
  };

  // 3. Hàm thực hiện hiệu ứng scale (phóng to rồi thu nhỏ)
  const handleScale = () => {
    Animated.timing(scaleAnim, {
      toValue: 2, 
      duration: 1000, 
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleAnim, {
        toValue: 1, 
        duration: 1000, 
        useNativeDriver: true,
      }).start(); 
    });
  };

  // 4. Hàm thực hiện hiệu ứng translate (dịch chuyển qua lại)
  const handleTranslate = () => {
    Animated.timing(translateAnim, {
      toValue: 100, // Dịch chuyển 100 đơn vị
      duration: 1000, 
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(translateAnim, {
        toValue: 0, 
        duration: 1000, 
        useNativeDriver: true,
      }).start(); 
    });
  };

  return (
    <View style={styles.container}>
      {/* Khối màu đỏ áp dụng hiệu ứng */}
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
      />

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Phòng Deluxe</Text>
          <Text style={styles.cardPrice}>Giá: $100/đêm</Text>
        </Card.Content>
      </Card>

      {/* Các nút bấm để điều khiển hiệu ứng */}
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleFadeIn} style={styles.button}>
          Fade In
        </Button>
        <Button mode="contained" onPress={handleScale} style={styles.button}>
          Scale
        </Button>
        <Button mode="contained" onPress={handleTranslate} style={styles.button}>
          Translate
        </Button>
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
  box: {
    width: 100,
    height: 100,
    backgroundColor: "tomato",
    marginBottom: 20,
    borderRadius: 10,
  },
  card: {
    width: "90%",
    margin: 10,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardPrice: {
    fontSize: 16,
    color: "green",
  },
  buttonContainer: {
    marginTop: 20,
    width: "90%",
  },
  button: {
    marginVertical: 5,
  },
});