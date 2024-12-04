import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Image,
  Button,
  ScrollView,
  Alert,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { identifyPlant } from './Identification';
import { generateContent as fetchPlantInfo } from '../Utilities/location'; // Import fetchPlantInfo

const Scanner: React.FC = () => {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [generatedContent, setGeneratedContent] = useState([]);

  const cameraRef = useRef<CameraView | null>(null);

  // Function to format and set content
  const formatAndSetContent = (description: string) => {
    const parts = description.split(/(\*\*.*?\*\*)/); // Split text by **bold segments**
    const formattedContent = parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <Text key={index} style={{ fontWeight: 'bold', color: 'white' }}>
            {part.slice(2, -2)}
          </Text>
        );
      }
      return (
        <Text key={index} style={{ color: 'white' }}>
          {part}
        </Text>
      );
    });

    setGeneratedContent(formattedContent);
  };

  // Function to take a picture and handle identification
  async function toggleCameraFacingAndTakePicture() {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 1,
          base64: false,
          exif: false,
        });

        console.log('Picture taken:', photo.uri);
        setCapturedImage(photo.uri);

        // Identify the plant using the captured image
        const response = await identifyPlant(photo.uri);
        if (response?.species) {
          const plantName = response.species;

          // Fetch plant information and update content
          const plantDescription = await fetchPlantInfo(plantName);
          formatAndSetContent(plantDescription);

          setModalVisible(true);
        } else {
          Alert.alert('Error', 'Could not identify the plant.');
        }
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'An error occurred while processing the image.');
      }
    }
  }

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={toggleCameraFacingAndTakePicture}
          >
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      {/* Modal to display captured image and plant information */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.modalContainer}>
          <View style={modalStyles.modalContent}>
            {capturedImage && (
              <Image
                source={{ uri: capturedImage }}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  camera: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 100,
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  button: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 5,
  },
});

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
    backgroundColor: 'black',
    borderRadius: 15,
    padding: 20,
    elevation: 10,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: 'white',
  },
  selectedImage: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
  },
  text: {
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 24,
    color: 'white',
    textAlign: 'justify',
  },
});

export default Scanner;
