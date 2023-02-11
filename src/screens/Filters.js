import React, { useState, useEffect, useCallback } from 'react';
import { Button, Text, SafeAreaView, View } from 'react-native';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function FilterScreen({ navigation, route }) {
  
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

  const { photoAssets } = route.params;

  useEffect(() => {
    setLocationItems(locationPickerItems);
    setDateTimeItems(dateTimePickerItems);
    console.log('The transfered photoAssets into Filters.js: ', photoAssets);
  }, [photoAssets]);

  const distilledExifData = photoAssets.map((photo) => {
    return {
      assetId: photo.assetId,
      DateTime: photo.exif.DateTime,
      uri: photo.uri,
      location: photo.exif.GPSLatitudeRef + photo.exif.GPSLatitude + photo.exif.GPSLongitudeRef + photo.exif.GPSLongitude,
    };
  });

  const locationPickerItems = distilledExifData.map((photo) => {
    return {
      label: photo.location,
      value: photo.location,
    };
  })

  const dateTimePickerItems = distilledExifData.map((photo) => {
    return {
      label: photo.DateTime,
      value: photo.DateTime,
    };
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
    console.log('Filtered photos that transport back to Photos.js: ', filteredPhotos);
    navigation.navigate('Photos', { filteredPhotos: filteredPhotos });
  }

  return (
    <SafeAreaView style={styles.container}>
        <Text>Selected Items</Text>
        {/* <Text>Location</Text>
        <Text>{locationValue}</Text>
        <Text>Date/Time</Text>
        <Text>{dateTimeValue}</Text> */}
      {/* location Dropdown */}
      {/* <DropDownPicker
        // schema={{
        //   label: 'label',
        //   value: 'value',
        //   icon: () => <Text>Icon</Text>,
        //   hidden: true,
        // }
        // }
        open={locationOpen}
        onOpen={onlocationOpen}
        value={locationValue}
        items={locationItems}
        setOpen={setLocationOpen}
        setValue={setLocationValue}
        setItems={setLocationItems}
        multiple={true}
        multipleText={`${locationValue}, `}
        min={0}
        max={10}
        zIndex={5000}
        zIndexInverse={1000}
        placeholder="Locations"
        // onChangeValue={value => console.log(value)}
        style={styles.picker}
      /> */}
      {/* DateTime Dropdown */}
      <DropDownPicker
        // schema={{
        //   label: 'label',
        //   value: 'value',
        //   icon: () => <Text>{ `${dateTimeValue},    `  }</Text>,
        //   hidden: true,
        // }
        // }
        open={dateTimeOpen}
        onOpen={onDateTimeOpen}
        value={dateTimeValue}
        items={dateTimeItems}
        setOpen={setDateTimeOpen}
        setValue={setDateTimeValue}
        setItems={setDateTimeItems}
        multiple={true}
        multipleText={`${dateTimeValue}`}
        min={0}
        max={10}
        zIndex={4000}
        zIndexInverse={2000}
        placeholder="Date/Time"
      style={styles.picker}
      />
      {/* Filter Button */}
      <Text onPress={onFilter}>Filter</Text>

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
    width: 300,
    marginHorizontal: 40,
    height: 40,
    borderRadius: 5,
    marginBottom: 10,
  },
  pickedItem: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    padding: 5,
    margin: 5,
  },
})