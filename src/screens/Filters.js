import React, { useState, useEffect, useCallback } from 'react';
import { Text, Platform, SafeAreaView, View } from 'react-native';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Location from 'expo-location';
import { uniqueElByProps } from '../utils/ArrayUtils';
import IconTextButton from '../components/Button';

export default function FilterScreen({ navigation, route }) {

  const importedAssets = route.params.importedAssets;

  const [assets, setAssets] = useState([]);

  const [selectedValues, setSelectedValues] = useState([]);

  const [gpsValues, setGPSValues] = useState([]);
  const [gpsItems, setGPSItems] = useState([]);

  const [dateValues, setDateValues] = useState([]);
  const [dateItems, setDateItems] = useState([]);

  // sets the date/time picker to close when the location picker is opened
  const [gpsPickerOPEN, setGPSPickerOPEN] = useState(false);
  const onGPSPickerOPEN = useCallback(() => {
    setGPSPickerOPEN(true);
    setDatePickerOPEN(false);
  }, []);

  // sets the date picker to close when the location picker is opened
  const [datePickerOPEN, setDatePickerOPEN] = useState(false);
  const onDatePickerOPEN = useCallback(() => {
    setDatePickerOPEN(true);
    setGPSPickerOPEN(false);
  }, []);

  useEffect(() => { // sets the gpsItems and dateTimeItems to the values of the selected filters
    (async () => {
      setGPSItems(uniqueElByProps(assets, 'gpsValue'));
      setDateItems(uniqueElByProps(assets, 'dateTimeValue'));
      console.log('Assets distributed to filter dropdowns from Filters.js: ')
      // console.log(assets);
    })();
  }, [assets]);

  useEffect(() => {
    (async () => {
      if (importedAssets) {
        assetTransformer();
        console.log('Assets received in Filters.js: ');
      } else {
        console.log('No assets received in Filters.js');
      }
    })();
  }, [importedAssets]);
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need location permissions to make this work!');
      } else {
        for (let i = 0; i < assets.length; i++) {
          let location = await Location.reverseGeocodeAsync({
            latitude: assets[i].latitude,
            longitude: assets[i].longitude,
          });
          assets[i].city = location[0].city;
          assets[i].country = location[0].country;
          assets[i].district = location[0].district;
          assets[i].name = location[0].name;
          assets[i].postalCode = location[0].postalCode;
          assets[i].region = location[0].region;
          assets[i].street = location[0].street;
        }
        console.log('Location data added to assets and distributed to locationItems');
      }
    })();
  }, [importedAssets, assets]);
  


  const assetTransformer = () => {
    return setAssets(
      importedAssets.map((photo) => { // maps the assets to an array of objects with the values of the selected filters
        return {
          uri: photo.uri,
          city: null,
          country: null,
          district: null,
          name: null,
          postalCode: null,
          region: null,
          street: null,
          gpsLabel: (photo.exif.GPSLatitude + ', ' + photo.exif.GPSLongitude) !== ("undefined, undefined") ? photo.exif.GPSLatitude + ', ' + photo.exif.GPSLongitude : 'No GPS data',
          gpsValue: photo.exif.GPSLatitude + photo.exif.GPSLongitude,
          latitude: photo.exif.GPSLatitude,
          longitude: photo.exif.GPSLongitude,
          timeValue: photo.exif.DateTime !== undefined ? photo.exif.DateTime.split(' ')[1] : 'No time data',
          dateValue: photo.exif.DateTime !== undefined ? photo.exif.DateTime.split(' ')[0] : 'No date data',
          customTags: photo.customTags,
        };
      })
    );
  }

  const condensedAssets = () => {
    let masterArray = [];
    masterArray = gpsValues.concat(dateTimeValue);
    masterArray.reduce((acc, curr) => {
      if (acc[curr]) {
        acc[curr]++;
      } else {
        acc[curr] = 1;
      }
      return acc;
    }, {});
    masterArray.filter((item) => {
      return item.uri;
    });
    setURLValues(masterArray);
    console.log('Master Array: ', masterArray);
  }


  // const filterAssetFilterer = assetTransformer.filter((photo) => { // filters the assets based on the selected filters
  //   for (let i = 0; i < gpsValues.length; i++) {
  //     if (gpsValues[i] === photo.gpsValues) {
  //       return photo.uri;
  //     } else {
  //       console.log('No matching assets based on gps location');
  //     }
  //   }
  //   for (let i = 0; i < dateTimeValue.length; i++) {
  //     if (dateTimeValue[i] === photo.DateTimeValue) {
  //       return photo.uri;
  //     } else {
  //       console.log('No matching assets based on date/time');
  //     }
  //   }
  // });

  // const filteredAssets = assets.map((photo) => { // maps the assets to an array of objects with the values of the selected filters
  //   for (let i = 0; i < filterAssetFilterer.length; i++) {
  //     if (filterAssetFilterer[i].uri === photo.uri) {
  //       return photo;
  //     } else {
  //       console.log('Returns no filtered assets');
  //     }
  //   }
  //   console.log('Assets: ', assetTransformer);
  //   console.log('Filtered Assets: ', filterAssetFilterer);
  //   console.log('Assets Returned: ', filteredAssets);
  // });



  // const filteredAssets = assets.filter((photo) => { // filters the assets based on the selected filters
  //   if (gpsValues.length > 0 && dateTimeValue.length > 0) {  // if both filters are selected
  //     return gpsValues.includes(photo.exif.GPSLatitude + ', ' + photo.exif.GPSLongitude)
  //       && dateTimeValue.includes(photo.exif.DateTime);
  //   } else if (gpsValues.length > 0) {  // if only the location filter is selected
  //     return gpsValues.includes(photo.exif.GPSLatitude + ', ' + photo.exif.GPSLongitude);
  //   } else if (dateTimeValue.length > 0) { // if only the date/time filter is selected
  //     return dateTimeValue.includes(photo.exif.DateTime);
  //   } else {
  //     return photo; // if no filters are selected
  //   }
  // });

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
    setGPSValues([]);
  }


  // const assetsSelected = filterAssetFilterer.length; // number of assets that match the selected filters

  const filtersSelected = gpsValues.length // number of filters that have been selected

  return (
    <SafeAreaView style={styles.container}>
      {
        // assetsSelected === 1 ? (
        //   <Text style={{ fontSize: 18, margin: 20 }}>{assetsSelected} result</Text>
        // ) : (
        //   <Text style={{ fontSize: 18, margin: 20 }}>{assetsSelected} results</Text>
        // )
      }
      {/* location Dropdown */}
      <DropDownPicker
        open={gpsPickerOPEN}
        onOpen={onGPSPickerOPEN}
        key={gpsValues}
        schema={{
          label: 'gpsLabel',
          value: 'gpsValue',
          containerStyle: { zIndex: 2 },
        }}
        value={gpsValues}
        items={gpsItems}
        setOpen={setGPSPickerOPEN}
        setValue={setGPSValues}
        setItems={setGPSItems}
        multiple={true}
        // multipleText={`${gpsValues}, `}
        min={0}
        max={10}
        // zIndexInverse={}
        mode="BADGE"
        placeholder="GPS Location"
      />

      {filtersSelected === 1 ? (
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