import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Alert,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const ContactList = ({ navigation }) => {
  const [contacts, setContacts] = useState([]);

  const loadContacts = async () => {
    try {
      const storedContacts = await AsyncStorage.getItem("contacts");
      if (storedContacts) {
        setContacts(JSON.parse(storedContacts));
        return;
      }
      setContacts([]);
    } catch (error) {
      console.error("Error loading contacts", error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadContacts();
    });
    return unsubscribe;
  }, [navigation]);

  const editContact = (index) => {
    const contact = contacts[index];
    navigation.navigate("AddContact", { contact, index });
  };

  const performDelete = async (index) => {
    const updatedContacts = contacts.filter((_, i) => i !== index);
    setContacts(updatedContacts);
    await AsyncStorage.setItem("contacts", JSON.stringify(updatedContacts));
  };

  const deleteContact = (index) => {
    const contact = contacts[index];
    const message = `Bạn thực sự muốn xóa ${contact.name}?`;

    if (Platform.OS === "web") {
      const confirmed = window.confirm(message);
      if (confirmed) performDelete(index);
    } else {
      Alert.alert(
        "Xác nhận xóa",
        message,
        [
          { text: "Hủy", style: "cancel" },
          {
            text: "Xóa ngay",
            style: "destructive",
            onPress: () => performDelete(index),
          },
        ],
        { cancelable: true },
      );
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.cardWrapper}>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.contactCard}
        onPress={() => editContact(index)}
      >
        <View style={styles.leftSection}>
          <View
            style={[
              styles.avatar,
              {
                // Sử dụng màu gradient nhẹ nhàng
                backgroundColor: index % 2 === 0 ? "#FFDEE9" : "#D5EEFF",
                borderColor: index % 2 === 0 ? "#FF9A8B" : "#A1C4FD",
                borderWidth: 2,
              },
            ]}
          >
            <Text
              style={[
                styles.avatarText,
                { color: index % 2 === 0 ? "#FB7185" : "#3B82F6" },
              ]}
            >
              {(item.name || "?").trim().charAt(0).toUpperCase()}
            </Text>
          </View>

          <View style={styles.contactInfo}>
            <Text style={styles.contactName} numberOfLines={1}>
              {item.name}
            </Text>
            <View style={styles.phoneBadge}>
              <Text style={styles.contactNumber}>📞 {item.phoneNumber}</Text>
            </View>
          </View>
        </View>

        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => editContact(index)}
          >
            <Text style={styles.actionIcon}>✨</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#FFE4E6" }]}
            onPress={() => deleteContact(index)}
          >
            <Text style={styles.actionIcon}>🗑️</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Các hình khối decor tạo độ lung linh */}
      <View style={styles.decorCircle1} />
      <View style={styles.decorCircle2} />

      <View style={styles.header}>
        <View>
          <Text style={styles.headerSubtitle}>Chào ngày mới!</Text>
          <Text style={styles.headerTitle}>Kết nối ✨</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{contacts.length}</Text>
          <Text style={styles.statLabel}>Bạn bè</Text>
        </View>
      </View>

      <FlatList
        data={contacts}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>🌈</Text>
            <Text style={styles.emptyTitle}>Sẵn sàng kết nối?</Text>
            <Text style={styles.emptyText}>
              Danh bạ của bạn đang chờ những gương mặt mới rạng rỡ!
            </Text>
          </View>
        }
      />

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.fab}
        onPress={() => navigation.navigate("AddContact")}
      >
        <View style={styles.fabContent}>
          <Text style={styles.fabIcon}>🚀</Text>
          <Text style={styles.fabText}>THÊM BẠN MỚI</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFCFE", // Trắng hơi ánh tím nhẹ
  },
  // Decor Elements
  decorCircle1: {
    position: "absolute",
    top: -40,
    right: -20,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFEDD5",
    opacity: 0.6,
  },
  decorCircle2: {
    position: "absolute",
    bottom: 100,
    left: -30,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E0E7FF",
    opacity: 0.6,
  },
  header: {
    paddingHorizontal: 28,
    paddingTop: 30,
    paddingBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  headerSubtitle: {
    color: "#818CF8",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  headerTitle: {
    fontSize: 38,
    fontWeight: "900",
    color: "#1E1B4B",
    marginTop: 4,
  },
  statBox: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 18,
    alignItems: "center",
    minWidth: 70,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "800",
    color: "#6366F1",
  },
  statLabel: {
    fontSize: 10,
    color: "#94A3B8",
    fontWeight: "700",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    flexGrow: 1,
  },
  cardWrapper: {
    shadowColor: "#818CF8",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  contactCard: {
    marginBottom: 18,
    borderRadius: 30, // Bo tròn cực đại
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.8)",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 62,
    height: 62,
    borderRadius: 22, // Bo vuông tròn hiện đại
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 26,
    fontWeight: "900",
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 19,
    fontWeight: "800",
    color: "#334155",
    marginBottom: 4,
  },
  phoneBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#F8FAFC",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },
  contactNumber: {
    fontSize: 13,
    color: "#64748B",
    fontWeight: "600",
  },
  cardActions: {
    flexDirection: "row",
    gap: 10,
  },
  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 15,
    backgroundColor: "#F0F9FF",
    alignItems: "center",
    justifyContent: "center",
  },
  actionIcon: {
    fontSize: 18,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },
  emptyIcon: { fontSize: 90, marginBottom: 20 },
  emptyTitle: {
    fontSize: 24,
    fontWeight: "900",
    color: "#475569",
    textAlign: "center",
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: "#94A3B8",
    textAlign: "center",
    paddingHorizontal: 40,
    lineHeight: 22,
  },
  fab: {
    position: "absolute",
    alignSelf: "center",
    bottom: 30,
    borderRadius: 35,
    overflow: "hidden",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  fabContent: {
    backgroundColor: "#6366F1",
    paddingHorizontal: 30,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  fabIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  fabText: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 15,
    letterSpacing: 1,
  },
});

export default ContactList;
