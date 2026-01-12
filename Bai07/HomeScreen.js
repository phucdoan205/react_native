
import React from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = ({ navigation }) => {
  const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.navigate("Login");
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TextInput
          style={styles.searchInput}
          placeholder="Bạn đang nghĩ gì thế?"
          placeholderTextColor="#bbb"
        />
        <View style={styles.headerRight}>
          <MaterialIcon
            name="video-call"
            size={25}
            color="#fff"
            style={styles.icon}
          />
          <MaterialIcon
            name="notifications"
            size={25}
            color="#fff"
            style={styles.icon}
          />
          <Button title="Logout" onPress={handleLogout} color="#ff4436" />
        </View>
      </View>

      {/* Stories Section */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.storiesSection}
      >
        <View style={styles.story}>
          <Image
            source={{
              uri: "https://png.pngtree.com/element_our/20200610/ourlarge/pngtree-default-avatar-image_2237213.jpg",
            }}
            style={styles.storyImage}
          />
          <View style={styles.addStoryIcon}>
            <Icon name="plus" size={15} color="#fff" />
          </View>
          <Text style={styles.storyText}>Tạo tin</Text>
        </View>
        {/* Thêm các story khác tương tự */}
      </ScrollView>

      {/* Post Section */}
      <View style={styles.postSection}>
        <View style={styles.post}>
          <View style={styles.postHeader}>
            <Image
              source={{
                uri: "https://png.pngtree.com/element_our/20200610/ourlarge/pngtree-default-avatar-image_2237213.jpg",
              }}
              style={styles.postProfileImage}
            />
            <View>
              <Text style={styles.postProfileName}>Kỹ Năng Tạch Môn</Text>
              <Text style={styles.postTime}>50 phút trước</Text>
            </View>
          </View>
          <Text style={styles.postText}>
            100% chỉ copy code chứ không tìm hiểu 😂 #knst
          </Text>
          <Image
            source={{
              uri: "https://png.pngtree.com/element_our/20200610/ourlarge/pngtree-default-avatar-image_2237213.jpg",
            }}
            style={styles.postImage}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#1c1e21" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#242526",
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#3a3b3c",
    borderRadius: 20,
    paddingHorizontal: 15,
    color: "#fff",
    height: 40,
  },
  headerRight: { flexDirection: "row", alignItems: "center", marginLeft: 10 },
  icon: { marginLeft: 10 },
  storiesSection: { flexDirection: "row", padding: 10 },
  story: { position: "relative", marginRight: 10 },
  storyImage: { width: 100, height: 150, borderRadius: 10 },
  addStoryIcon: {
    position: "absolute",
    bottom: 30,
    left: 10,
    backgroundColor: "#1877f2",
    borderRadius: 20,
    padding: 5,
  },
  storyText: { color: "#fff", textAlign: "center", marginTop: 5 },
  post: {
    backgroundColor: "#242526",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  postHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  postProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  postProfileName: { color: "#fff", fontWeight: "bold" },
  postTime: { color: "#888", fontSize: 12 },
  postText: { color: "#fff", marginBottom: 10 },
  postImage: { width: "100%", height: 300, borderRadius: 10 },
});

export default HomeScreen;
