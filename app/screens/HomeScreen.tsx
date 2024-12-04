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
} from 'react-native';
import { ThemedButton } from 'react-native-really-awesome-button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '@/hooks/styles';
import PagerView from 'react-native-pager-view';
import { identifyPlant, pickImageAndIdentifyPlant } from './Identification'; // Import the identifyPlant function
import { generateContent as fetchPlantInfo } from '../Utilities/location';
import { getAuth } from 'firebase/auth';

const requestCameraPermission = async (
  setModalVisible,
  setGeneratedContent,
  setSelectedImage
) => {
  try {
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
      if(species!=null)
      {
        setSelectedImage(imageUri); // Set the selected image in state
      const response = await fetchPlantInfo(species,getAuth().currentUser?.uid);

      // Set content and show modal
      setGeneratedContent(formatBoldText(response));
      setModalVisible(true);
    }
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
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
        Welcome to Plant Species Detection!
      </Text>
      <Image
        source={require('../../assets/images/Plant.png')} // Main banner image
        style={styles.image}
        resizeMode="contain"
      />
      <ThemedButton
        name="rick"
        type="primary"
        onPress={() =>
          requestCameraPermission(
            setModalVisible,
            setGeneratedContent,
            setSelectedImage
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
      {/* Updated carousel with plant-specific content */}
      {/* <PagerView style={[styles.pagerView, { marginTop: 40 }]} initialPage={0}>
        <View style={[styles.roundedBox, { padding: 20 }]} key="1">
          <Image
            source={require('../../assets/images/carousel_1.jpg')} // Moneyplant image
            style={[styles.image, { width: '100%', height: 300 }]}
            resizeMode="contain"
          />
          <Text style={[styles.slideText, isDarkMode ? styles.darkText : styles.lightText]}>
            Moneyplant: Known for its air-purifying qualities, the Moneyplant is believed to bring good luck and positive energy to your home.
          </Text>
        </View>
        <View style={styles.roundedBox} key="2">
          <Image
            source={require('../../assets/images/carousel_2.jpg')} // Tulsiplant image
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={[styles.slideText, isDarkMode ? styles.darkText : styles.lightText]}>
            Tulsi Plant: Revered in many cultures, Tulsi is a medicinal herb with numerous health benefits and a natural immunity booster.
          </Text>
        </View>
        <View style={styles.roundedBox} key="3">
          <Image
            source={require('../../assets/images/carousel_3.jpg')} // Jadeplant image
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={[styles.slideText, isDarkMode ? styles.darkText : styles.lightText]}>
            Jade Plant: A popular succulent, the Jade Plant is easy to care for and is thought to symbolize prosperity and friendship.
          </Text>
        </View>
      </PagerView> */}

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
  closeButtonContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
});


