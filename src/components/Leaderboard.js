import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getLeaderboard } from '../utils/firebase';

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchLeaderboard = async (showRefreshing = true) => {
    try {
      if (showRefreshing) setRefreshing(true);
      setLoading(true);
      const data = await getLeaderboard(10);
      setLeaderboardData(data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
      if (showRefreshing) setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard(false);
    const interval = setInterval(() => fetchLeaderboard(false), 30000);
    return () => clearInterval(interval);
  }, []);

  const renderItem = ({ item, index }) => (
    <View style={styles.row}>
      {/* Rank & Medal */}
      <View style={styles.rankContainer}>
        <Text style={styles.rank}>{index + 1}</Text>
        {index < 3 && (
          <MaterialCommunityIcons
            name="medal"
            size={20}
            color={['#FFD700', '#C0C0C0', '#CD7F32'][index]}
          />
        )}
      </View>

      {/* User Info */}
      <View style={styles.userInfo}>
        <View style={[
          styles.avatar,
          { backgroundColor: index < 3 ? 
            ['#FFD700', '#C0C0C0', '#CD7F32'][index] : '#2B3A67' }
        ]}>
          <Text style={styles.avatarText}>
            {item.email?.[0].toUpperCase()}
          </Text>
        </View>
        <Text style={styles.username}>
          {item.email?.split('@')[0]}
        </Text>
      </View>

      {/* Score */}
      <Text style={styles.score}>{item.bestScore?.toFixed(0)}%</Text>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#2B3A67" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <MaterialCommunityIcons name="trophy" size={24} color="#2B3A67" />
          <Text style={styles.title}>Top Performers</Text>
        </View>
      </View>

      {/* Leaderboard List */}
      <FlatList
        data={leaderboardData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => fetchLeaderboard(true)}
          />
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No quiz results yet. Be the first to take the quiz!
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2B3A67',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F7FA',
  },
  rankContainer: {
    width: 50,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rank: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2B3A67',
  },
  userInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: 'white',
    fontWeight: 'bold',
  },
  username: {
    fontSize: 16,
    color: '#2B3A67',
  },
  score: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2B3A67',
    marginLeft: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    padding: 20,
  },
});