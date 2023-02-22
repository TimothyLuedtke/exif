import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import PhotosScreen from './src/screens/Photos';
import FilterScreen from './src/screens/Filters';


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <StatusBar style='auto' />
      <Stack.Navigator>
        <Stack.Screen
          name="Photos"
          component={PhotosScreen}
          options={{
            // headerTransparent: true,
            headerTitle: 'Photos',
            headerTitleAlign: 'center',
          }}
          initialParams={{ filteredAssets: [] }}
        />
        <Stack.Screen
          name="Filters"
          component={FilterScreen}
          options={{
            // headerTransparent: true,
            headerTitle: 'Filters',
            headerTitleAlign: 'center',
          }}
          initialParams={{ importedAssets: [] }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}