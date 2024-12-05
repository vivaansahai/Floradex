import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  useColorScheme,
  PermissionsAndroid,
  Modal,
  Button,
  ScrollView,
  ActivityIndicator, // Import ActivityIndicator
} from 'react-native';
import { ThemedButton } from 'react-native-really-awesome-button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '@/hooks/styles';
import { identifyPlant, pickImageAndIdentifyPlant } from './Identification'; // Import the identifyPlant function
import { generateContent as fetchPlantInfo } from '../Utilities/location';
import { getAuth } from 'firebase/auth';
import Carousel from '@/components/carousel';

const requestCameraPermission = async (
  setModalVisible,
  setGeneratedContent,
  setSelectedImage,
  setLoading
) => {
  try {
    setLoading(true); // Show the loading indicator
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Floradex Camera Permission',
        message: 'Floradex needs access to your camera to identify plant species',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Camera permission granted, executing API call...');
      const { species, imageUri } = await pickImageAndIdentifyPlant(); // Destructure species and imageUri
      if (species != null) {
        setSelectedImage(imageUri); // Set the selected image in state
        const response = await fetchPlantInfo(species, getAuth().currentUser?.uid);
        // Set content and show modal
        setGeneratedContent(formatBoldText(response));
        setModalVisible(true);
      }
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  } finally {
    setLoading(false); // Hide the loading indicator
  }
};

const formatBoldText = (text) => {
  const parts = text.split(/(\*\*.*?\*\*)/); // Split text by **bold segments**
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      // Remove ** and return bold Text component
      return (
        <Text key={index} style={{ fontWeight: 'bold' }}>
          {part.slice(2, -2)}
        </Text>
      );
    }
    return <Text key={index}>{part}</Text>; // Regular text
  });
};

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [generatedContent, setGeneratedContent] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image URI
  const [loading, setLoading] = useState(false); // Loading state

  const insets = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>
        FLORADEX
      </Text>
      <Image
        source={require('../../assets/images/Plant.png')} // Main banner image
        style={styles.image}
        resizeMode="contain"
      />
      {loading ? (
        <ActivityIndicator size="large" color="green" style={{ marginTop: 20 }} />
      ) : (
        <ThemedButton
          name="rick"
          type="primary"
          onPress={() =>
            requestCameraPermission(
              setModalVisible,
              setGeneratedContent,
              setSelectedImage,
              setLoading
            )
          } // Execute API call on button press
          backgroundColor="lightgreen"
          textColor="green"
          borderColor="lightgreen"
          activityColor="green"
          raiseLevel={2}
        >
          Detect Plant Species
        </ThemedButton>
      )}
          <Carousel />
      {/* Modal to display generated content */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalContent}>
            {selectedImage && (
              <Image
                source={{ uri: selectedImage }}
                style={modalStyles.selectedImage}
                resizeMode="contain"
              />
            )}
            <ScrollView>
              {generatedContent.map((element, index) => (
                <Text key={index} style={modalStyles.text}>
                  {element}
                </Text>
              ))}
            </ScrollView>
            <Button title="Close" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const modalStyles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dimmed background
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'black', // Black background for the modal
    borderRadius: 15,
    padding: 20,
    elevation: 10, // Shadow for Android
    shadowColor: '#fff', // Light shadow for better visibility
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderWidth: 2, // Border width
    borderColor: 'white', // White border color for contrast
  },
  selectedImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white', // White border for the image
  },
  text: {
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 24,
    color: 'white', // White text for contrast
    textAlign: 'justify',
  },
});
