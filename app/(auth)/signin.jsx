// app/(auth)/signin.jsx
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

export default function SignInScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header */}
        <View className="px-6 pt-4">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center"
          >
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          
          <Text className="text-3xl font-bold text-gray-800 mt-6">Welcome Back</Text>
          <Text className="text-gray-500 mt-2">Sign in to continue to GWD</Text>
        </View>

        {/* Form */}
        <View className="flex-1 px-6 mt-10">
          <View className="space-y-6">
            <View>
              <Text className="text-gray-700 font-medium mb-2">Email</Text>
              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3.5 text-base"
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View>
              <Text className="text-gray-700 font-medium mb-2">Password</Text>
              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3.5 text-base"
                placeholder="Enter your password"
                secureTextEntry
              />
            </View>

            <TouchableOpacity className="items-end">
              <Text className="text-blue-500 font-medium">Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Section */}
          <View className="flex-1 justify-end pb-10">
            <TouchableOpacity
              className="bg-blue-500 py-4 rounded-xl items-center"
              onPress={() => router.replace('/(tabs)')}
            >
              <Text className="text-white text-lg font-semibold">Sign In</Text>
            </TouchableOpacity>

            <View className="flex-row justify-center mt-6">
              <Text className="text-gray-500">Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
                <Text className="text-blue-500 font-medium">Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}