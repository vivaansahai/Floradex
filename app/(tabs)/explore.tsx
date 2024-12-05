import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';


const BoxGrid = () => {
  const rows = 20; // Number of rows (adjust for more boxes)
  const boxes = Array.from({ length: rows * 3 }); // Create an array for boxes

  const handleBoxPress = (index: number) => {
    // Handle box click here
    console.log(`Box ${index + 1} clicked!`);
  };
  function PlantDetailsScreen() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Plant Details Screen</Text>
        <Text>The information about this plant is</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Library</Text>
      </View>

      {/* Scrollable Grid of Boxes */}
      <ScrollView style={styles.grid}>
        <View style={styles.gridContainer}>
          {boxes.map((_, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.box} 
              onPress={() => handleBoxPress(index)} // Handle box click
            >
              <Text style={styles.boxText}>Box {index + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  header: {
    width: '100%',
    padding: 20,
    backgroundColor: 'black', // Header background color
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    color: '#FFFFFF', // Header text color
    fontWeight: 'bold',
  },
  grid: {
    flex: 1,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Wrap boxes to the next row
    justifyContent: 'space-between', // Space boxes evenly
    padding: 10,
  },
  box: {
    width: '30%', // Width of each box (3 columns)
    height: 150, // Height of each box increased
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Black background
    marginBottom: 10, // Space between rows
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
    borderRadius: 5, // Rounded corners
  },
  boxText: {
    color: '#FFFFFF', // Box text color
    fontWeight: 'bold',
  },
});

export default BoxGrid;
