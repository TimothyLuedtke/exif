import React, { useState, useEffect, useCallback } from 'react';
import { Button, Text, SafeAreaView, View } from 'react-native';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function FilterScreen({ navigation, route }) {

  const { photoAssets } = route.params;

  const [locationValue, setLocationValue] = useState([]);
  const [locationItems, setLocationItems] = useState([]);

  const [dateTimeValue, setDateTimeValue] = useState([]);
  const [dateTimeItems, setDateTimeItems] = useState([]);

  // sets the date/time picker to close when the location picker is opened
  const [locationOpen, setLocationOpen] = useState(false);
  const onlocationOpen = useCallback(() => {
    setDateTimeOpen(false);
  }, []);

  // sets the location picker to close when the date/time picker is opened
  const [dateTimeOpen, setDateTimeOpen] = useState(false);
  const onDateTimeOpen = useCallback(() => {
    setLocationOpen(false);
  }, []);

  useEffect(() => {
    setLocationItems(filterAssets);
    setDateTimeItems(filterAssets);
    console.log('PhotoAssets received in Filters.js: ')
    console.log(filterAssets);
  }, [photoAssets]);

  const filterAssets = photoAssets.map((photo) => {
    if (photo.exif.DateTime !== undefined && photo.exif.GPSLatitudeRef !== undefined && photo.exif.GPSLatitude !== undefined && photo.exif.GPSLongitudeRef !== undefined && photo.exif.GPSLongitude !== undefined) {
      return {
        // DateTimeLabel: photo.exif.DateTime,
        DateTimeValue: photo.exif.DateTime,
        // locationLabel: photo.exif.GPSLatitudeRef + photo.exif.GPSLatitude + photo.exif.GPSLongitudeRef + photo.exif.GPSLongitude,
        locationValue: photo.exif.GPSLatitudeRef + photo.exif.GPSLatitude + photo.exif.GPSLongitudeRef + photo.exif.GPSLongitude,
      };
    } else if (photo.exif.DateTime !== undefined) {
      return {
        // DateTimeLabel: photo.exif.DateTime,
        DateTimeValue: photo.exif.DateTime,
      };
    } else if (photo.exif.GPSLatitudeRef !== undefined && photo.exif.GPSLatitude !== undefined && photo.exif.GPSLongitudeRef !== undefined && photo.exif.GPSLongitude !== undefined) {
      return {
        // locationLabel: photo.exif.GPSLatitudeRef + photo.exif.GPSLatitude + photo.exif.GPSLongitudeRef + photo.exif.GPSLongitude,
        locationValue: photo.exif.GPSLatitudeRef + photo.exif.GPSLatitude + photo.exif.GPSLongitudeRef + photo.exif.GPSLongitude,
      };
    }
  }); 

  function onFilter() {
    console.log('Location value: ', locationValue);
    console.log('Date/Time value: ', dateTimeValue);
    const filteredPhotos = photoAssets.filter((photo) => {
      if (locationValue.length > 0 && dateTimeValue.length > 0) {
        return locationValue.includes(photo.exif.GPSLatitudeRef + photo.exif.GPSLatitude + photo.exif.GPSLongitudeRef + photo.exif.GPSLongitude) && dateTimeValue.includes(photo.exif.DateTime);
      } else if (locationValue.length > 0) {
        return locationValue.includes(photo.exif.GPSLatitudeRef + photo.exif.GPSLatitude + photo.exif.GPSLongitudeRef + photo.exif.GPSLongitude);
      } else if (dateTimeValue.length > 0) {
        return dateTimeValue.includes(photo.exif.DateTime);
      } else {
        return photo;
      }
    });
    console.log('Transfering filteredPhotos to Photos.js: ', filteredPhotos);
    navigation.navigate('Photos', { filteredPhotos: filteredPhotos });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text>Selected Items</Text>
      {/* location Dropdown */}
      <DropDownPicker
        open={locationOpen}
        onOpen={onlocationOpen}
        schema={{
          label: 'locationValue',
          value: 'locationValue',
        }}
        value={locationValue}
        items={locationItems}
        setOpen={setLocationOpen}
        setValue={setLocationValue}
        setItems={setLocationItems}
        multiple={true}
        multipleText={`${locationValue}, `}
        min={0}
        max={10}
        zIndex={4000}
        zIndexInverse={2000}
        placeholder="Location"
      />
      {/* DateTime Dropdown */}
      <DropDownPicker
        open={dateTimeOpen}
        onOpen={onDateTimeOpen}
        schema={{
          label: 'DateTimeValue',
          value: 'DateTimeValue',
        }}
        value={dateTimeValue}
        items={dateTimeItems}
        setOpen={setDateTimeOpen}
        setValue={setDateTimeValue}
        setItems={setDateTimeItems}
        multiple={true}
        multipleText={`${dateTimeValue}, `}
        min={0}
        max={10}
        zIndex={5000}
        zIndexInverse={1000}
        placeholder="Date/Time"
      />
      {/* Filter Button */}
      <Text onPress={onFilter} style={styles.button}>Filter</Text>

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
  button: {
    padding: 7,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    textAlign: 'center',
  },
})