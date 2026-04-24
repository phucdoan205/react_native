import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  TextInput,
  Modal,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";

const initialPosts = [
  {
    id: 1,
    userName: "Dâu Phà Mobile",
    title: "THỬ VUI VẺ - TẶNG Giftcode CHUNG",
    content:
      "Tự Nghĩa xin gửi tặng Đại hữu giftcode chung, Chúc các bạn vui vẻ!",
    imageUrl:
      "https://png.pngtree.com/element_our/20200610/ourlarge/pngtree-default-avatar-image_2237213.jpg",
    time: "3 giờ",
  },
  {
    id: 2,
    userName: "Nguyễn Văn A",
    title: "Chương Trình Khuyến Mãi",
    content: "Hãy tham gia chương trình khuyến mãi đặc biệt này!",
    imageUrl:
      "https://png.pngtree.com/element_our/20200610/ourlarge/pngtree-default-avatar-image_2237213.jpg",
    time: "1 ngày",
  },
  {
    id: 3,
    userName: "Trần Thị B",
    title: "Thông Báo Quan Trọng",
    content: "Có một thông báo quan trọng cho tất cả mọi người!",
    imageUrl:
      "https://png.pngtree.com/element_our/20200610/ourlarge/pngtree-default-avatar-image_2237213.jpg",
    time: "2 ngày",
  },
];

export default function App() {
  return (
    <MenuProvider>
      {/* Đã xóa khoảng trắng lỗi ở đây */}
      <PostInterface />
    </MenuProvider>
  );
}

function PostInterface() {
  const [posts, setPosts] = useState(initialPosts);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });

  const handleMenuOptionSelect = (option, post) => {
    if (option === "Sửa bài viết") {
      setCurrentPost(post);
      setNewPost({
        title: post.title,
        content: post.content,
        imageUrl: post.imageUrl,
      });
      setIsEditing(true);
      setModalVisible(true);
    } else if (option === "Xóa bài viết") {
      Alert.alert("Xóa bài viết", "Bạn có chắc chắn muốn xóa?", [
        { text: "Không", style: "cancel" },
        {
          text: "Có",
          onPress: () => {
            setPosts(posts.filter((p) => p.id !== post.id));
          },
        },
      ]);
    }
  };

  const handleSavePost = () => {
    if (isEditing) {
      setPosts(
        posts.map((p) =>
          p.id === currentPost.id
            ? {
                ...p,
                title: newPost.title,
                content: newPost.content,
                imageUrl: newPost.imageUrl,
              }
            : p,
        ),
      );
    } else {
      setPosts([
        ...posts,
        {
          id: Date.now(),
          userName: "Người Dùng Mới",
          title: newPost.title,
          content: newPost.content,
          imageUrl: newPost.imageUrl,
          time: "Vài giây trước",
        },
      ]);
    }
    setModalVisible(false);
    setNewPost({ title: "", content: "", imageUrl: "" });
    setIsEditing(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={{ uri: "https://via.placeholder.com/400x200" }}
          style={styles.backgroundImage}
        />
        <View style={styles.profileInfo}>
          <Image
            source={{
              uri: "https://png.pngtree.com/element_our/20200610/ourlarge/pngtree-default-avatar-image_2237213.jpg",
            }}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>Người dùng</Text>
          <Text style={styles.friendCount}>362 người bạn</Text>
          <Text style={styles.status}>Đang làm bài tập</Text>
        </View>
      </View>

      <Button
        title="Thêm bài viết mới"
        onPress={() => {
          setModalVisible(true);
          setIsEditing(false);
          setNewPost({ title: "", content: "", imageUrl: "" });
        }}
      />

      {posts.map((post) => (
        <View key={post.id} style={styles.postContainer}>
          <View style={styles.header}>
            <Menu>
              <MenuTrigger>
                <Icon name="ellipsis-vertical" size={24} color="#6200EE" />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption
                  onSelect={() => handleMenuOptionSelect("Sửa bài viết", post)}
                >
                  <Text style={{ padding: 10 }}>Sửa bài viết</Text>
                </MenuOption>
                <MenuOption
                  onSelect={() => handleMenuOptionSelect("Xóa bài viết", post)}
                >
                  <Text style={{ padding: 10, color: "red" }}>
                    Xóa bài viết
                  </Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>

          <View style={styles.postHeader}>
            <Image
              source={{ uri: post.imageUrl }}
              style={styles.miniProfileImage}
            />
            <View style={styles.headerTextContainer}>
              <Text style={styles.userName}>{post.userName}</Text>
              <View style={styles.userInfo}>
                <Icon name="checkmark-circle" size={14} color="#007AFF" />
                <Text> LacHongUniversity</Text>
              </View>
              <Text style={styles.postTime}>{post.time}</Text>
            </View>
          </View>

          <Text style={styles.postContent}>
            <Text style={{ fontWeight: "bold" }}>{post.title}</Text>
            {"\n"}
            {post.content}
          </Text>

          {post.imageUrl ? (
            <Image source={{ uri: post.imageUrl }} style={styles.postImage} />
          ) : null}

          <View style={styles.actions}>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="happy-outline" size={20} color="#6200EE" />
              <Text style={styles.actionText}>Cảm xúc</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="chatbubble-outline" size={20} color="#6200EE" />
              <Text style={styles.actionText}>Bình luận</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Icon name="share-outline" size={20} color="#6200EE" />
              <Text style={styles.actionText}>Chia sẻ</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {isEditing ? "Chỉnh sửa bài viết" : "Thêm bài viết mới"}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Tiêu đề"
              value={newPost.title}
              onChangeText={(text) => setNewPost({ ...newPost, title: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Nội dung"
              value={newPost.content}
              onChangeText={(text) => setNewPost({ ...newPost, content: text })}
              multiline
            />
            <TextInput
              style={styles.input}
              placeholder="URL Hình ảnh"
              value={newPost.imageUrl}
              onChangeText={(text) =>
                setNewPost({ ...newPost, imageUrl: text })
              }
            />
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Button
                title={isEditing ? "Cập nhật" : "Thêm"}
                onPress={handleSavePost}
              />
              <Button
                title="Đóng"
                onPress={() => setModalVisible(false)}
                color="red"
              />
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f0f2f5" },
  headerContainer: {
    alignItems: "center",
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  backgroundImage: { width: "100%", height: 180 },
  profileInfo: { alignItems: "center", marginTop: -50 },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
  },
  miniProfileImage: { width: 40, height: 40, borderRadius: 20 },
  profileName: { fontWeight: "bold", fontSize: 20, marginTop: 10 },
  friendCount: { color: "#555" },
  status: { color: "#888", marginVertical: 5 },
  postContainer: {
    marginVertical: 10,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 0,
  },
  header: { flexDirection: "row", justifyContent: "flex-end" },
  postHeader: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  headerTextContainer: { flex: 1, marginLeft: 10 },
  userName: { fontWeight: "bold", fontSize: 16 },
  userInfo: { flexDirection: "row", alignItems: "center" },
  postTime: { fontSize: 12, color: "#aaa" },
  postContent: { fontSize: 15, marginBottom: 10, lineHeight: 20 },
  postImage: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginVertical: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopWidth: 0.5,
    borderTopColor: "#eee",
    paddingTop: 10,
  },
  actionButton: { flexDirection: "row", alignItems: "center", gap: 5 },
  actionText: { fontSize: 13, color: "#555" },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 15,
    padding: 8,
  },
});
