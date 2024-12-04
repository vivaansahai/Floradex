import React from 'react';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {NavigationIndependentTree} from '@react-navigation/native';
import TabBar from 'rn-animated-wave-bottom-navigation';
import { SafeAreaView, StyleSheet } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import SearchPlants from '../screens/SearchPlants';
import Scanner from '../screens/Scanner';
import FavouritePlants from '../screens/FavouritePlants';
import DataFetch from '../screens/DataFetch';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export function AnimatedWaveBottomTab() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationIndependentTree>
        <Tab.Navigator
        initialRouteName="HomeScreen"
        screenOptions= {{
          headerShown: false,
          tabBarShowLabel: false,
        }}
        tabBar={(props: BottomTabBarProps) => (
          <TabBar
            {...props} // Spread the props correctly
            numOfTabs={5} 
            icons={['home', 'search', 'camera', 'heart', 'user']}
            
          />
        )}

      >
        <Tab.Group
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: 'black',
            },
          }
        }
        >
          <Tab.Screen options={{ tabBarLabel: 'Home' }} name="HomeScreen" component={HomeScreen} />
          <Tab.Screen options={{ tabBarLabel: 'Search' }} name="Search" component={SearchPlants} />
          <Tab.Screen options={{ tabBarLabel: 'Scan' }} name="Scan" component={Scanner} />
          <Tab.Screen options={{ tabBarLabel: 'Library' }} name="Library" component={DataFetch} />
          <Tab.Screen options={{ tabBarLabel: 'Profile' }} name="Profile" component={ProfileScreen} />
        </Tab.Group>
      </Tab.Navigator>
    </NavigationIndependentTree>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
});


