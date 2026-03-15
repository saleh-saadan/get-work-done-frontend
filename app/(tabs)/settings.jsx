import {
  Bell,
  ChevronRight,
  Download,
  Globe,
  HelpCircle,
  LogOut,
  Moon,
  Palette,
  Shield,
  Sun,
  User,
  UserCheck
} from 'lucide-react-native';
import { useState } from 'react';
import { Alert, ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../hooks/useAuth';

export default function SettingsScreen() {
  const { theme, isDark, toggleTheme } = useTheme();
  const { user, loading, logout } = useAuth();
  const [settings, setSettings] = useState({
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
    { icon: <User size={22} color={theme.textSecondary} />, title: 'Account Settings', description: 'Manage your account details' },
    { icon: <Bell size={22} color={theme.textSecondary} />, title: 'Notifications', description: 'Customize notification preferences' },
    { icon: <Palette size={22} color={theme.textSecondary} />, title: 'Appearance', description: 'Theme and display settings' },
    { icon: <Globe size={22} color={theme.textSecondary} />, title: 'Language & Region', description: 'App language and regional settings' },
    { icon: <Shield size={22} color={theme.textSecondary} />, title: 'Privacy & Security', description: 'Data and security settings' },
    { icon: <Download size={22} color={theme.textSecondary} />, title: 'Data & Storage', description: 'Manage storage and backups' },
    { icon: <UserCheck size={22} color={theme.textSecondary} />, title: 'Accessibility', description: 'Accessibility features' },
    { icon: <HelpCircle size={22} color={theme.textSecondary} />, title: 'Help & Support', description: 'FAQ and contact support' },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', onPress: logout, style: 'destructive' }
      ]
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 16 }}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.text }}>Settings</Text>
          <Text style={{ color: theme.textSecondary, marginTop: 4 }}>Customize your GWD experience</Text>
        </View>

        {/* Profile Card */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <View style={{ backgroundColor: theme.card, borderRadius: 16, padding: 24, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: 64, height: 64, backgroundColor: theme.accent, borderRadius: 32, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ color: theme.background, fontSize: 24, fontWeight: 'bold' }}>
                  {user?.username?.charAt(0).toUpperCase() || 'U'}
                </Text>
              </View>
              <View style={{ flex: 1, marginLeft: 16 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.text }}>
                  {user?.first_name || user?.username || 'User'}
                </Text>
                <Text style={{ color: theme.textSecondary, marginTop: 2 }}>{user?.email || ''}</Text>
                <Text style={{ color: theme.accent, fontWeight: '500', marginTop: 4 }}>Friend ID: {user?.user_id || ''}</Text>
              </View>
            </View>
            <TouchableOpacity style={{ marginTop: 24, backgroundColor: theme.accentLight, paddingVertical: 12, borderRadius: 12, alignItems: 'center' }}>
              <Text style={{ color: theme.accent, fontWeight: '600' }}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Quick Settings */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.text, marginBottom: 16 }}>Quick Settings</Text>
          <View style={{ backgroundColor: theme.card, borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2 }}>
            {/* Theme Toggle */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: theme.border }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 40, height: 40, backgroundColor: theme.accentLight, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                  {isDark ? <Moon size={20} color={theme.accent} /> : <Sun size={20} color={theme.accent} />}
                </View>
                <View>
                  <Text style={{ fontWeight: '500', color: theme.text }}>Dark Mode</Text>
                  <Text style={{ color: theme.textSecondary, fontSize: 14 }}>Switch theme</Text>
                </View>
              </View>
              <Switch
                value={isDark}
                onValueChange={toggleTheme}
                trackColor={{ false: theme.border, true: theme.accent }}
                thumbColor={isDark ? theme.background : theme.background}
              />
            </View>

            {/* Global Sync */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: theme.border }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 40, height: 40, backgroundColor: theme.accentLight, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                  <Globe size={20} color={theme.accent} />
                </View>
                <View>
                  <Text style={{ fontWeight: '500', color: theme.text }}>Global Sync</Text>
                  <Text style={{ color: theme.textSecondary, fontSize: 14 }}>Sync across all devices</Text>
                </View>
              </View>
              <Switch
                value={settings.globalSync}
                onValueChange={() => toggleSetting('globalSync')}
                trackColor={{ false: theme.border, true: theme.accent }}
                thumbColor={settings.globalSync ? theme.background : theme.background}
              />
            </View>

            {/* Notifications */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ width: 40, height: 40, backgroundColor: theme.accentLight, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
                  <Bell size={20} color={theme.accent} />
                </View>
                <View>
                  <Text style={{ fontWeight: '500', color: theme.text }}>Notifications</Text>
                  <Text style={{ color: theme.textSecondary, fontSize: 14 }}>Task reminders and updates</Text>
                </View>
              </View>
              <Switch
                value={settings.notifications}
                onValueChange={() => toggleSetting('notifications')}
                trackColor={{ false: theme.border, true: theme.accent }}
                thumbColor={settings.notifications ? theme.background : theme.background}
              />
            </View>
          </View>
        </View>

        {/* Settings Menu */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.text, marginBottom: 16 }}>More Settings</Text>
          <View style={{ backgroundColor: theme.card, borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2 }}>
            {menuItems.map((item, index) => (
              <TouchableOpacity 
                key={index}
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: index < menuItems.length - 1 ? 1 : 0, borderBottomColor: theme.border }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                  {item.icon}
                  <View style={{ marginLeft: 12, flex: 1 }}>
                    <Text style={{ fontWeight: '500', color: theme.text }}>{item.title}</Text>
                    <Text style={{ color: theme.textSecondary, fontSize: 14, marginTop: 2 }}>{item.description}</Text>
                  </View>
                </View>
                <ChevronRight size={18} color={theme.textSecondary} />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* App Info */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <View style={{ backgroundColor: theme.card, borderRadius: 16, padding: 24, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2 }}>
            <Text style={{ fontSize: 32, fontWeight: 'bold', color: theme.text, marginBottom: 8 }}>GWD</Text>
            <Text style={{ color: theme.textSecondary, marginBottom: 4 }}>Get Work Done</Text>
            <Text style={{ color: theme.textSecondary, fontSize: 14, marginBottom: 24 }}>Version 2.1.4</Text>
            
            <View style={{ flexDirection: 'row', gap: 24 }}>
              <TouchableOpacity>
                <Text style={{ color: theme.accent, fontWeight: '500' }}>Privacy Policy</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{ color: theme.accent, fontWeight: '500' }}>Terms</Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{ color: theme.accent, fontWeight: '500' }}>Website</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <View style={{ paddingHorizontal: 24, paddingBottom: 40 }}>
          <TouchableOpacity 
            onPress={handleLogout}
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: theme.error + '20', paddingVertical: 16, borderRadius: 16 }}
          >
            <LogOut size={20} color={theme.error} />
            <Text style={{ color: theme.error, fontWeight: '600', marginLeft: 8 }}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}