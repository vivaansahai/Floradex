import * as React from 'react';
import { View, Text, Button, PermissionsAndroid, StyleSheet, Image, useColorScheme } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemedButton } from 'react-native-really-awesome-button';
import { styles } from '@/hooks/styles';
import HomeScreen from '../screens/HomeScreen';
import PlantDetectionScreen from '../screens/PlantDetectionScreen';

// Stack navigator setup
const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PlantDetection" component={PlantDetectionScreen} />
    </Stack.Navigator>
  );
}