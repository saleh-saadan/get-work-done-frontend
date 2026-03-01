import { Tabs } from 'expo-router';
import { Text, View } from 'react-native';
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
              <Text style={{ color, fontSize: size * 0.7 }}>🏠</Text>
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
              <Text style={{ color, fontSize: size * 0.7 }}>👤</Text>
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
              <Text style={{ color, fontSize: size * 0.7 }}>👥</Text>
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
              <Text style={{ color, fontSize: size * 0.7 }}>⚙️</Text>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}