import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Colors from './src/styles/Colors';


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
            headerTitleStyle: {
              color: Colors.dark,
            },
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
            headerTitleStyle: {
              color: Colors.dark,
            },
          }}
          initialParams={{ importedAssets: [] }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}