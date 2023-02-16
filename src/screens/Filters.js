import React, { useState, useEffect, useCallback } from 'react';
import { Text, Platform, SafeAreaView, View } from 'react-native';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Location from 'expo-location';
import { uniqueElByProps } from '../utils/ArrayUtils';
import { formatDateTime } from '../utils/FormatUtils';
import IconTextButton from '../components/Button';

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
      let altAssets = assets;
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need location permissions to make this work!');
        } else {
          for (let i = 0; i < altAssets.length; i++) {
            if (altAssets[i].latitude === undefined || altAssets[i].longitude === undefined) {
              console.log('No GPS data for asset: ' + altAssets[i].uri);
              continue;
            } else {
              let location = await Location.reverseGeocodeAsync({
                latitude: altAssets[i].latitude,
                longitude: altAssets[i].longitude,
              });
              altAssets[i].city = location[0].city;
              altAssets[i].country = location[0].country;
              altAssets[i].district = location[0].district;
              altAssets[i].name = location[0].name;
              altAssets[i].postalCode = location[0].postalCode;
              altAssets[i].region = location[0].region;
              altAssets[i].street = location[0].street;
            }
          }
          console.log('Location data added to assets and distributed to locationItems');
          setAssets(altAssets);
          console.log(assets);
        }
      })();
    } else {
      console.log('Assets not transformed yet');
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
          name: null,
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

  function onClear() { // clears the filters
    console.log('Clearing filters');
    console.log(assets);
    // setGPSValues([]);
  }


  // const assetsSelected = filterAssetFilterer.length; // number of assets that match the selected filters

  const filtersSelected = dateValues.length; // number of filters that are selected

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
      {/* <DropDownPicker
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
      /> */}


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