// app/index.jsx
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, ActivityIndicator, Text } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // For now, redirect to welcome screen
    // Later, you can add auth logic here
    const timer = setTimeout(() => {
      router.replace('/(auth)/welcome');
    }, 1000);

    return () => clearTimeout(timer);
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