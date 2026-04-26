import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { fetchPosts } from "./Api";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
      } catch (error) {
        Alert.alert("Opps!", "Có chút trục trặc khi kết nối, thử lại nhé!");
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const showPostDetails = (post) => {
    Alert.alert("🌟 Thông điệp cho bạn", post.body);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#10b981" />
        <Text style={styles.loadingText}>Đang khởi tạo năng lượng...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header rực rỡ năng lượng */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Chào ngày mới! 👋</Text>
          <Text style={styles.title}>Bảng Tin Tư Duy</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{posts.length} Bài viết</Text>
        </View>
      </View>

      <FlatList
        data={posts}
        contentContainerStyle={styles.listContent}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => showPostDetails(item)}
            style={styles.itemCard}
          >
            <View
              style={[
                styles.iconBox,
                { backgroundColor: index % 2 === 0 ? "#e0f2fe" : "#dcfce7" },
              ]}
            >
              <Text style={{ fontSize: 20 }}>
                {index % 2 === 0 ? "🚀" : "💡"}
              </Text>
            </View>

            <View style={styles.textContainer}>
              <Text numberOfLines={1} style={styles.itemTitle}>
                {item.title}
              </Text>
              <Text numberOfLines={1} style={styles.itemDescription}>
                Khám phá ngay để bứt phá giới hạn...
              </Text>
            </View>

            <View style={styles.arrowContainer}>
              <Text style={styles.arrow}>→</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6", // Nền xám cực nhẹ để các card trắng nổi lên
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  loadingText: {
    marginTop: 15,
    fontSize: 16,
    color: "#059669",
    fontWeight: "600",
  },
  header: {
    paddingHorizontal: 25,
    paddingVertical: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    // Đổ bóng nhẹ nhàng, thanh thoát
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 15,
    elevation: 5,
  },
  greeting: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
    marginBottom: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#111827",
  },
  badge: {
    backgroundColor: "#10b981",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  listContent: {
    padding: 20,
    paddingTop: 25,
  },
  itemCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    borderRadius: 24,
    backgroundColor: "#FFFFFF",
    marginBottom: 16,
    // Hiệu ứng card hiện đại
    shadowColor: "#312e81",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  iconBox: {
    width: 55,
    height: 55,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 5,
    textTransform: "capitalize",
  },
  itemDescription: {
    fontSize: 13,
    color: "#9CA3AF",
  },
  arrowContainer: {
    marginLeft: 10,
  },
  arrow: {
    fontSize: 20,
    color: "#D1D5DB",
    fontWeight: "300",
  },
});
