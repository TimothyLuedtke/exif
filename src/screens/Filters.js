import React, { useState, useEffect, useCallback } from 'react';
import { Text, SafeAreaView, View } from 'react-native';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import IconTextButton from '../components/Button';

export default function FilterScreen({ navigation, route }) {

  const [displayedAssets, setDisplayedAssets] = useState([]);

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

  useEffect(() => { // sets the locationItems and dateTimeItems to the values of the selected filters
    (async () => {
      // setLocationItems(removeDuplicates(assetFilterer, 'locationValue')); 
      // setDateTimeItems(removeDuplicates(assetFilterer, 'DateTimeValue'));
      setLocationItems(assetFilterer);
      setDateTimeItems(assetFilterer);
      console.log('Assets distributed to filter dropdowns from Filters.js: ')
      // console.log(displayedAssets);
      console.log(assetFilterer);
    })();
  }, [displayedAssets]);

  useEffect(() => { // sets the displayedAssets to the assets received from the Photos.js screen
    (async () => {
      if (route.params) {
        setDisplayedAssets(route.params.displayedAssets);
        console.log('Assets received in Filters.js: ')
      } else {
        console.log('No assets received in Filters.js');
      }
    })();
  }, [route.params]);

  const assetFilterer = displayedAssets.map((photo) => { // maps the assets to an array of objects with the values of the selected filters
    if (photo.exif.DateTime !== undefined 
      && photo.exif.GPSLatitude !== undefined  
      && photo.exif.GPSLongitude !== undefined) {
      return {
        DateTimeValue: photo.exif.DateTime,
        locationValue: photo.exif.GPSLatitude + ', ' + photo.exif.GPSLongitude,
      };
    } else if (photo.exif.DateTime !== undefined) {
      return {
        DateTimeValue: photo.exif.DateTime,
      };
    } else if (photo.exif.GPSLatitude !== undefined 
      && photo.exif.GPSLongitude !== undefined) {
      return {
        locationValue: photo.exif.GPSLatitude + ', ' + photo.exif.GPSLongitude,
      };
    }
  });

  const filteredAssets = displayedAssets.filter((photo) => { // filters the assets based on the selected filters
    if (locationValue.length > 0 && dateTimeValue.length > 0) {  // if both filters are selected
      return locationValue.includes(photo.exif.GPSLatitude + ', ' + photo.exif.GPSLongitude) 
      && dateTimeValue.includes(photo.exif.DateTime);
    } else if (locationValue.length > 0) {  // if only the location filter is selected
      return locationValue.includes(photo.exif.GPSLatitude + ', ' + photo.exif.GPSLongitude);
    } else if (dateTimeValue.length > 0) { // if only the date/time filter is selected
      return dateTimeValue.includes(photo.exif.DateTime);
    } else {
      return photo; // if no filters are selected
    }
  });

  function navigateToPhotos() { // navigates to the Photos screen with the filtered assets
    if (filteredAssets.length > 0) {
      console.log('Sending filtered assets to Photos.js');
      navigation.navigate('Photos', { filteredAssets: filteredAssets });
    } else {
      console.log('No photos match the selected filters');
      alert('No photos match the selected filters');
    }
  }

  function onClear() { // clears the filters
    console.log('Clearing filters');
    setLocationValue([]);
    setDateTimeValue([]);
  }

  
  const assetsSelected = filteredAssets.length; // number of assets that match the selected filters

  const filtersSelected = locationValue.length + dateTimeValue.length; // number of filters that have been selected

  return (
    <SafeAreaView style={styles.container}>
      {
        assetsSelected === 1 ? (
          <Text style={{ fontSize: 18, margin: 20 }}>{assetsSelected} result</Text>
        ) : (
          <Text style={{ fontSize: 18, margin: 20 }}>{assetsSelected} results</Text>
        )
      }
      {/* location Dropdown */}
      <DropDownPicker
        open={locationOpen}
        onOpen={onlocationOpen}
        key={locationValue}
        schema={{
          label: 'locationValue',
          value: 'locationValue',
          containerStyle: { zIndex: 2 },
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
        // zIndexInverse={}
        mode="BADGE"
        placeholder="Location"
      />
      {/* DateTime Dropdown */}
      {/* <DropDownPicker
        open={dateTimeOpen}
        onOpen={onDateTimeOpen}
        key={dateTimeValue}
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
        zIndex={1}
        // zIndexInverse={}
        mode="BADGE"
        placeholder="Date/Time"
      /> */}

        { filtersSelected === 1 ? (
          <Text style={{ fontSize: 18, margin: 20 }}>{filtersSelected} filter selected</Text>
        ) : (
          <Text style={{ fontSize: 18, margin: 20 }}>{filtersSelected} filters selected</Text>
        )}
      <View style={styles.inline}>
        <IconTextButton
          iconName={'refresh'}
          text={'Clear'}
          onPress={onClear}
        />
        <IconTextButton
          iconName={'filter-alt'}
          text={'Apply'}
          onPress={navigateToPhotos}
        />
      </View>
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
  inline: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
})