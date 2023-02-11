import React, { useState, useEffect } from 'react';
import { Button, Checkbox, Text, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet } from 'react-native';



export default function FilterScreen({ navigation, route }) {
  const [photos, setPhotos] = useState([]);

  const { photoAssets } = route.params;

  const distilledExifData = photoAssets.map((photo) => {
    return {
      assetId: photo.assetId,
      DateTime: photo.exif.DateTime,
      uri: photo.uri,
      location: photo.exif.GPSLatitudeRef + photo.exif.GPSLatitude + photo.exif.GPSLongitudeRef + photo.exif.GPSLongitude,
    };
  });

  console.log('Distilled EXIF data: ', distilledExifData);


  const [selectedValue, setSelectedValue] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Time of Date</Text>
      <Picker style={styles.picker}
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
      >
        {distilledExifData.map((asset) => (
          <Picker.Item key={asset.assetId} label={asset.DateTime} value={asset.uri} />
        ))}
      </Picker>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    height: 50,
    width: 200,

  },
})