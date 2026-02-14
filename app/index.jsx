// app/index.jsx

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

export default function Index() {
  const router = useRouter();

useEffect(() => {
  const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        router.replace('/(tabs)');
      } else {
        router.replace('/(auth)/welcome');
      }
    } catch (error) {
      console.error('Auth check error:', error);
      // Still go to welcome if something fails
      router.replace('/(auth)/welcome');
    }
  };

  // Remove setTimeout for now, just call directly
  checkAuth();
}, []);

  return (
    <View className="flex-1 items-center justify-center bg-blue-500">
      <View className="items-center">
        <View className="w-24 h-24 bg-white rounded-2xl items-center justify-center mb-6">
          <Text className="text-4xl">✅</Text>
        </View>
        <ActivityIndicator size="large" color="#ffffff" />
        <Text className="text-white text-xl font-bold mt-4">GWD</Text>
        <Text className="text-white text-opacity-90">Get Work Done</Text>
      </View>
    </View>
  );
}