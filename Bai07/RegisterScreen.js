import React, { useState } from "react"; //
import { View, Button, Alert, StyleSheet } from "react-native"; //
import { Card, Title, Paragraph, TextInput } from "react-native-paper"; //
import axios from "axios"; //

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState(""); //
  const [password, setPassword] = useState(""); //

  const handleRegister = async () => {
    try {
      // Gửi yêu cầu đăng ký đến server
      const response = await axios.post(
        "http://192.168.1.10:5000/api/register",
        {
          username,
          password,
        }
      ); //

      Alert.alert("Registration Successful", "You can now log in."); //
      navigation.navigate("Login"); // Điều hướng về màn hình đăng nhập
    } catch (error) {
      console.error(error.response.data); //
      Alert.alert(
        "Registration Failed",
        error.response.data || "User already exists"
      ); //
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Register</Title>
          <Paragraph style={styles.paragraph}>Create a new account</Paragraph>
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
          <Button title="Register" onPress={handleRegister} color="#6200ee" />
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
  input: { marginBottom: 15, backgroundColor: "#fff" },
});

export default RegisterScreen;
