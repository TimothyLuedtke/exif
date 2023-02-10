import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import PhotosScreen from './src/screens/Photos';
import FilterScreen from './src/screens/Filters';


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <StatusBar style="auto" /> */}
      <Tab.Navigator>
        <Tab.Screen name="Photos" component={PhotosScreen} />
        <Tab.Screen name="Filters" component={FilterScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}