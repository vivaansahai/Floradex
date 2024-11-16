import { styles } from '@/hooks/styles';
import * as React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

export default function PlantDetectionScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <View style={[styles.container, isDarkMode ? styles.darkContainer : styles.lightContainer]}>
      <Text style={[styles.title, isDarkMode ? styles.darkText : styles.lightText]}>
        Plant Detection Screen
      </Text>
      <Text style={isDarkMode ? styles.darkText : styles.lightText}>
        Camera would open here for plant species detection...
      </Text>
    </View>
  );
}

