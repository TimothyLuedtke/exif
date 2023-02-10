import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Text, View } from 'react-native';
import { retrieveData } from '../storage/AsyncStorage';
import { StyleSheet } from 'react-native';


export default function FilterScreen({ navigation }) {
  const [photos, setPhotos] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState([]);

  useEffect(() => {
    (async () => {
      const photosData = await retrieveData('photos');
      setPhotos(JSON.parse(photosData));
    })();
  }, []);

  // const handleLocationSelect = (location) => {
  //   if (selectedLocations.includes(location)) {
  //     setSelectedLocations(selectedLocations.filter((loc) => loc !== location));
  //   } else {
  //     setSelectedLocations([...selectedLocations, location]);
  //   }
  // };

  // const filterPhotos = () => {
  //   const filteredPhotos = photos.filter((photo) => {
  //     return selectedLocations.includes(photo.location);
  //   });
  //   navigation.navigate('Photos', { filteredPhotos });
  // };

  return (
    <View style={styles.container}>
      {/* {photos.map((photo) => (
        <CheckBox
          key={photo.uri}
          title={photo.location}
          onPress={() => handleLocationSelect(photo.location)}
        />
      ))} */}
      {/* <Button title="Apply Filter" onPress={filterPhotos} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});