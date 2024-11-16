import React from 'react';
import { Tabs } from 'expo-router';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import TabBar from 'rn-animated-wave-bottom-navigation';
import { SafeAreaView, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SearchPlants from '../screens/SearchPlants';
import Scanner from '../screens/Scanner';
import FavouritePlants from '../screens/FavouritePlants';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function AnimatedWaveBottomTab() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer>
        <Tab.Navigator
        initialRouteName="HomeScreen"
        screenOptions= {{
          tabBarShowLabel: false,
        }}
        tabBar={(props: BottomTabBarProps) => (
          <TabBar
            {...props} // Spread the props correctly
            numOfTabs={5} 
            icons={['home', 'search', 'camera', 'heart', 'settings']}
            
          />
        )}

      >
        <Tab.Group
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false
          }}
        >
          <Tab.Screen options={{ tabBarLabel: 'Home' }} name="HomeScreen" component={HomeScreen} />
          <Tab.Screen options={{ tabBarLabel: 'Search' }} name="Search" component={SearchPlants} />
          <Tab.Screen options={{ tabBarLabel: 'Scan' }} name="Scan" component={Scanner} />
          <Tab.Screen options={{ tabBarLabel: 'Library' }} name="Library" component={FavouritePlants} />
          <Tab.Screen options={{ tabBarLabel: 'Profile' }} name="Profile" component={ProfileScreen} />
        </Tab.Group>
      </Tab.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
});


