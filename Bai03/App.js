import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CheckboxRadioButton from './CheckboxRadioButton';
import FlatListSectionList from './FlatListSectionList';
import ModalExample from './ModalActivityIndicator';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Inputs') iconName = 'checkbox-marked-circle-outline';
            else if (route.name === 'Lists') iconName = 'format-list-bulleted';
            else if (route.name === 'Alerts') iconName = 'bell-outline';
            return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6200ee',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { height: 60, paddingBottom: 10 },
          headerStyle: { backgroundColor: '#6200ee' },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        })}
      >
        <Tab.Screen name="Inputs" component={CheckboxRadioButton} options={{ title: 'Cài đặt' }} />
        <Tab.Screen name="Lists" component={FlatListSectionList} options={{ title: 'Thực đơn' }} />
        <Tab.Screen name="Alerts" component={ModalExample} options={{ title: 'Thông báo' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}