// app/(auth)/signup.jsx

import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useState } from 'react';
import { ActivityIndicator, Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiRequest, saveTokens } from '../../api';

export default function SignUpScreen() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    first_name: '',
    last_name: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSignUp = async () => {
    // Basic validation
    if (!form.username || !form.email || !form.password || !form.password2) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }
    if (form.password !== form.password2) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    console.log('Form data:', form); // add this
    setLoading(true);
    try {
      // Register user
      const registerData = await apiRequest('/users/register/', 'POST', {
        username: form.username,
        email: form.email,
        password: form.password,
        password2: form.password2,
        // first_name: form.first_name,
        // last_name: form.last_name,
      }, false); // no auth needed
    console.log('Register success:', registerData); // add this
      // After registration, log in to get tokens
      const loginData = await apiRequest('/users/login/', 'POST', {
        username: form.username,
        password: form.password,
      }, false);

      // Save tokens
      await saveTokens(loginData.access, loginData.refresh);

      // Navigate to main app
      router.replace('/(tabs)');
   } catch (error) {
  console.error('Signup error:', error);
  Alert.alert('Registration Failed', error.message);
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
          
          <Text className="text-3xl font-bold text-gray-800 mt-6">Create Account</Text>
          <Text className="text-gray-500 mt-2">Join GWD and boost your productivity</Text>
        </View>

        {/* Form */}
        <View className="flex-1 px-6 mt-10">
          <View className="space-y-6">
            <View>
              <Text className="text-gray-700 font-medium mb-2">Username *</Text>
              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3.5 text-base"
                placeholder="Enter username"
                autoCapitalize="none"
                value={form.username}
                onChangeText={(val) => handleChange('username', val)}
              />
            </View>

            <View>
              <Text className="text-gray-700 font-medium mb-2">Email *</Text>
              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3.5 text-base"
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={form.email}
                onChangeText={(val) => handleChange('email', val)}
              />
            </View>

            <View>
              <Text className="text-gray-700 font-medium mb-2">First Name</Text>
              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3.5 text-base"
                placeholder="Enter first name"
                value={form.first_name}
                onChangeText={(val) => handleChange('first_name', val)}
              />
            </View>

            <View>
              <Text className="text-gray-700 font-medium mb-2">Last Name</Text>
              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3.5 text-base"
                placeholder="Enter last name"
                value={form.last_name}
                onChangeText={(val) => handleChange('last_name', val)}
              />
            </View>

            <View>
              <Text className="text-gray-700 font-medium mb-2">Password *</Text>
              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3.5 text-base"
                placeholder="Create a password"
                secureTextEntry
                value={form.password}
                onChangeText={(val) => handleChange('password', val)}
              />
            </View>

            <View>
              <Text className="text-gray-700 font-medium mb-2">Confirm Password *</Text>
              <TextInput
                className="border border-gray-300 rounded-xl px-4 py-3.5 text-base"
                placeholder="Confirm your password"
                secureTextEntry
                value={form.password2}
                onChangeText={(val) => handleChange('password2', val)}
              />
            </View>
          </View>

          {/* Bottom Section */}
          <View className="flex-1 justify-end pb-10">
            <TouchableOpacity
              className={`bg-blue-500 py-4 rounded-xl items-center ${loading ? 'opacity-50' : ''}`}
              onPress={handleSignUp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white text-lg font-semibold">Create Account</Text>
              )}
            </TouchableOpacity>

            <View className="flex-row justify-center mt-6">
              <Text className="text-gray-500">Already have an account? </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/signin')}>
                <Text className="text-blue-500 font-medium">Sign In</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}