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
  Platform,
  Dimensions,
} from "react-native";
// Sử dụng Lucide để icon luôn hiển thị đẹp trên Web & Mobile
import {
  MoreVertical,
  CheckCircle2,
  Heart,
  MessageCircle,
  Share2,
  PlusCircle,
  XCircle,
  Image as ImageIcon,
} from "lucide-react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from "react-native-popup-menu";

const { width } = Dimensions.get("window");

const initialPosts = [
  {
    id: 1,
    userName: "Dâu Phà Mobile",
    title: "THỬ VUI VẺ - TẶNG Giftcode CHUNG",
    content:
      "Tự Nghĩa xin gửi tặng Đại hữu giftcode chung, Chúc các bạn vui vẻ!",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJGFZ6hh8Y2tkixhVgxINUVckXtG7qI53j6w&s",
    time: "3 giờ trước",
  },
  {
    id: 2,
    userName: "Nguyễn Văn A",
    title: "Chương Trình Khuyến Mãi",
    content: "Hãy tham gia chương trình khuyến mãi đặc biệt này!",
    imageUrl:
      "https://capthathinh.com/wp-content/uploads/2026/03/anh-dong-1.gif",
    time: "1 ngày trước",
  },
];

export default function App() {
  return (
    <MenuProvider>
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
    if (option === "Sửa") {
      setCurrentPost(post);
      setNewPost({
        title: post.title,
        content: post.content,
        imageUrl: post.imageUrl,
      });
      setIsEditing(true);
      setModalVisible(true);
    } else {
      Alert.alert("Xác nhận", "Xóa bài viết này?", [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          onPress: () => setPosts(posts.filter((p) => p.id !== post.id)),
        },
      ]);
    }
  };

  const handleSavePost = () => {
    if (!newPost.title || !newPost.content)
      return Alert.alert("Lỗi", "Vui lòng nhập đủ thông tin!");

    if (isEditing) {
      setPosts(
        posts.map((p) => (p.id === currentPost.id ? { ...p, ...newPost } : p)),
      );
    } else {
      setPosts([
        { id: Date.now(), userName: "Admin", ...newPost, time: "Vừa xong" },
        ...posts,
      ]);
    }
    setModalVisible(false);
    setNewPost({ title: "", content: "", imageUrl: "" });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Profile Section */}
        <View style={styles.headerCard}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2029&auto=format&fit=crop",
            }}
            style={styles.backgroundImage}
          />
          <View style={styles.profileWrapper}>
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0-YgVdKbBY6pgq8wR7d9gh0uTXXdavIz7Vw&s",
                }}
                style={styles.profileImage}
              />
            </View>
            <Text style={styles.profileName}>Lạc Hồng Student</Text>
            <Text style={styles.friendCount}>
              ✨ 1,240 Followers • 362 Friends
            </Text>

            <TouchableOpacity
              style={styles.createBtn}
              onPress={() => {
                setIsEditing(false);
                setModalVisible(true);
              }}
            >
              <PlusCircle color="#fff" size={20} />
              <Text style={styles.createBtnText}>Đăng bài mới</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Posts List */}
        <View style={styles.feedContainer}>
          {posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <View style={styles.postHeader}>
                <Image
                  source={{ uri: `https://i.pravatar.cc/150?u=${post.id}` }}
                  style={styles.miniAvatar}
                />
                <View style={styles.headerInfo}>
                  <View style={styles.nameRow}>
                    <Text style={styles.userName}>{post.userName}</Text>
                    <CheckCircle2
                      size={14}
                      color="#007AFF"
                      style={{ marginLeft: 4 }}
                    />
                  </View>
                  <Text style={styles.postTime}>{post.time} • 🌎</Text>
                </View>
                <Menu>
                  <MenuTrigger>
                    <MoreVertical size={20} color="#636E72" />
                  </MenuTrigger>
                  <MenuOptions
                    customStyles={{ optionsContainer: styles.menuPopup }}
                  >
                    <MenuOption
                      onSelect={() => handleMenuOptionSelect("Sửa", post)}
                      text="Sửa bài viết"
                    />
                    <MenuOption
                      onSelect={() => handleMenuOptionSelect("Xóa", post)}
                    >
                      <Text style={{ color: "#FF5E5E", padding: 10 }}>
                        Xóa bài viết
                      </Text>
                    </MenuOption>
                  </MenuOptions>
                </Menu>
              </View>

              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postContent}>{post.content}</Text>

              {post.imageUrl && (
                <Image
                  source={{ uri: post.imageUrl }}
                  style={styles.postImage}
                  resizeMode="cover"
                />
              )}

              <View style={styles.divider} />

              <View style={styles.postActions}>
                <TouchableOpacity style={styles.actionItem}>
                  <Heart size={20} color="#FF4757" />
                  <Text style={styles.actionLabel}>Thích</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem}>
                  <MessageCircle size={20} color="#2F3542" />
                  <Text style={styles.actionLabel}>Bình luận</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionItem}>
                  <Share2 size={20} color="#2F3542" />
                  <Text style={styles.actionLabel}>Chia sẻ</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Modern Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBody}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                {isEditing ? "Chỉnh sửa" : "Tạo bài viết"}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <XCircle size={24} color="#B2BEC3" />
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.modernInput}
              placeholder="Tiêu đề ấn tượng..."
              value={newPost.title}
              onChangeText={(t) => setNewPost({ ...newPost, title: t })}
            />
            <TextInput
              style={[styles.modernInput, { height: 100 }]}
              placeholder="Bạn đang nghĩ gì?"
              multiline
              value={newPost.content}
              onChangeText={(t) => setNewPost({ ...newPost, content: t })}
            />
            <View style={styles.urlInputContainer}>
              <ImageIcon size={18} color="#6C63FF" />
              <TextInput
                style={styles.urlInput}
                placeholder="Dán link ảnh tại đây..."
                value={newPost.imageUrl}
                onChangeText={(t) => setNewPost({ ...newPost, imageUrl: t })}
              />
            </View>

            <TouchableOpacity style={styles.submitBtn} onPress={handleSavePost}>
              <Text style={styles.submitBtnText}>
                {isEditing ? "Cập nhật ngay" : "Đăng bài ngay"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FD" },
  headerCard: {
    backgroundColor: "#fff",
    paddingBottom: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  backgroundImage: { width: "100%", height: 200 },
  profileWrapper: { alignItems: "center", marginTop: -60 },
  avatarContainer: {
    padding: 5,
    backgroundColor: "#fff",
    borderRadius: 60,
    elevation: 10,
  },
  profileImage: { width: 110, height: 110, borderRadius: 55 },
  profileName: {
    fontSize: 24,
    fontWeight: "800",
    color: "#2D3436",
    marginTop: 15,
  },
  friendCount: { color: "#636E72", fontSize: 14, marginTop: 5 },
  createBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6C63FF",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    marginTop: 20,
    elevation: 3,
  },
  createBtnText: { color: "#fff", fontWeight: "bold", marginLeft: 8 },

  feedContainer: { padding: 15 },
  postCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 3,
  },
  postHeader: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  miniAvatar: { width: 45, height: 45, borderRadius: 15 },
  headerInfo: { flex: 1, marginLeft: 12 },
  nameRow: { flexDirection: "row", alignItems: "center" },
  userName: { fontWeight: "bold", fontSize: 16, color: "#2D3436" },
  postTime: { fontSize: 12, color: "#B2BEC3", marginTop: 2 },

  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2D3436",
    marginBottom: 5,
  },
  postContent: { fontSize: 15, color: "#636E72", lineHeight: 22 },
  postImage: { width: "100%", height: 250, borderRadius: 15, marginTop: 15 },

  divider: { height: 1, backgroundColor: "#F1F2F6", marginVertical: 15 },
  postActions: { flexDirection: "row", justifyContent: "space-around" },
  actionItem: { flexDirection: "row", alignItems: "center", gap: 6 },
  actionLabel: { fontSize: 14, color: "#2F3542", fontWeight: "600" },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalBody: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  modalTitle: { fontSize: 22, fontWeight: "900", color: "#2D3436" },
  modernInput: {
    backgroundColor: "#F8F9FD",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#EDF1F7",
  },
  urlInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FD",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 25,
  },
  urlInput: { flex: 1, padding: 15, fontSize: 14 },
  submitBtn: {
    backgroundColor: "#6C63FF",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
  },
  submitBtnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  menuPopup: { borderRadius: 12, padding: 5, width: 150 },
});
