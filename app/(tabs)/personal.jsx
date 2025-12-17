// app/(tabs)/personal.jsx
import { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CheckCircle, Circle, Filter, Calendar, Grid, List, Plus, Search, ChevronDown } from 'lucide-react-native';

// Mock data
const initialTasks = [
  { id: 1, title: 'Finish project proposal', category: 'Work', priority: 'high', completed: true, date: 'Today' },
  { id: 2, title: 'Buy groceries', category: 'Personal', priority: 'medium', completed: false, date: 'Today' },
  { id: 3, title: 'Call mom', category: 'Family', priority: 'low', completed: false, date: 'Tomorrow' },
  { id: 4, title: 'Gym workout', category: 'Health', priority: 'medium', completed: true, date: 'Today' },
  { id: 5, title: 'Read React Native docs', category: 'Learning', priority: 'high', completed: false, date: 'This Week' },
  { id: 6, title: 'Plan weekend trip', category: 'Personal', priority: 'low', completed: false, date: 'This Week' },
];

const categories = ['All', 'Work', 'Personal', 'Health', 'Learning', 'Family'];

export default function PersonalScreen() {
  const [tasks, setTasks] = useState(initialTasks);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newTask, setNewTask] = useState('');

  const filteredTasks = selectedCategory === 'All' 
    ? tasks 
    : tasks.filter(task => task.category === selectedCategory);

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTask.trim()) {
      const newTaskObj = {
        id: tasks.length + 1,
        title: newTask,
        category: 'Personal',
        priority: 'medium',
        completed: false,
        date: 'Today'
      };
      setTasks([newTaskObj, ...tasks]);
      setNewTask('');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text className="text-2xl font-bold text-gray-800">My Tasks</Text>
              <Text className="text-gray-500 mt-1">Personal workspace</Text>
            </View>
            <View className="flex-row space-x-3">
              <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
                <Filter size={20} color="#374151" />
              </TouchableOpacity>
              <TouchableOpacity className="w-10 h-10 bg-white rounded-full items-center justify-center shadow-sm">
                <Calendar size={20} color="#374151" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Add Task */}
          <View className="flex-row mb-6">
            <View className="flex-1 mr-3">
              <TextInput
                className="bg-white border border-gray-300 rounded-xl px-4 py-3 text-base"
                placeholder="Add a new task..."
                value={newTask}
                onChangeText={setNewTask}
                onSubmitEditing={addTask}
              />
            </View>
            <TouchableOpacity 
              className="bg-blue-500 w-12 h-12 rounded-xl items-center justify-center"
              onPress={addTask}
            >
              <Plus size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* View Toggle */}
          <View className="flex-row justify-between items-center mb-6">
            <View className="flex-row bg-white rounded-xl p-1">
              <TouchableOpacity 
                className={`px-4 py-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-50' : ''}`}
                onPress={() => setViewMode('list')}
              >
                <List size={20} color={viewMode === 'list' ? '#3b82f6' : '#9ca3af'} />
              </TouchableOpacity>
              <TouchableOpacity 
                className={`px-4 py-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-50' : ''}`}
                onPress={() => setViewMode('grid')}
              >
                <Grid size={20} color={viewMode === 'grid' ? '#3b82f6' : '#9ca3af'} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity className="flex-row items-center bg-white px-4 py-2 rounded-xl shadow-sm">
              <Text className="text-gray-700 font-medium mr-2">Sort by</Text>
              <ChevronDown size={16} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* Categories */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-6">
            <View className="flex-row space-x-2">
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  className={`px-4 py-2 rounded-full ${selectedCategory === category ? 'bg-blue-500' : 'bg-white'}`}
                  onPress={() => setSelectedCategory(category)}
                >
                  <Text className={`font-medium ${selectedCategory === category ? 'text-white' : 'text-gray-700'}`}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Tasks List/Grid */}
        <View className="px-6 pb-10">
          {viewMode === 'list' ? (
            <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {filteredTasks.map((task) => (
                <View key={task.id} className="border-b border-gray-100 last:border-b-0">
                  <TouchableOpacity 
                    className="p-4 flex-row items-center"
                    onPress={() => toggleTask(task.id)}
                  >
                    <View className="mr-4">
                      {task.completed ? (
                        <CheckCircle size={24} color="#10b981" />
                      ) : (
                        <Circle size={24} color="#d1d5db" />
                      )}
                    </View>
                    <View className="flex-1">
                      <Text className={`text-base ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                        {task.title}
                      </Text>
                      <View className="flex-row items-center mt-2 space-x-3">
                        <View className={`px-2 py-1 rounded-full ${
                          task.priority === 'high' ? 'bg-red-50' : 
                          task.priority === 'medium' ? 'bg-yellow-50' : 'bg-green-50'
                        }`}>
                          <Text className={`text-xs font-medium ${
                            task.priority === 'high' ? 'text-red-600' : 
                            task.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </Text>
                        </View>
                        <Text className="text-gray-400 text-sm">{task.category}</Text>
                        <Text className="text-gray-400 text-sm">{task.date}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          ) : (
            <View className="flex-row flex-wrap justify-between">
              {filteredTasks.map((task) => (
                <TouchableOpacity 
                  key={task.id}
                  className="w-[48%] bg-white rounded-2xl p-4 mb-4 shadow-sm"
                  onPress={() => toggleTask(task.id)}
                >
                  <View className="mb-3">
                    {task.completed ? (
                      <CheckCircle size={24} color="#10b981" />
                    ) : (
                      <Circle size={24} color="#d1d5db" />
                    )}
                  </View>
                  <Text className={`text-sm font-medium mb-2 ${task.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                    {task.title}
                  </Text>
                  <View className={`px-2 py-1 rounded-full self-start ${
                    task.priority === 'high' ? 'bg-red-50' : 
                    task.priority === 'medium' ? 'bg-yellow-50' : 'bg-green-50'
                  }`}>
                    <Text className={`text-xs font-medium ${
                      task.priority === 'high' ? 'text-red-600' : 
                      task.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {task.priority}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}