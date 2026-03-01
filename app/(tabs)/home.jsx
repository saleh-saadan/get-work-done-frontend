import { CheckCircle, Circle, Clock, Plus, TrendingUp } from 'lucide-react-native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';

// Mock data (same as before)
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
  const { theme } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.text }}>Today's Tasks</Text>
              <Text style={{ color: theme.textSecondary, marginTop: 4 }}>Wednesday, Nov 15</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: theme.accentLight, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999 }}>
              <TrendingUp size={16} color={theme.accent} />
              <Text style={{ color: theme.accent, fontWeight: '500', marginLeft: 6 }}>12/15 done</Text>
            </View>
          </View>
        </View>

        {/* Stats */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', gap: 16 }}>
            <View style={{ flex: 1, backgroundColor: theme.card, borderRadius: 16, padding: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2 }}>
              <Text style={{ color: theme.textSecondary, fontSize: 14 }}>Tasks Done</Text>
              <Text style={{ fontSize: 32, fontWeight: 'bold', color: theme.text, marginTop: 8 }}>12</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: theme.card, borderRadius: 16, padding: 16, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2 }}>
              <Text style={{ color: theme.textSecondary, fontSize: 14 }}>Pending</Text>
              <Text style={{ fontSize: 32, fontWeight: 'bold', color: theme.text, marginTop: 8 }}>3</Text>
            </View>
          </View>
        </View>

        {/* My Tasks */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.text }}>My Tasks</Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Plus size={20} color={theme.accent} />
              <Text style={{ color: theme.accent, fontWeight: '500', marginLeft: 4 }}>Add Task</Text>
            </TouchableOpacity>
          </View>

          <View style={{ backgroundColor: theme.card, borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2 }}>
            {myTasks.map((task) => (
              <View key={task.id} style={{ borderBottomWidth: 1, borderBottomColor: theme.border, padding: 16 }}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ marginRight: 12 }}>
                    {task.completed ? (
                      <CheckCircle size={24} color={theme.success} />
                    ) : (
                      <Circle size={24} color={theme.border} />
                    )}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[ { fontSize: 16 }, task.completed ? { color: theme.textSecondary, textDecorationLine: 'line-through' } : { color: theme.text } ]}>
                      {task.title}
                    </Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
                      <Clock size={14} color={theme.textSecondary} />
                      <Text style={{ color: theme.textSecondary, fontSize: 14, marginLeft: 4 }}>{task.time}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>

        {/* Friends' Tasks */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.text }}>Friends' Progress</Text>
            <Text style={{ color: theme.textSecondary }}>4 active</Text>
          </View>

          <View style={{ backgroundColor: theme.card, borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2 }}>
            {friendsTasks.map((item) => (
              <View key={item.id} style={{ borderBottomWidth: 1, borderBottomColor: theme.border, padding: 16 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ width: 32, height: 32, backgroundColor: theme.accentLight, borderRadius: 16, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ color: theme.accent, fontWeight: 'bold' }}>{item.friend.charAt(0)}</Text>
                    </View>
                    <Text style={{ fontWeight: '500', color: theme.text, marginLeft: 12 }}>{item.friend}</Text>
                  </View>
                  <View style={{ backgroundColor: item.completed ? theme.success + '20' : theme.warning + '20', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 }}>
                    <Text style={{ fontSize: 12, fontWeight: '500', color: item.completed ? theme.success : theme.warning }}>
                      {item.completed ? 'Done' : 'In Progress'}
                    </Text>
                  </View>
                </View>
                <Text style={{ color: theme.textSecondary, marginLeft: 44 }}>{item.task}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8, marginLeft: 44 }}>
                  <Clock size={14} color={theme.textSecondary} />
                  <Text style={{ color: theme.textSecondary, fontSize: 14, marginLeft: 4 }}>{item.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}