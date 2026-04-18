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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
        activeOpacity={0.7}
        style={styles.contactCard}
        onPress={() => editContact(index)}
      >
        <View style={styles.leftSection}>
          <View
            style={[
              styles.avatar,
              { backgroundColor: index % 2 === 0 ? "#6366f1" : "#ec4899" },
            ]}
          >
            <Text style={styles.avatarText}>
              {(item.name || "?").trim().charAt(0).toUpperCase()}
            </Text>
          </View>

          <View style={styles.contactInfo}>
            <Text style={styles.contactName} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={styles.contactNumber}>{item.phoneNumber}</Text>
          </View>
        </View>

        <View style={styles.cardActions}>
          <TouchableOpacity
            style={styles.iconCircleEdit}
            onPress={() => editContact(index)}
          >
            <Text style={styles.miniIcon}>✎</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconCircleDelete}
            onPress={() => deleteContact(index)}
          >
            <Text style={styles.miniIcon}>✕</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Danh bạ</Text>
          <Text style={styles.headerSubtitle}>
            {contacts.length} người liên hệ
          </Text>
        </View>
        <View style={styles.headerAccent} />
      </View>

      <FlatList
        data={contacts}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyTitle}>Trống trải quá...</Text>
            <Text style={styles.emptyText}>
              Hãy bắt đầu kết nối bằng cách thêm liên hệ mới!
            </Text>
          </View>
        }
      />

      <TouchableOpacity
        activeOpacity={0.9}
        style={styles.fab}
        onPress={() => navigation.navigate("AddContact")}
      >
        <Text style={styles.fabIcon}>+</Text>
        <Text style={styles.fabText}>Thêm mới</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "900",
    color: "#0F172A",
    letterSpacing: -1,
  },
  headerSubtitle: {
    color: "#64748B",
    fontSize: 16,
    fontWeight: "500",
  },
  headerAccent: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E2E8F0",
    borderWidth: 4,
    borderColor: "#FFF",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    flexGrow: 1,
  },
  cardWrapper: {
    // Tạo bóng mờ diện rộng cho Card
    shadowColor: "#6366f1",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  contactCard: {
    marginBottom: 16,
    borderRadius: 24,
    backgroundColor: "#ffffff",
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    // Hiệu ứng Glass cho avatar
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: "800",
    color: "#ffffff",
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 2,
  },
  contactNumber: {
    fontSize: 14,
    color: "#94A3B8",
    fontWeight: "500",
  },
  cardActions: {
    flexDirection: "row",
    gap: 8,
  },
  iconCircleEdit: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  iconCircleDelete: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#FFF1F2",
    alignItems: "center",
    justifyContent: "center",
  },
  miniIcon: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#475569",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  emptyIcon: { fontSize: 80, marginBottom: 20 },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#334155",
  },
  emptyText: {
    marginTop: 10,
    fontSize: 15,
    color: "#94A3B8",
    textAlign: "center",
    paddingHorizontal: 40,
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 30,
    backgroundColor: "#0F172A", // Màu đen Midnight hiện đại
    borderRadius: 30,
    paddingHorizontal: 25,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  fabIcon: {
    color: "#FFF",
    fontSize: 24,
    marginRight: 8,
    fontWeight: "300",
  },
  fabText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default ContactList;
