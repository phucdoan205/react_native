import React, { useState } from "react"; //
import {
  View,
  Button,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native"; //
import { Card, Title, Paragraph, TextInput } from "react-native-paper"; //
import axios from "axios"; //
import AsyncStorage from "@react-native-async-storage/async-storage"; //

const LoginScreen = ({ navigation, setUser }) => {
  const [username, setUsername] = useState(""); //
  const [password, setPassword] = useState(""); //

  const handleLogin = async () => {
    try {
      // Lưu ý: Thay đổi IP bên dưới thành IP máy tính của bạn
      const response = await axios.post("http://192.168.1.10:5000/api/login", {
        username,
        password,
      }); //

      setUser(true); // Cập nhật trạng thái đã đăng nhập
      await AsyncStorage.setItem("token", response.data.token); // Lưu token để duy trì phiên đăng nhập
      Alert.alert("Login Successful", "Chào mừng bạn quay trở lại!"); //
      navigation.navigate("Home"); //
    } catch (error) {
      console.error(error.response.data); //
      Alert.alert("Login Failed", "Invalid username or password"); //
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Login</Title>
          <Paragraph style={styles.paragraph}>
            Please enter your credentials
          </Paragraph>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            mode="outlined"
          />
          <TextInput
            label="Password" // Paper dùng label thay vì placeholder
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true} // BẮT BUỘC phải có dấu { }
            mode="outlined" // Thuộc tính này hợp lệ với Paper
            style={styles.input}
          />
          <Button title="Login" onPress={handleLogin} color="#6200ee" />

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={{ color: "#03dac6", textAlign: "center" }}>
              Don't have an account? Register
            </Text>
          </TouchableOpacity>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  }, //
  card: { padding: 20, borderRadius: 8, elevation: 4 }, //
  title: { fontSize: 24, marginBottom: 10, textAlign: "center" }, //
  paragraph: { marginBottom: 20, textAlign: "center" }, //
  input: { marginBottom: 15, backgroundColor: "#fff" }, //
  registerButton: { marginTop: 15 }, //
});

export default LoginScreen;
