import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const MenuButton = ({ title, icon, screen }) => (
    <TouchableOpacity
      style={styles.menuButton}
      onPress={() => navigation.navigate(screen)}
    >
      <FontAwesome5 name={icon} size={24} color="#fff" />
      <Text style={styles.menuButtonText}>{title}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Amapiano Beat Maker</Text>
        <Text style={styles.subtitle}>Create, Share, and Sell Your Beats</Text>
      </View>

      <View style={styles.quickActions}>
        <TouchableOpacity
          style={styles.createButton}
          onPress={() => navigation.navigate('BeatMaker')}
        >
          <FontAwesome5 name="plus-circle" size={32} color="#fff" />
          <Text style={styles.createButtonText}>Create New Beat</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.menuGrid}>
        <MenuButton
          title="My Beats"
          icon="music"
          screen="MyBeats"
        />
        <MenuButton
          title="Beat Store"
          icon="store"
          screen="Store"
        />
      </View>

      <View style={styles.featuresSection}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <FontAwesome5 name="robot" size={24} color="#fff" />
            <Text style={styles.featureText}>AI-Powered Beat Generation</Text>
          </View>
          <View style={styles.featureItem}>
            <FontAwesome5 name="sliders-h" size={24} color="#fff" />
            <Text style={styles.featureText}>Professional Controls</Text>
          </View>
          <View style={styles.featureItem}>
            <FontAwesome5 name="dollar-sign" size={24} color="#fff" />
            <Text style={styles.featureText}>Sell Your Beats</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 8,
  },
  quickActions: {
    padding: 20,
    alignItems: 'center',
  },
  createButton: {
    backgroundColor: '#8c52ff',
    padding: 20,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: '#8c52ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-around',
  },
  menuButton: {
    backgroundColor: '#1e1e1e',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    width: '45%',
    marginVertical: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  menuButtonText: {
    color: '#fff',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
  },
  featuresSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  featuresList: {
    gap: 15,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    gap: 15,
  },
  featureText: {
    color: '#fff',
    fontSize: 16,
  },
});
