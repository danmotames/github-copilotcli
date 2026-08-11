import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Search, Plus, Heart, User } from 'lucide-react-native';
import HomeScreen from './pages/HomePage';
import SearchScreen from './pages/SearchPage';
import RecommendScreen from './pages/RecommendPage';
import ProvidersScreen from './pages/ProvidersPage';
import ProfileScreen from './pages/ProfilePage';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator screenOptions={{ tabBarActiveTintColor: '#3b82f6', tabBarInactiveTintColor: '#9ca3af', headerShown: false }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Início', tabBarIcon: ({ color, size }) => <Home color={color} size={size} /> }} />
        <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarLabel: 'Buscar', tabBarIcon: ({ color, size }) => <Search color={color} size={size} /> }} />
        <Tab.Screen name="Recommend" component={RecommendScreen} options={{ tabBarLabel: 'Recomendar', tabBarIcon: ({ color, size }) => <Plus color={color} size={size} /> }} />
        <Tab.Screen name="Providers" component={ProvidersScreen} options={{ tabBarLabel: 'Prestadores', tabBarIcon: ({ color, size }) => <Heart color={color} size={size} /> }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Perfil', tabBarIcon: ({ color, size }) => <User color={color} size={size} /> }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
