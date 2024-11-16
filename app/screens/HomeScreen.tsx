import * as React from 'react';
import { View, Text, Image, StyleSheet, useColorScheme, PermissionsAndroid } from 'react-native';
import { ThemedButton } from 'react-native-really-awesome-button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '@/hooks/styles';
import { green } from 'react-native-reanimated/lib/typescript/Colors';
import PagerView from 'react-native-pager-view';

const requestCameraPermission = async (navigation: any) => {
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
      navigation.navigate('Scan');
    } else {
      console.log('Camera permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

export default function HomeScreen({ navigation }: any) {
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
      {/* Updated Image source */}
      <Image
        source={require('../../assets/images/plant.png')} // Use relative path to your image file
        style={styles.image}
        resizeMode="contain"
      />
      <ThemedButton name="rick" type="primary" onPress={() => requestCameraPermission(navigation)}
        backgroundColor='lightgreen'
        textColor='green'
        borderColor='lightgreen'
        activityColor='green'
        raiseLevel={2}>
        Detect Plant Species
      </ThemedButton>
      <View style={styles.containercarousel}>
      <PagerView style={styles.container} initialPage={0}>
        <View style={styles.page} key="1">
          <Text>First page</Text>
          <Text>Swipe ➡️</Text>
        </View>
        <View style={styles.page} key="2">
          <Text>Second page</Text>
        </View>
        <View style={styles.page} key="3">
          <Text>Third page</Text>
        </View>
      </PagerView>
    </View>
    </View>
    
  );
}
