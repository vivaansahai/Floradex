import React from 'react';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBar from 'rn-animated-wave-bottom-navigation';
import { SafeAreaView, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SearchPlants from '../screens/SearchPlants';
import Scanner from '../screens/Scanner';
import FavouritePlants from '../screens/FavouritePlants';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const AnimatedWaveBottomTab = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <Tab.Navigator
        initialRouteName="HomeScreen"
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
          }}
        >
          <Tab.Screen options={{ tabBarLabel: 'Home' }} name="HomeScreen" component={HomeScreen} />
          <Tab.Screen options={{ tabBarLabel: 'Search' }} name="Search" component={SearchPlants} />
          <Tab.Screen options={{ tabBarLabel: 'Scan' }} name="Scan" component={Scanner} />
          <Tab.Screen options={{ tabBarLabel: 'Library' }} name="Library" component={FavouritePlants} />
          <Tab.Screen options={{ tabBarLabel: 'Profile' }} name="Profile" component={ProfileScreen} />
        </Tab.Group>
      </Tab.Navigator>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default AnimatedWaveBottomTab;
