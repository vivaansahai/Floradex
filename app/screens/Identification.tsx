import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { Alert } from 'react-native'; // Import Alert from React Native

export const identifyPlant = async () => {
  try {
    // Request image from the user
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      console.log('Image selection cancelled');
      return;
    }

    // Get the image URI
    const imageUri = result.assets[0].uri;

    // Read the file as a blob
    const fileInfo = await FileSystem.getInfoAsync(imageUri);
    const fileBlob = {
      uri: fileInfo.uri,
      name: 'image_1.jpg', // Provide a name for the file
      type: 'image/jpeg', // Ensure you set the correct MIME type
    };

    // Prepare FormData
    const formData = new FormData();
    formData.append('images', fileBlob);

    // Send POST request
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

    // Display the bestMatch in an alert popup
    Alert.alert(
      'Plant Identification',
      `Best Match: ${bestMatch || 'No match found'}`, // Show the bestMatch or a fallback message
      [{ text: 'OK', onPress: () => console.log('Alert closed') }]
    );

    return bestMatch; // Return the response data if needed
  } catch (error) {
    console.error('Error:', error.message);
    Alert.alert('Error', 'Failed to identify the plant. Please try again.', [
      { text: 'OK', onPress: () => console.log('Error alert closed') },
    ]);
    throw error; // Throw the error to handle it outside
  }
};
