import { Text, View } from "react-native";

export default function Index() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-100">
      <View className="bg-white rounded-xl p-4">
        <Text className="text-lg font-medium text-gray-900">
          Welcome to Tailwind + Expo
        </Text>
      </View>
    </View>
  );
}