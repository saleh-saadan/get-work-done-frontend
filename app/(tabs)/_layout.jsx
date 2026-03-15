import { Tabs } from 'expo-router';
import { Home, Settings, User, Users } from 'lucide-react-native';
import { View } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function TabLayout() {
  const { theme } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.tabBarActive,
        tabBarInactiveTintColor: theme.tabBarInactive,
        tabBarStyle: {
          backgroundColor: theme.tabBar,
          borderTopWidth: 1,
          borderTopColor: theme.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
              <Home color={color} size={size} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="personal"
        options={{
          title: 'Personal',
          tabBarIcon: ({ color, size }) => (
            <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
              <User color={color} size={size} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="social"
        options={{
          title: 'Social',
          tabBarIcon: ({ color, size }) => (
            <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
              <Users color={color} size={size} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
              <Settings color={color} size={size} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}