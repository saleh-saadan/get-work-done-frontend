// app/(auth)/welcome.jsx
import { useRouter } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6 pt-10">
        {/* Logo/Header */}
        <View className="items-center mt-10">
          <View className="w-20 h-20 bg-blue-500 rounded-2xl items-center justify-center mb-6">
            <Text className="text-white text-2xl font-bold">GWD</Text>
          </View>
          <Text className="text-4xl font-bold text-gray-800 mb-2">Get Work Done</Text>
          <Text className="text-lg text-gray-500 text-center">
            Collaborate, achieve, and stay productive with friends
          </Text>
        </View>

        {/* Illustration */}
        <View className="flex-1 items-center justify-center">
          <View className="w-72 h-72 bg-blue-50 rounded-full items-center justify-center">
            <View className="w-60 h-60 bg-blue-100 rounded-full items-center justify-center">
              <Text className="text-6xl">✅</Text>
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View className="pb-10 space-y-4">
         <TouchableOpacity
          className="bg-blue-500 py-4 rounded-xl items-center"
          onPress={() => router.push('/(auth)/signin')} // changed from '/(tabs)/home'
        >
          <Text className="text-white text-lg font-semibold">Sign In</Text>
        </TouchableOpacity>
          
          <TouchableOpacity
            className="border-2 border-blue-500 py-4 rounded-xl items-center"
            onPress={() => router.push('/(auth)/signup')}
          >
            <Text className="text-blue-500 text-lg font-semibold">Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}