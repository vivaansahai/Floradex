import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';
import { Alert } from 'react-native'; // Import Alert from React Native

export const identifyPlant = async () => {
  try {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (result.canceled) {
      console.log('Image selection cancelled');
      return {};
    }

    const imageUri = result.assets[0].uri;

    const fileInfo = await FileSystem.getInfoAsync(imageUri);
    const fileBlob = {
      uri: fileInfo.uri,
      name: 'image_1.jpg',
      type: 'image/jpeg',
    };

    const formData = new FormData();
    formData.append('images', fileBlob);

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

    return { species: bestMatch, imageUri }; // Return both species and image URI
  } catch (error) {
    console.error('Error:', error.message);
    Alert.alert('Error', 'Failed to identify the plant. Please try again.', [
      { text: 'OK', onPress: () => console.log('Error alert closed') },
    ]);
    throw error;
  }
};
