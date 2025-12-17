// app/(tabs)/home.jsx
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle, Circle, Clock, TrendingUp, Plus } from 'lucide-react-native';

// Mock data
const myTasks = [
  { id: 1, title: 'Complete React Native project', completed: true, time: '9:00 AM' },
  { id: 2, title: 'Team meeting with design', completed: false, time: '11:00 AM' },
  { id: 3, title: 'Review pull requests', completed: false, time: '2:00 PM' },
  { id: 4, title: 'Plan weekly sprint', completed: false, time: '4:00 PM' },
];

const friendsTasks = [
  { id: 1, friend: 'Alex Johnson', task: 'Update project documentation', time: '10:00 AM', completed: true },
  { id: 2, friend: 'Sarah Miller', task: 'Design new UI components', time: '1:00 PM', completed: false },
  { id: 3, friend: 'Mike Chen', task: 'Fix authentication bug', time: '3:30 PM', completed: false },
  { id: 4, friend: 'Emma Davis', task: 'Prepare presentation', time: '5:00 PM', completed: true },
];

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-2xl font-bold text-gray-800">Today's Tasks</Text>
              <Text className="text-gray-500 mt-1">Wednesday, Nov 15</Text>
            </View>
            <View className="flex-row items-center bg-blue-50 px-3 py-1.5 rounded-full">
              <TrendingUp size={16} color="#3b82f6" />
              <Text className="text-blue-600 font-medium ml-1.5">12/15 done</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View className="px-6 mb-6">
          <View className="flex-row space-x-4">
            <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
              <Text className="text-gray-500 text-sm">Tasks Done</Text>
              <Text className="text-3xl font-bold text-gray-800 mt-2">12</Text>
            </View>
            <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
              <Text className="text-gray-500 text-sm">Pending</Text>
              <Text className="text-3xl font-bold text-gray-800 mt-2">3</Text>
            </View>
          </View>
        </View>

        {/* My Tasks Section */}
        <View className="px-6 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">My Tasks</Text>
            <TouchableOpacity className="flex-row items-center">
              <Plus size={20} color="#3b82f6" />
              <Text className="text-blue-500 font-medium ml-1">Add Task</Text>
            </TouchableOpacity>
          </View>

          <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {myTasks.map((task) => (
              <View key={task.id} className="border-b border-gray-100 last:border-b-0">
                <TouchableOpacity className="flex-row items-center p-4">
                  <View className="mr-3">
                    {task.completed ? (
                      <CheckCircle size={24} color="#10b981" />
                    ) : (
                      <Circle size={24} color="#d1d5db" />
                    )}
                  </View>
                  <View className="flex-1">
                    <Text className={`text-base ${task.completed ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                      {task.title}
                    </Text>
                    <View className="flex-row items-center mt-1">
                      <Clock size={14} color="#9ca3af" />
                      <Text className="text-gray-400 text-sm ml-1">{task.time}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Friends' Tasks Section */}
        <View className="px-6 mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-bold text-gray-800">Friends' Progress</Text>
            <Text className="text-gray-500">4 active</Text>
          </View>

          <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {friendsTasks.map((item) => (
              <View key={item.id} className="border-b border-gray-100 last:border-b-0">
                <View className="p-4">
                  <View className="flex-row justify-between items-start mb-2">
                    <View className="flex-row items-center">
                      <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center">
                        <Text className="text-blue-600 font-bold">
                          {item.friend.charAt(0)}
                        </Text>
                      </View>
                      <Text className="font-medium text-gray-800 ml-3">{item.friend}</Text>
                    </View>
                    <View className={`px-2 py-1 rounded-full ${item.completed ? 'bg-green-50' : 'bg-yellow-50'}`}>
                      <Text className={`text-xs font-medium ${item.completed ? 'text-green-600' : 'text-yellow-600'}`}>
                        {item.completed ? 'Done' : 'In Progress'}
                      </Text>
                    </View>
                  </View>
                  <Text className="text-gray-600 ml-11">{item.task}</Text>
                  <View className="flex-row items-center mt-2 ml-11">
                    <Clock size={14} color="#9ca3af" />
                    <Text className="text-gray-400 text-sm ml-1">{item.time}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}