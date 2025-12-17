// app/(tabs)/social.jsx
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users, Trophy, TrendingUp, UserPlus, MessageCircle, Heart } from 'lucide-react-native';

// Mock data
const friends = [
  { id: 1, name: 'Alex Johnson', score: 2450, tasksCompleted: 89, avatar: 'AJ' },
  { id: 2, name: 'Sarah Miller', score: 1980, tasksCompleted: 76, avatar: 'SM' },
  { id: 3, name: 'Mike Chen', score: 1870, tasksCompleted: 72, avatar: 'MC' },
  { id: 4, name: 'Emma Davis', score: 1760, tasksCompleted: 68, avatar: 'ED' },
  { id: 5, name: 'Ryan Wilson', score: 1620, tasksCompleted: 63, avatar: 'RW' },
];

const challenges = [
  { id: 1, title: '7-Day Streak Challenge', participants: 24, progress: 5, total: 7 },
  { id: 2, title: 'Weekend Productivity', participants: 18, progress: 1, total: 2 },
  { id: 3, title: 'Morning Routine', participants: 32, progress: 3, total: 5 },
];

export default function SocialScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-2xl font-bold text-gray-800">Social</Text>
              <Text className="text-gray-500 mt-1">Connect and compete with friends</Text>
            </View>
            <TouchableOpacity className="flex-row items-center bg-blue-500 px-4 py-2 rounded-full">
              <UserPlus size={18} color="white" />
              <Text className="text-white font-medium ml-2">Add Friend</Text>
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View className="flex-row justify-between mb-6">
            <View className="items-center">
              <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-2">
                <Users size={24} color="#3b82f6" />
              </View>
              <Text className="text-2xl font-bold text-gray-800">12</Text>
              <Text className="text-gray-500">Friends</Text>
            </View>
            <View className="items-center">
              <View className="w-16 h-16 bg-green-100 rounded-full items-center justify-center mb-2">
                <Trophy size={24} color="#10b981" />
              </View>
              <Text className="text-2xl font-bold text-gray-800">3rd</Text>
              <Text className="text-gray-500">Rank</Text>
            </View>
            <View className="items-center">
              <View className="w-16 h-16 bg-purple-100 rounded-full items-center justify-center mb-2">
                <TrendingUp size={24} color="#8b5cf6" />
              </View>
              <Text className="text-2xl font-bold text-gray-800">89%</Text>
              <Text className="text-gray-500">Efficiency</Text>
            </View>
          </View>
        </View>

        {/* Leaderboard */}
        <View className="px-6 mb-6">
          <Text className="text-xl font-bold text-gray-800 mb-4">Leaderboard</Text>
          <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {friends.map((friend, index) => (
              <View key={friend.id} className="border-b border-gray-100 last:border-b-0">
                <View className="flex-row items-center p-4">
                  <View className="w-10 items-center">
                    <View className={`w-8 h-8 rounded-full items-center justify-center ${
                      index === 0 ? 'bg-yellow-100' : 
                      index === 1 ? 'bg-gray-100' : 
                      index === 2 ? 'bg-orange-100' : 'bg-blue-50'
                    }`}>
                      <Text className={`font-bold ${
                        index === 0 ? 'text-yellow-600' : 
                        index === 1 ? 'text-gray-600' : 
                        index === 2 ? 'text-orange-600' : 'text-blue-600'
                      }`}>
                        {index + 1}
                      </Text>
                    </View>
                  </View>
                  <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center ml-2">
                    <Text className="text-blue-600 font-bold">{friend.avatar}</Text>
                  </View>
                  <View className="flex-1 ml-4">
                    <Text className="font-medium text-gray-800">{friend.name}</Text>
                    <Text className="text-gray-500 text-sm">{friend.tasksCompleted} tasks completed</Text>
                  </View>
                  <View className="items-end">
                    <Text className="font-bold text-gray-800">{friend.score}</Text>
                    <Text className="text-gray-500 text-sm">points</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Active Challenges */}
        <View className="px-6 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">Active Challenges</Text>
            <Text className="text-blue-500 font-medium">View All</Text>
          </View>

          <View className="space-y-4">
            {challenges.map((challenge) => (
              <TouchableOpacity key={challenge.id} className="bg-white rounded-2xl p-4 shadow-sm">
                <View className="flex-row justify-between items-start mb-3">
                  <Text className="font-medium text-gray-800 flex-1 mr-4">{challenge.title}</Text>
                  <View className="flex-row items-center">
                    <Users size={16} color="#6b7280" />
                    <Text className="text-gray-500 text-sm ml-1">{challenge.participants}</Text>
                  </View>
                </View>
                
                <View className="mb-3">
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-gray-500 text-sm">Progress</Text>
                    <Text className="text-gray-700 text-sm font-medium">
                      {challenge.progress}/{challenge.total} days
                    </Text>
                  </View>
                  <View className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <View 
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: `${(challenge.progress / challenge.total) * 100}%` }}
                    />
                  </View>
                </View>

                <View className="flex-row justify-between">
                  <TouchableOpacity className="flex-row items-center">
                    <Heart size={18} color="#ef4444" />
                    <Text className="text-gray-600 ml-1.5">Like</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-row items-center">
                    <MessageCircle size={18} color="#6b7280" />
                    <Text className="text-gray-600 ml-1.5">Discuss</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-blue-500 px-4 py-1.5 rounded-full">
                    <Text className="text-white font-medium text-sm">Join</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View className="px-6 mb-10">
          <Text className="text-xl font-bold text-gray-800 mb-4">Recent Activity</Text>
          <View className="bg-white rounded-2xl shadow-sm p-4">
            <View className="flex-row items-start mb-4">
              <View className="w-10 h-10 bg-green-100 rounded-full items-center justify-center">
                <Text className="text-green-600 font-bold">AJ</Text>
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-gray-800">
                  <Text className="font-semibold">Alex Johnson</Text> completed "Mobile App Design"
                </Text>
                <Text className="text-gray-400 text-sm mt-1">2 hours ago</Text>
              </View>
            </View>
            
            <View className="flex-row items-start mb-4">
              <View className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center">
                <Text className="text-purple-600 font-bold">SM</Text>
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-gray-800">
                  <Text className="font-semibold">Sarah Miller</Text> started a new challenge
                </Text>
                <Text className="text-gray-400 text-sm mt-1">4 hours ago</Text>
              </View>
            </View>
            
            <View className="flex-row items-start">
              <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center">
                <Text className="text-blue-600 font-bold">MC</Text>
              </View>
              <View className="flex-1 ml-3">
                <Text className="text-gray-800">
                  <Text className="font-semibold">Mike Chen</Text> reached 50-day streak! 🎉
                </Text>
                <Text className="text-gray-400 text-sm mt-1">1 day ago</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}