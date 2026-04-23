import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import axios from "axios";

const API_URL = "http://localhost:5000/friends";

const AddFriend = ({ navigation, route }) => {
  const { friend } = route.params || {};
  const [name, setName] = useState(friend ? friend.name : "");
  const [phone, setPhone] = useState(friend ? friend.phone : "");
  const [email, setEmail] = useState(friend ? friend.email : "");
  const [avatar, setAvatar] = useState(friend ? friend.avatar : "");

  const handleAddOrUpdateFriend = async () => {
    if (!name || !phone || !email || !avatar) {
      Alert.alert("Error", "Please fill in all fields!");
      return;
    }

    try {
      if (friend) {
        // Cập nhật thông tin bạn bè
        await axios.put(`${API_URL}/${friend._id}`, {
          name,
          phone,
          email,
          avatar,
        });
        Alert.alert("Success", "Friend information has been updated!");
      } else {
        // Thêm bạn bè mới
        await axios.post(API_URL, { name, phone, email, avatar });
        Alert.alert("Success", "Friend has been added!");
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Error saving friend");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {friend ? "Edit Friend" : "Add New Friend"}
      </Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Avatar URL"
        value={avatar}
        onChangeText={setAvatar}
        style={styles.input}
      />
      <Button
        title={friend ? "Update" : "Add"}
        onPress={handleAddOrUpdateFriend}
        color="#f4511e"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f8f9fa" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#343a40",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ced4da",
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff",
  },
});

export default AddFriend;
