import * as React from 'react';
import { View, Text, Image, StyleSheet, useColorScheme, PermissionsAndroid } from 'react-native';
import { ThemedButton } from 'react-native-really-awesome-button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '@/hooks/styles';
import PagerView from 'react-native-pager-view';
import { identifyPlant } from './Identification'; // Import the identifyPlant function

const requestCameraPermission = async () => {
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
      const species = await identifyPlant();
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export default function HomeScreen() {
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
        onPress={requestCameraPermission} // Execute API call on button press
        backgroundColor="lightgreen"
        textColor="green"
        borderColor="lightgreen"
        activityColor="green"
        raiseLevel={2}
      >
        Detect Plant Species
      </ThemedButton>
      {/* Updated carousel with plant-specific content */}
      <PagerView style={[styles.pagerView, { marginTop: 40 }]} initialPage={0}>
        <View style={[styles.roundedBox, {padding:20}]} key="1">
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
      </PagerView>
    </View>
  );
}


