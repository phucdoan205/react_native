import React from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'; // Import từ thư viện mới
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Gộp tất cả dữ liệu vào một cấu trúc Section duy nhất
const ALL_DATA = [
  {
    title: 'Hồ sơ người dùng',
    iconHeader: 'account-circle',
    data: ['Thông tin cá nhân', 'Lịch sử đơn hàng', 'Ví điện tử'],
    type: 'profile'
  },
  {
    title: 'Món chính',
    iconHeader: 'food-variant',
    data: ['Phở bò đặc biệt', 'Bún chả Hà Nội', 'Cơm tấm Sài Gòn'],
    type: 'food'
  },
  {
    title: 'Món tráng miệng',
    iconHeader: 'ice-cream',
    data: ['Chè khúc bạch', 'Bánh flan trà xanh', 'Kem bơ'],
    type: 'food'
  },
];

const FlatListSectionList = () => {

  const renderItem = ({ item, section }) => (
    <TouchableOpacity 
      style={styles.listItem} 
      onPress={() => alert(`Bạn đã chọn: ${item}`)}
    >
      <View style={styles.iconCircle}>
        <MaterialCommunityIcons 
          name={section.type === 'profile' ? "account-outline" : "food"} 
          size={20} 
          color="#6200ee" 
        />
      </View>
      <Text style={styles.itemText}>{item}</Text>
      <MaterialCommunityIcons name="chevron-right" size={24} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <SectionList
        sections={ALL_DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title, iconHeader } }) => (
          <View style={styles.headerContainer}>
            <MaterialCommunityIcons name={iconHeader} size={22} color="#6200ee" />
            <Text style={styles.subHeader}>{title}</Text>
          </View>
        )}
        contentContainerStyle={styles.listPadding} // Tạo khoảng trống ở cuối để không bị che bởi TabBar
        stickySectionHeadersEnabled={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  listPadding: {
    padding: 16,
    paddingBottom: 100, // Quan trọng: Đảm bảo cuộn hết không bị TabBar che mất
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 4,
  },
  subHeader: {
    fontWeight: '700',
    fontSize: 18,
    color: '#333',
    marginLeft: 8,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 6,
    borderRadius: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 5,
    borderLeftColor: '#6200ee',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0e6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemText: {
    flex: 1,
    fontSize: 16,
    color: '#444',
    fontWeight: '500',
  },
});

export default FlatListSectionList;