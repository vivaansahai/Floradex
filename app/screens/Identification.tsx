import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { Alert } from 'react-native';

/**
 * Function to send the image to the API and handle the response.
 * @param {FormData} formData - The FormData object containing the image data.
 * @returns {Object} - The identified plant information.
 */
export const fetchPlantIdentification = async (formData) => {
  try {
    const response = await axios.post(
      'https://my-api.plantnet.org/v2/identify/all?api-key=2b10qLUOKbLEwEMbSY7IHBAwD',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    const bestMatch = response.data.bestMatch;
    console.log('Response:', response.data);
    console.log('Identified Plant:', bestMatch);

    return bestMatch;
  } catch (error) {
    console.error('Error in API call:', error.message);
    throw new Error('Failed to fetch plant identification.');
  }
};

/**
 * Function to identify the plant from a captured image URI.
 * @param {string} imageUri - The URI of the captured image.
 * @returns {Object} - Contains the identified species and the image URI.
 */
export const identifyPlant = async (imageUri) => {
  try {
    // Validate and retrieve file info
    const fileInfo = await FileSystem.getInfoAsync(imageUri);
    if (!fileInfo.exists) {
      throw new Error('File does not exist at the given URI.');
    }

    // Prepare the image file as FormData
    const fileBlob = {
      uri: fileInfo.uri,
      name: 'captured_image.jpg', // Change the name as required
      type: 'image/jpeg', // Ensure the type matches the actual file type
    };

    const formData = new FormData();
    formData.append('images', fileBlob);

    // Call the fetchPlantIdentification function
    const species = await fetchPlantIdentification(formData);

    return { species, imageUri }; // Return both species and image URI
  } catch (error) {
    console.error('Error in plant identification:', error.message);
    Alert.alert('Error', 'Failed to identify the plant. Please try again.', [
      { text: 'OK', onPress: () => console.log('Error alert closed') },
    ]);
    throw error;
  }
};
