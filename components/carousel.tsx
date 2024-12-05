import React from 'react';
import { View, FlatList, Text, Image, StyleSheet, Dimensions, useColorScheme } from 'react-native';

const Carousel = () => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // Static data for images, titles, and descriptions
  const data = [
    {
      imageUrl: require('../assets/images/carousel_1.jpg'), // Replace with your actual image paths
      title: 'Bougainvillea',
      description: 'Bougainvillea, a vibrant flowering vine, hails from South America, particularly Brazil, Peru, and Argentina. These tropical beauties thrive in warm, sunny climates and well-draining soil. They are known for their colorful bracts, which surround small, inconspicuous flowers.',
    },
    {
      imageUrl: require('../assets/images/carousel_2.jpeg'), // Replace with your actual image paths
      title: 'Aloe Vera',
      description: 'Aloe vera is a succulent plant native to arid regions of Africa and the Arabian Peninsula. It prefers well-draining soil and bright, indirect sunlight. This low-maintenance plant is valued for its medicinal properties, often used to soothe skin irritations.',
    },
    {
      imageUrl: require('../assets/images/carousel_3.jpeg'), // Replace with your actual image paths
      title: 'Peepal Tree',
      description: 'The Peepal tree, a sacred fig tree, is native to the Indian subcontinent. It thrives in warm, humid climates and prefers full sunlight. This large, evergreen tree is known for its heart-shaped leaves and aerial roots. It is often planted near religious sites due to its spiritual significance.',
    },
  ];

  return (
    <View style={styles.container}>
      <FlatList
        data={data} // Using the static data
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={item.imageUrl} style={styles.image} />
            <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>
              {item.title}
            </Text>
            <Text style={[styles.description, isDarkMode ? styles.darkText : styles.lightText]}>
              {item.description}
            </Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()} // Using index as the key
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  itemContainer: {
    backgroundColor: '#000', // Set box color to black
    margin: 10,
    borderRadius: 10,
    padding: 10,
    width: Dimensions.get('window').width * 0.7, // Adjust width of the item box
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff', // Set text color to white for contrast with black background
  },
  description: {
    marginTop: 5,
    fontSize: 12,
    color: '#fff', // Text color for description
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  darkText: {
    color: 'white',
  },
  lightText: {
    color: 'black',
  },
});

export default Carousel;
