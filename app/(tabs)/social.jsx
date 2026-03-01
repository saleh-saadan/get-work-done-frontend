import { Check, MessageCircle, TrendingUp, Trophy, UserPlus, Users, X } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Alert, Modal, RefreshControl, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { apiRequest } from '../../api';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../hooks/useAuth';

export default function SocialScreen() {
  const { theme } = useTheme();
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [friendIdInput, setFriendIdInput] = useState('');

  // Fetch friends and pending requests
  const loadData = async () => {
    try {
      const friendsData = await apiRequest('/users/friends/lists/', 'GET', null, true);
      setFriends(friendsData);

      const pendingData = await apiRequest('/users/friends/pending/', 'GET', null, true);
      setPendingRequests(pendingData);
    } catch (error) {
      console.error('Failed to load social data', error);
      Alert.alert('Error', 'Could not load friends data');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  // Send friend request
  const sendFriendRequest = async () => {
    if (!friendIdInput.trim()) {
      Alert.alert('Error', 'Please enter a friend ID');
      return;
    }
    try {
      await apiRequest('/users/friends/request/', 'POST', { friend_id: friendIdInput }, true);
      Alert.alert('Success', 'Friend request sent!');
      setFriendIdInput('');
      setModalVisible(false);
      // Optionally refresh pending? Not needed because this is sent, not received.
    } catch (error) {
      Alert.alert('Failed', error.message);
    }
  };

  // Accept friend request
  const acceptRequest = async (friendshipId) => {
    try {
      await apiRequest('/users/friends/add/', 'POST', { friend_id: friendshipId }, true);
      Alert.alert('Success', 'Friend added!');
      loadData(); // refresh lists
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Reject friend request
  const rejectRequest = async (friendshipId) => {
    try {
      await apiRequest('/users/friends/reject/', 'POST', { friend_id: friendshipId }, true);
      Alert.alert('Success', 'Request rejected');
      loadData();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  // Calculate stats
  const friendCount = friends.length;
  // Mock rank and efficiency for now (could be computed from backend later)
  const rank = friendCount > 5 ? '3rd' : '1st';
  const efficiency = '78%';

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView 
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.accent} />
        }
      >
        {/* Header */}
        <View style={{ paddingHorizontal: 24, paddingTop: 24, paddingBottom: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <View>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.text }}>Social</Text>
              <Text style={{ color: theme.textSecondary, marginTop: 4 }}>Connect and compete with friends</Text>
            </View>
            <TouchableOpacity 
              onPress={() => setModalVisible(true)}
              style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: theme.accent, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 999 }}
            >
              <UserPlus size={18} color={theme.background} />
              <Text style={{ color: theme.background, fontWeight: '600', marginLeft: 8 }}>Add Friend</Text>
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 16 }}>
            <View style={{ alignItems: 'center' }}>
              <View style={{ width: 56, height: 56, backgroundColor: theme.accentLight, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <Users size={24} color={theme.accent} />
              </View>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.text }}>{friendCount}</Text>
              <Text style={{ color: theme.textSecondary }}>Friends</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View style={{ width: 56, height: 56, backgroundColor: theme.accentLight, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <Trophy size={24} color={theme.accent} />
              </View>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.text }}>{rank}</Text>
              <Text style={{ color: theme.textSecondary }}>Rank</Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <View style={{ width: 56, height: 56, backgroundColor: theme.accentLight, borderRadius: 28, alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
                <TrendingUp size={24} color={theme.accent} />
              </View>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: theme.text }}>{efficiency}</Text>
              <Text style={{ color: theme.textSecondary }}>Efficiency</Text>
            </View>
          </View>
        </View>

        {/* Pending Requests Section */}
        {pendingRequests.length > 0 && (
          <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.text, marginBottom: 12 }}>Pending Requests</Text>
            <View style={{ backgroundColor: theme.card, borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2 }}>
              {pendingRequests.map((req) => (
                <View key={req.id} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderBottomColor: theme.border }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                    <View style={{ width: 40, height: 40, backgroundColor: theme.accentLight, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{ color: theme.accent, fontWeight: 'bold' }}>{req.friend_info.username.charAt(0).toUpperCase()}</Text>
                    </View>
                    <View style={{ marginLeft: 12 }}>
                      <Text style={{ fontWeight: '500', color: theme.text }}>{req.friend_info.username}</Text>
                      <Text style={{ color: theme.textSecondary, fontSize: 12 }}>wants to connect</Text>
                    </View>
                  </View>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <TouchableOpacity 
                      onPress={() => acceptRequest(req.id)}
                      style={{ width: 36, height: 36, backgroundColor: theme.success + '20', borderRadius: 18, alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Check size={18} color={theme.success} />
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => rejectRequest(req.id)}
                      style={{ width: 36, height: 36, backgroundColor: theme.error + '20', borderRadius: 18, alignItems: 'center', justifyContent: 'center' }}
                    >
                      <X size={18} color={theme.error} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Friends List */}
        <View style={{ paddingHorizontal: 24, marginBottom: 24 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.text, marginBottom: 12 }}>Friends</Text>
          {friends.length === 0 ? (
            <View style={{ backgroundColor: theme.card, borderRadius: 16, padding: 24, alignItems: 'center' }}>
              <Text style={{ color: theme.textSecondary, textAlign: 'center' }}>No friends yet. Add some using the button above!</Text>
            </View>
          ) : (
            <View style={{ backgroundColor: theme.card, borderRadius: 16, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 2 }}>
              {friends.map((friend) => (
                <View key={friend.id} style={{ flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: theme.border }}>
                  <View style={{ width: 48, height: 48, backgroundColor: theme.accentLight, borderRadius: 24, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: theme.accent, fontSize: 18, fontWeight: 'bold' }}>{friend.friend_info.username.charAt(0).toUpperCase()}</Text>
                  </View>
                  <View style={{ flex: 1, marginLeft: 16 }}>
                    <Text style={{ fontSize: 16, fontWeight: '500', color: theme.text }}>{friend.friend_info.username}</Text>
                    <Text style={{ color: theme.textSecondary, fontSize: 14 }}>Active now</Text>
                  </View>
                  <TouchableOpacity style={{ padding: 8 }}>
                    <MessageCircle size={20} color={theme.textSecondary} />
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Add Friend Modal */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ width: '80%', backgroundColor: theme.card, borderRadius: 16, padding: 24 }}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: theme.text, marginBottom: 16 }}>Add Friend</Text>
              <Text style={{ color: theme.textSecondary, marginBottom: 8 }}>Enter their 5-character friend ID:</Text>
              <TextInput
                style={{ borderWidth: 1, borderColor: theme.border, borderRadius: 8, padding: 12, color: theme.text, marginBottom: 16 }}
                placeholder="e.g., A1B2C"
                placeholderTextColor={theme.textSecondary}
                value={friendIdInput}
                onChangeText={setFriendIdInput}
                autoCapitalize="characters"
                maxLength={5}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', gap: 12 }}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={{ paddingVertical: 10, paddingHorizontal: 16 }}>
                  <Text style={{ color: theme.textSecondary }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={sendFriendRequest} style={{ backgroundColor: theme.accent, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 }}>
                  <Text style={{ color: theme.background, fontWeight: '600' }}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}