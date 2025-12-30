import React, { useState, useEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import FoodList from './FoodList'; // Import FoodList component

const Drawer = createDrawerNavigator();

// --- Màn hình Đăng nhập ---
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setTimeout(async () => {
      if (email === 'user@example.com' && password === 'password') {
        const token = 'your_jwt_token_here';
        try {
          await AsyncStorage.setItem('@jwt_token', token);
          Alert.alert('Login Successful', 'You have successfully logged in!');
          setIsLoading(false);
          navigation.reset({ index: 0, routes: [{ name: 'Home' }] });
        } catch (error) {
          console.error('Failed to save token:', error);
          setIsLoading(false);
        }
      } else {
        Alert.alert('Login Failed', 'Invalid email or password');
        setIsLoading(false);
      }
    }, 2000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
    </View>
  );
};

// --- Màn hình Chính ---
const HomeScreen = ({ navigation }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('@jwt_token');
        setToken(storedToken);
      } catch (error) {
        console.error('Failed to fetch token:', error);
      }
    };
    fetchToken();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('@jwt_token');
      Alert.alert('Logout Successful', 'You have logged out!');
      navigation.navigate('Login');
    } catch (error) {
      console.error('Failed to remove token:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      {token ? (
        <>
          <Text>JWT Token: {token}</Text>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>No token found. Please log in.</Text>
      )}
    </View>
  );
};

// --- Màn hình Yêu thích ---
const FavoritesScreen = () => (
  <View style={styles.screen}>
    <Text style={styles.title}>Favorites</Text>
    <FoodList />
  </View>
);

// --- Màn hình Lịch sử ---
const HistoryScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>History</Text>
    <Text>This is the History Screen</Text>
  </View>
);

// --- Tùy chọn biểu tượng cho Drawer ---
const screenOptions = (iconName) => ({
  drawerIcon: ({ color }) => <Icon name={iconName} size={22} color={color} />,
});

// --- Main App Navigator ---
const AppNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Login"
      screenOptions={{
        drawerStyle: { backgroundColor: '#282c34' },
        drawerActiveTintColor: '#61dafb',
        drawerInactiveTintColor: '#ffffff',
        headerStyle: { backgroundColor: '#282c34' },
        headerTintColor: '#ffffff',
      }}
    >
      <Drawer.Screen name="Login" component={LoginScreen} options={screenOptions('log-in')} />
      <Drawer.Screen name="Home" component={HomeScreen} options={screenOptions('home-outline')} />
      <Drawer.Screen name="Favorites" component={FavoritesScreen} options={screenOptions('heart-outline')} />
      <Drawer.Screen name="History" component={HistoryScreen} options={screenOptions('time-outline')} />
    </Drawer.Navigator>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  logoutButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff6b6b',
    borderRadius: 8,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AppNavigator;