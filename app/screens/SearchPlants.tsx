import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, Dimensions, useColorScheme } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const data = [
  { id: '1', title: 'Fern' },
  { id: '2', title: 'Cactus' },
  { id: '3', title: 'Bamboo' },
  { id: '4', title: 'Aloe Vera' },
  { id: '5', title: 'Snake Plant' },
  { id: '6', title: 'Spider Plant' },
  // Add more items as needed
];

const SearchPlants: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const insets = useSafeAreaInsets(); // Get safe area insets for top, bottom, left, and right
  const colorScheme = useColorScheme(); // Get current color scheme (light or dark)

  const handleSearch = (text: string) => {
    setSearchText(text);
    setFilteredData(
      data.filter((item) => item.title.toLowerCase().includes(text.toLowerCase()))
    );
  };

  const renderGridItem = ({ item }: { item: { id: string; title: string } }) => (
    <View style={[styles.gridItem, { backgroundColor: colorScheme === 'dark' ? '#444' : '#ececec' }]}>
      <Text style={[styles.itemText, { color: colorScheme === 'dark' ? '#fff' : '#333' }]}>{item.title}</Text>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          backgroundColor: colorScheme === 'dark' ? '#333' : '#f8f8f8',
        }, // Adjust background color based on theme
      ]}
    >
      {/* Heading */}
      <Text style={[styles.heading, { color: colorScheme === 'dark' ? '#fff' : '#333' }]}>Explore</Text>

      {/* Search Bar */}
      <TextInput
        style={[styles.searchBar, { backgroundColor: colorScheme === 'dark' ? '#555' : '#fff' }]}
        placeholder="Search plants..."
        value={searchText}
        onChangeText={handleSearch}
        placeholderTextColor={colorScheme === 'dark' ? '#bbb' : '#888'}
      />

      {/* Grid */}
      <FlatList
        data={filteredData}
        renderItem={renderGridItem}
        keyExtractor={(item) => item.id}
        numColumns={2} // Number of columns in the grid
        columnWrapperStyle={styles.row} // Styling for the row
        contentContainerStyle={styles.gridContainer} // Additional container styling
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
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  gridContainer: {
    paddingBottom: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
  gridItem: {
    flex: 1,
    margin: 5,
    height: Dimensions.get('window').width / 2 - 20, // Adjust height based on screen width
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 16,
  },
});

export default SearchPlants;
