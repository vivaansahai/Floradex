import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { SafeAreaView, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SearchPlants from '../screens/SearchPlants';
import Scanner from '../screens/Scanner';
import DataFetch from '../screens/DataFetch';
import ProfileScreen from '../screens/ProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons'; // For icons

const Tab = createBottomTabNavigator();

export function SimpleBottomTab() {
  return (
    <NavigationIndependentTree>
      <SafeAreaView style={styles.safeArea}>
        <Tab.Navigator
          initialRouteName="HomeScreen"
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: 'black', // Bottom bar color
              height: 80, // Increased height for the bottom tab bar
              paddingBottom: 10, // Adjust padding for icons
              paddingTop: 10, // Adjust padding for icons
            },
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'HomeScreen') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Search') {
                iconName = focused ? 'search' : 'search-outline';
              } else if (route.name === 'Scan') {
                iconName = focused ? 'camera' : 'camera-outline';
              } else if (route.name === 'Library') {
                iconName = focused ? 'heart' : 'heart-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'green', // Selected icon color
            tabBarInactiveTintColor: 'gray', // Unselected icon color
          })}
        >
          <Tab.Screen name="HomeScreen" component={HomeScreen} />
          <Tab.Screen name="Scan" component={Scanner} />
          <Tab.Screen name="Library" component={DataFetch} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </SafeAreaView>
    </NavigationIndependentTree>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
});
