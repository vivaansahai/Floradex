import React from 'react';
import { View, Text, FlatList, StyleSheet, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const favouritePlants = [
  { id: '1', name: 'Rose' },
  { id: '2', name: 'Tulip' },
  { id: '3', name: 'Orchid' },
  { id: '4', name: 'Jasmine' },
  { id: '5', name: 'Sunflower' },
];

const FavouritePlants: React.FC = () => {
  const insets = useSafeAreaInsets(); // Get safe area insets
  const colorScheme = useColorScheme(); // Get the current color scheme (light or dark)

  // Render each plant item
  const renderPlantItem = ({ item }: { item: { id: string; name: string } }) => (
    <View
      style={[
        styles.plantItem,
        { backgroundColor: colorScheme === 'dark' ? '#444' : '#e0ffe0' }, // Background color based on theme
      ]}
    >
      <Text style={[styles.plantText, { color: colorScheme === 'dark' ? '#fff' : '#333' }]}>
        {item.name}
      </Text>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom }, // Adjust for safe area
        { backgroundColor: colorScheme === 'dark' ? '#333' : '#f8f8f8' }, // Background color based on theme
      ]}
    >
      {/* Heading */}
      <Text style={[styles.heading, { color: colorScheme === 'dark' ? '#fff' : '#333' }]}>
        Favourite Plants
      </Text>

      {/* List of Favourite Plants */}
      <FlatList
        data={favouritePlants}
        renderItem={renderPlantItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 10,
  },
  plantItem: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
  },
  plantText: {
    fontSize: 18,
  },
});

export default FavouritePlants;
