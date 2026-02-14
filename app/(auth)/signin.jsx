// app/(auth)/signin.jsx

import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiRequest, saveTokens } from '../../api.js';

export default function SignInScreen() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter username and password');
      return;
    }

    setLoading(true);
    try {
      const data = await apiRequest('/users/login/', 'POST', {
        username,
        password,
      }, false);

      await saveTokens(data.access, data.refresh);
      router.replace('/(tabs)');
    } catch (error) {
      Alert.alert('Login Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

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
              <Text className="text-gray-700 font-medium mb-2">Username</Text>
              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3.5 text-base"
                placeholder="Enter your username"
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
              />
            </View>

            <View>
              <Text className="text-gray-700 font-medium mb-2">Password</Text>
              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3.5 text-base"
                placeholder="Enter your password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <TouchableOpacity className="items-end">
              <Text className="text-blue-500 font-medium">Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          {/* Bottom Section */}
          <View className="flex-1 justify-end pb-10">
            <TouchableOpacity
              className={`bg-blue-500 py-4 rounded-xl items-center ${loading ? 'opacity-50' : ''}`}
              onPress={handleSignIn}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-lg font-semibold">Sign In</Text>
              )}
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