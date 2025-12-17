// app/(tabs)/settings.jsx
import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
  User, Bell, Moon, Globe, Shield, HelpCircle, 
  LogOut, ChevronRight, Palette, Download, UserCheck 
} from 'lucide-react-native';

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    globalSync: true,
    biometricLogin: false,
    autoBackup: true,
    compactView: false,
  });

  const toggleSetting = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const menuItems = [
    { icon: <User size={22} color="#4b5563" />, title: 'Account Settings', description: 'Manage your account details' },
    { icon: <Bell size={22} color="#4b5563" />, title: 'Notifications', description: 'Customize notification preferences' },
    { icon: <Palette size={22} color="#4b5563" />, title: 'Appearance', description: 'Theme and display settings' },
    { icon: <Globe size={22} color="#4b5563" />, title: 'Language & Region', description: 'App language and regional settings' },
    { icon: <Shield size={22} color="#4b5563" />, title: 'Privacy & Security', description: 'Data and security settings' },
    { icon: <Download size={22} color="#4b5563" />, title: 'Data & Storage', description: 'Manage storage and backups' },
    { icon: <UserCheck size={22} color="#4b5563" />, title: 'Accessibility', description: 'Accessibility features' },
    { icon: <HelpCircle size={22} color="#4b5563" />, title: 'Help & Support', description: 'FAQ and contact support' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <Text className="text-2xl font-bold text-gray-800">Settings</Text>
          <Text className="text-gray-500 mt-1">Customize your GWD experience</Text>
        </View>

        {/* Profile Card */}
        <View className="px-6 mb-6">
          <View className="bg-white rounded-2xl p-6 shadow-sm">
            <View className="flex-row items-center">
              <View className="w-16 h-16 bg-blue-500 rounded-full items-center justify-center">
                <Text className="text-white text-2xl font-bold">JD</Text>
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-xl font-bold text-gray-800">John Doe</Text>
                <Text className="text-gray-500">john.doe@example.com</Text>
                <Text className="text-blue-500 font-medium mt-1">Premium Member</Text>
              </View>
            </View>
            <TouchableOpacity className="mt-6 bg-blue-50 py-3 rounded-xl items-center">
              <Text className="text-blue-600 font-semibold">Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Settings */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">Quick Settings</Text>
          <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Dark Mode */}
            <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-purple-100 rounded-lg items-center justify-center mr-3">
                  <Moon size={20} color="#8b5cf6" />
                </View>
                <View>
                  <Text className="font-medium text-gray-800">Dark Mode</Text>
                  <Text className="text-gray-500 text-sm">Use dark theme</Text>
                </View>
              </View>
              <Switch
                value={settings.darkMode}
                onValueChange={() => toggleSetting('darkMode')}
                trackColor={{ false: '#d1d5db', true: '#8b5cf6' }}
                thumbColor={settings.darkMode ? '#ffffff' : '#ffffff'}
              />
            </View>

            {/* Global Compatibility */}
            <View className="flex-row items-center justify-between p-4 border-b border-gray-100">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-green-100 rounded-lg items-center justify-center mr-3">
                  <Globe size={20} color="#10b981" />
                </View>
                <View>
                  <Text className="font-medium text-gray-800">Global Sync</Text>
                  <Text className="text-gray-500 text-sm">Sync across all devices</Text>
                </View>
              </View>
              <Switch
                value={settings.globalSync}
                onValueChange={() => toggleSetting('globalSync')}
                trackColor={{ false: '#d1d5db', true: '#10b981' }}
                thumbColor={settings.globalSync ? '#ffffff' : '#ffffff'}
              />
            </View>

            {/* Notifications */}
            <View className="flex-row items-center justify-between p-4">
              <View className="flex-row items-center">
                <View className="w-10 h-10 bg-blue-100 rounded-lg items-center justify-center mr-3">
                  <Bell size={20} color="#3b82f6" />
                </View>
                <View>
                  <Text className="font-medium text-gray-800">Notifications</Text>
                  <Text className="text-gray-500 text-sm">Task reminders and updates</Text>
                </View>
              </View>
              <Switch
                value={settings.notifications}
                onValueChange={() => toggleSetting('notifications')}
                trackColor={{ false: '#d1d5db', true: '#3b82f6' }}
                thumbColor={settings.notifications ? '#ffffff' : '#ffffff'}
              />
            </View>
          </View>
        </View>

        {/* Settings Menu */}
        <View className="px-6 mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-4">More Settings</Text>
          <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {menuItems.map((item, index) => (
              <TouchableOpacity 
                key={index}
                className="flex-row items-center justify-between p-4 border-b border-gray-100 last:border-b-0"
              >
                <View className="flex-row items-center flex-1">
                  {item.icon}
                  <View className="ml-3 flex-1">
                    <Text className="font-medium text-gray-800">{item.title}</Text>
                    <Text className="text-gray-500 text-sm mt-0.5">{item.description}</Text>
                  </View>
                </View>
                <ChevronRight size={18} color="#9ca3af" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* App Info */}
        <View className="px-6 mb-6">
          <View className="bg-white rounded-2xl p-6 shadow-sm items-center">
            <Text className="text-4xl font-bold text-gray-800 mb-2">GWD</Text>
            <Text className="text-gray-500 mb-1">Get Work Done</Text>
            <Text className="text-gray-400 text-sm mb-6">Version 2.1.4</Text>
            
            <View className="flex-row space-x-6">
              <TouchableOpacity className="items-center">
                <Text className="text-blue-500 font-medium">Privacy Policy</Text>
              </TouchableOpacity>
              <TouchableOpacity className="items-center">
                <Text className="text-blue-500 font-medium">Terms of Service</Text>
              </TouchableOpacity>
              <TouchableOpacity className="items-center">
                <Text className="text-blue-500 font-medium">Website</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <View className="px-6 pb-10">
          <TouchableOpacity className="flex-row items-center justify-center bg-red-50 py-4 rounded-2xl">
            <LogOut size={20} color="#ef4444" />
            <Text className="text-red-600 font-semibold ml-2">Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}