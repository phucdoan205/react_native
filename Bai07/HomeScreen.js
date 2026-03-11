import React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  TextInput,
  Avatar,
  Card,
  IconButton,
  Button,
  Divider,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");
const isWeb = width > 768;

const HomeScreen = ({ navigation, setUser }) => {
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      // Quan trọng: Cập nhật lại state setUser ở App.js để reset stack điều hướng
      if (setUser) {
        setUser(false);
      } else {
        navigation.replace("Login");
      }
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>SocialHub</Text>
        <View style={styles.headerRight}>
          <IconButton
            icon="video-outline"
            iconColor="#fff"
            size={24}
            onPress={() => {}}
          />
          <IconButton
            icon="bell-outline"
            iconColor="#fff"
            size={24}
            onPress={() => {}}
          />
          <Button
            mode="contained"
            onPress={handleLogout}
            buttonColor="#ff4436"
            labelStyle={{ fontSize: 12 }}
            style={styles.logoutBtn}
          >
            Đăng xuất
          </Button>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Post Input Section */}
        <Card style={styles.inputCard}>
          <Card.Content style={styles.inputRow}>
            <Avatar.Image
              size={40}
              source={{ uri: "https://i.pravatar.cc/150?u=me" }}
            />
            <TextInput
              placeholder="Bạn đang nghĩ gì thế?"
              placeholderTextColor="#999"
              mode="flat"
              style={styles.searchInput}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
            />
          </Card.Content>
          <Divider style={{ backgroundColor: "#3a3b3c" }} />
          <View style={styles.inputActions}>
            <Button icon="image" textColor="#45bd62">
              Ảnh/Video
            </Button>
            <Button icon="emoticon-outline" textColor="#f7b928">
              Cảm xúc
            </Button>
          </View>
        </Card>

        {/* Stories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.storyScroll}
        >
          <View style={styles.createStory}>
            <Image
              source={{ uri: "https://i.pravatar.cc/150?u=me" }}
              style={styles.storyImg}
            />
            <View style={styles.plusIcon}>
              <IconButton icon="plus" size={15} iconColor="#fff" />
            </View>
            <Text style={styles.storyName}>Tạo tin</Text>
          </View>
          {[1, 2, 3, 4, 5].map((item) => (
            <View key={item} style={styles.friendStory}>
              <Image
                source={{ uri: `https://i.pravatar.cc/150?u=${item}` }}
                style={styles.storyImg}
              />
              <Avatar.Image
                size={30}
                source={{ uri: `https://i.pravatar.cc/150?u=${item + 10}` }}
                style={styles.storyAvatar}
              />
              <Text style={styles.storyName}>User {item}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Feed */}
        <Card style={styles.postCard}>
          <View style={styles.postHeader}>
            <Avatar.Image
              size={40}
              source={{ uri: "https://i.pravatar.cc/150?u=8" }}
            />
            <View style={styles.postMeta}>
              <Text style={styles.userName}>Kỹ Năng Tạch Môn</Text>
              <Text style={styles.postTime}>50 phút trước • 🌎</Text>
            </View>
            <IconButton icon="dots-horizontal" iconColor="#b0b3b8" />
          </View>
          <Card.Content>
            <Text style={styles.postText}>
              100% chỉ copy code chứ không tìm hiểu 😂 #ReactNative #CodingLife
            </Text>
          </Card.Content>
          <Card.Cover
            source={{ uri: "https://picsum.photos/700" }}
            style={styles.postImage}
          />
          <View style={styles.postStats}>
            <Text style={styles.statsText}>👍 1.2K</Text>
            <Text style={styles.statsText}>45 bình luận</Text>
          </View>
          <Divider style={{ backgroundColor: "#3a3b3c" }} />
          <Card.Actions style={styles.actions}>
            <Button icon="thumb-up-outline" textColor="#b0b3b8">
              Thích
            </Button>
            <Button icon="comment-outline" textColor="#b0b3b8">
              Bình luận
            </Button>
            <Button icon="share-outline" textColor="#b0b3b8">
              Chia sẻ
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#18191a" },
  header: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    backgroundColor: "#242526",
    elevation: 4,
    zIndex: 10,
  },
  logo: {
    color: "#1877f2",
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: -1,
  },
  headerRight: { flexDirection: "row", alignItems: "center" },
  logoutBtn: { marginLeft: 5, borderRadius: 8 },

  scrollContent: {
    alignItems: "center",
    paddingVertical: 20,
  },
  inputCard: {
    width: isWeb ? 600 : width * 0.95,
    backgroundColor: "#242526",
    borderRadius: 10,
    marginBottom: 15,
  },
  inputRow: { flexDirection: "row", alignItems: "center" },
  searchInput: {
    flex: 1,
    backgroundColor: "#3a3b3c",
    height: 40,
    borderRadius: 20,
    marginLeft: 10,
    color: "#fff",
  },
  inputActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
  },

  storyScroll: {
    width: isWeb ? 600 : width,
    marginBottom: 20,
    paddingLeft: 10,
  },
  createStory: {
    width: 110,
    height: 200,
    backgroundColor: "#242526",
    borderRadius: 10,
    marginRight: 10,
    overflow: "hidden",
  },
  storyImg: { width: "100%", height: "80%", opacity: 0.8 },
  plusIcon: {
    position: "absolute",
    top: "70%",
    alignSelf: "center",
    backgroundColor: "#1877f2",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#242526",
  },
  storyName: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
  },
  friendStory: {
    width: 110,
    height: 200,
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  storyAvatar: {
    position: "absolute",
    top: 10,
    left: 10,
    borderWidth: 3,
    borderColor: "#1877f2",
  },

  postCard: {
    width: isWeb ? 600 : width * 0.95,
    backgroundColor: "#242526",
    borderRadius: 10,
    marginBottom: 20,
  },
  postHeader: { flexDirection: "row", padding: 12, alignItems: "center" },
  postMeta: { flex: 1, marginLeft: 10 },
  userName: { color: "#e4e6eb", fontWeight: "bold", fontSize: 16 },
  postTime: { color: "#b0b3b8", fontSize: 12 },
  postText: { color: "#e4e6eb", fontSize: 15, lineHeight: 20 },
  postImage: { height: 400, marginHorizontal: 0 },
  postStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  statsText: { color: "#b0b3b8", fontSize: 13 },
  actions: {
    justifyContent: "space-around",
    borderTopWidth: 0.5,
    borderColor: "#3e4042",
  },
});

export default HomeScreen;
