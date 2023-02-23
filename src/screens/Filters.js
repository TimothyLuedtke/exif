import React, { useState, useEffect, useCallback } from 'react';
import { Text, SafeAreaView, View } from 'react-native';
import * as Location from 'expo-location';
import { Containers, Row } from '../styles/GlobalStyles';
import { uniqueElByProps } from '../utils/arrayUtils';
import { formatDateTime } from '../utils/formatUtils';

export default function FilterScreen({ navigation, route }) {

  const importedAssets = route.params.importedAssets;

  const [assets, setAssets] = useState([]);

  // const [gpsValues, setGPSValues] = useState([]);
  // const [gpsItems, setGPSItems] = useState([]);

  const [dateValues, setDateValues] = useState([]);
  const [dateItems, setDateItems] = useState([]);

  // const [gpsPickerOPEN, setGPSPickerOPEN] = useState(false);
  // const onGPSPickerOPEN = useCallback(() => {
  //   setGPSPickerOPEN(true);
  //   setDatePickerOPEN(false);
  // }, []);

  const [datePickerOPEN, setDatePickerOPEN] = useState(false);
  const onDatePickerOPEN = useCallback(() => {
    setDatePickerOPEN(true);
    // setGPSPickerOPEN(false);
  }, []);

  useEffect(() => {
    (async () => {
      // setGPSItems(uniqueElByProps(assets, 'gpsValue'));
      setDateItems(uniqueElByProps(assets, 'dateTimeValue'));
      console.log('Assets distributed to filter dropdowns from Filters.js: ')
      // console.log(assets);
    })();
  }, [assets.length > 0, assetsTransformed]);

  const [assetsTransformed, setAssetsTransformed] = useState(false);
  useEffect(() => {
    (async () => {
      if (importedAssets) {
        assetTransformer();
        setAssetsTransformed(true);
        console.log('Assets received in Filters.js: ');
      } else {
        console.log('No assets received in Filters.js');
      }
    })();
  }, [importedAssets]);

  useEffect(() => {
    if (assetsTransformed) {
      let locateAssets = assets;
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need location permissions to make this work!');
        } else {
          for (let i = 0; i < locateAssets.length; i++) {
            if (locateAssets[i].latitude === undefined || locateAssets[i].longitude === undefined) {
              console.log('No GPS data for asset: ' + locateAssets[i].uri);
              continue;
            } else {
              let location = await Location.reverseGeocodeAsync({
                latitude: locateAssets[i].latitude,
                longitude: locateAssets[i].longitude,
              });
              locateAssets[i].city = location[0].city;
              locateAssets[i].country = location[0].country;
              locateAssets[i].district = location[0].district;
              locateAssets[i].postalCode = location[0].postalCode;
              locateAssets[i].region = location[0].region;
              locateAssets[i].street = location[0].street;
            }
          }
          console.log('Location data added to assets and distributed to locationItems:');
          setAssets(locateAssets);
          console.log(assets);
        }
      })();
    } else {
      console.log('Assets not transformed yet...');
    }
  }, [assetsTransformed === true, assets.length > 0]);


  const assetTransformer = () => {

    return setAssets(
      importedAssets.map((photo) => {
        let dateTimeValue = formatDateTime(photo.exif.DateTime);
        let dateValue = photo.exif.DateTime !== undefined ? dateTimeValue.split('|')[0] : 'No date data';
        let timeValue = photo.exif.DateTime !== undefined ? dateTimeValue.split('|')[1] : 'No time data';

        return {
          uri: photo.uri,
          city: null,
          country: null,
          district: null,
          postalCode: null,
          region: null,
          street: null,
          latitude: photo.exif.GPSLatitude,
          longitude: photo.exif.GPSLongitude,
          dateValue: dateValue,
          timeValue: timeValue,
          customTags: photo.customTags,
        };
      })
    );
  }



  function navigateToPhotos() {
    if (filteredAssets.length > 0) {
      console.log('Sending filtered assets to Photos.js');
      navigation.navigate('Photos', { filteredAssets: filteredAssets });
    } else {
      console.log('No photos match the selected filters');
      alert('No photos match the selected filters');
    }
  }
  function backToPhotos() {
    console.log('Going back to Photos.js without filtering');
    navigation.navigate('Photos');
  }

  function onClear() { // clears the filters
    console.log('Clearing filters');
    console.log(assets);
    // setGPSValues([]);
  }


  // const assetsSelected = filterAssetFilterer.length; // number of assets that match the selected filters

  const filtersSelected = dateValues.length; // number of filters that are selected

  return (
    <SafeAreaView style={Containers.container}>

    </SafeAreaView>
  );
};