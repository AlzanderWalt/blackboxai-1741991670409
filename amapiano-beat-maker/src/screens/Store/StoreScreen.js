import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function StoreScreen() {
  // Sample data - in real app this would come from an API
  const [beats] = useState([
    {
      id: '1',
      name: 'Summer Vibes',
      producer: 'DJ Maphorisa',
      price: 29.99,
      rating: 4.5,
      sales: 120,
      image: 'https://via.placeholder.com/100',
    },
    {
      id: '2',
      name: 'Night Groove',
      producer: 'Kabza De Small',
      price: 24.99,
      rating: 4.8,
      sales: 85,
      image: 'https://via.placeholder.com/100',
    },
    {
      id: '3',
      name: 'Dance Floor',
      producer: 'Tyler ICU',
      price: 19.99,
      rating: 4.2,
      sales: 65,
      image: 'https://via.placeholder.com/100',
    },
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Popular', 'New', 'Featured'];

  const renderCategoryButton = (category) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryButton,
        selectedCategory === category && styles.categoryButtonActive,
      ]}
      onPress={() => setSelectedCategory(category)}
    >
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === category && styles.categoryButtonTextActive,
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  const renderBeatItem = ({ item }) => (
    <View style={styles.beatCard}>
      <Image
        source={{ uri: item.image }}
        style={styles.beatImage}
      />
      <View style={styles.beatInfo}>
        <Text style={styles.beatName}>{item.name}</Text>
        <Text style={styles.producerName}>by {item.producer}</Text>
        <View style={styles.ratingContainer}>
          <FontAwesome5 name="star" solid size={12} color="#FFD700" />
          <Text style={styles.ratingText}>{item.rating}</Text>
          <Text style={styles.salesText}>({item.sales} sales)</Text>
        </View>
        <Text style={styles.priceText}>${item.price}</Text>
      </View>
      <View style={styles.beatActions}>
        <TouchableOpacity style={styles.previewButton}>
          <FontAwesome5 name="play" size={12} color="#fff" />
          <Text style={styles.previewButtonText}>Preview</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyButton}>
          <FontAwesome5 name="shopping-cart" size={12} color="#fff" />
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <FontAwesome5 name="search" size={16} color="#666" />
          <Text style={styles.searchPlaceholder}>Search beats...</Text>
        </View>
      </View>

      <View style={styles.categoriesContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        >
          {categories.map(renderCategoryButton)}
        </ScrollView>
      </View>

      <FlatList
        data={beats}
        renderItem={renderBeatItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.beatsList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  searchContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e1e1e',
    padding: 12,
    borderRadius: 10,
    gap: 10,
  },
  searchPlaceholder: {
    color: '#666',
    fontSize: 16,
  },
  categoriesContainer: {
    padding: 15,
  },
  categoriesList: {
    flexDirection: 'row',
    gap: 10,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#1e1e1e',
  },
  categoryButtonActive: {
    backgroundColor: '#8c52ff',
  },
  categoryButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  beatsList: {
    padding: 15,
    gap: 15,
  },
  beatCard: {
    backgroundColor: '#1e1e1e',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  beatImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
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
  producerName: {
    color: '#888',
    fontSize: 14,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 8,
  },
  ratingText: {
    color: '#FFD700',
    fontSize: 12,
    fontWeight: 'bold',
  },
  salesText: {
    color: '#666',
    fontSize: 12,
  },
  priceText: {
    color: '#8c52ff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  beatActions: {
    flexDirection: 'row',
    gap: 10,
  },
  previewButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 8,
    gap: 8,
  },
  previewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  buyButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8c52ff',
    padding: 10,
    borderRadius: 8,
    gap: 8,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
