import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function MyBeatsScreen({ navigation }) {
  // Sample data - in real app this would come from storage/backend
  const [beats] = useState([
    {
      id: '1',
      name: 'Summer Groove',
      bpm: 120,
      duration: '2:30',
      dateCreated: '2024-03-14',
    },
    {
      id: '2',
      name: 'Night Vibes',
      bpm: 115,
      duration: '3:15',
      dateCreated: '2024-03-14',
    },
  ]);

  const renderBeatItem = ({ item }) => (
    <View style={styles.beatCard}>
      <View style={styles.beatInfo}>
        <Text style={styles.beatName}>{item.name}</Text>
        <Text style={styles.beatDetails}>
          BPM: {item.bpm} | Duration: {item.duration}
        </Text>
        <Text style={styles.beatDate}>Created: {item.dateCreated}</Text>
      </View>

      <View style={styles.beatActions}>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome5 name="play" size={16} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome5 name="edit" size={16} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, styles.uploadButton]}
          onPress={() => navigation.navigate('Store')}
        >
          <FontAwesome5 name="upload" size={16} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.deleteButton]}>
          <FontAwesome5 name="trash" size={16} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Beats</Text>
        <TouchableOpacity 
          style={styles.newBeatButton}
          onPress={() => navigation.navigate('BeatMaker')}
        >
          <FontAwesome5 name="plus" size={16} color="#fff" />
          <Text style={styles.newBeatText}>New Beat</Text>
        </TouchableOpacity>
      </View>

      {beats.length > 0 ? (
        <FlatList
          data={beats}
          renderItem={renderBeatItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.beatList}
        />
      ) : (
        <View style={styles.emptyState}>
          <FontAwesome5 name="music" size={48} color="#333" />
          <Text style={styles.emptyStateText}>No beats created yet</Text>
          <TouchableOpacity 
            style={styles.createFirstButton}
            onPress={() => navigation.navigate('BeatMaker')}
          >
            <Text style={styles.createFirstText}>Create Your First Beat</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  newBeatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#8c52ff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    gap: 8,
  },
  newBeatText: {
    color: '#fff',
    fontWeight: '600',
  },
  beatList: {
    padding: 15,
    gap: 15,
  },
  beatCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  beatInfo: {
    marginBottom: 15,
  },
  beatName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  beatDetails: {
    color: '#888',
    fontSize: 14,
    marginBottom: 5,
  },
  beatDate: {
    color: '#666',
    fontSize: 12,
  },
  beatActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },
  actionButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    color: '#666',
    fontSize: 18,
    marginTop: 20,
    marginBottom: 20,
  },
  createFirstButton: {
    backgroundColor: '#8c52ff',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  createFirstText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
