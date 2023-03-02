import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { Containers } from '../styles/GlobalStyles';
import { formatDateTime } from '../utils/formatUtils';
import { getUniqueKeys, getUniqueValues, getKeyValues } from '../utils/arrayUtils';
import { DropDownPicker } from '../components/buttons/FlatButtons';
import FilterMenu from '../components/buttons/FilterMenu';
export default function FilterScreen({ navigation, route }) {

  const importedAssets = route.params.importedAssets;
  const rawExif = importedAssets.map((asset) => {
    return asset.exif;
  });

  const [assets, setAssets] = useState([]);
  const [parsedKeys, setParsedKeys] = useState([]);
  const [parsedKeyValues, setParsedKeyValues] = useState([]);
  const [exifKeys, setExifKeys] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectorKeys, setSelectorKeys] = useState([]);
  const [selectorKeyValues, setSelectorKeyValues] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);



  const [assetsTransformed, setAssetsTransformed] = useState(false);
  useEffect(() => {
    (async () => {
      if (importedAssets) {
        tagsParser();
        setAssets(dateTimeParser());
        setAssetsTransformed(true);
        console.log('Assets received in Filters.js: ', importedAssets);
        // console.log('Raw EXIF data received in Filters.js: ');
        // console.log(rawExif);
      } else {
        console.log('No assets received in Filters.js');
      }
    })();
  }, [importedAssets]);

  // parses importedAssets and adds location data to each asset
  useEffect(() => {
    if (assetsTransformed) {
      let locatesParsed = assets;
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need location permissions to make this work!');
        } else {
          for (let i = 0; i < locatesParsed.length; i++) {
            if (locatesParsed[i].latitude === undefined || locatesParsed[i].longitude === undefined) {
              console.log('No GPS data for asset: ' + locatesParsed[i].uri);
              continue;
            } else {
              let location = await Location.reverseGeocodeAsync({
                latitude: locatesParsed[i].latitude,
                longitude: locatesParsed[i].longitude,
              });
              locatesParsed[i].city = location[0].city;
              locatesParsed[i].country = location[0].country;
              locatesParsed[i].district = location[0].district;
              locatesParsed[i].postalCode = location[0].postalCode;
              locatesParsed[i].region = location[0].region;
              locatesParsed[i].subregion = location[0].subregion;
              locatesParsed[i].street = location[0].street;
              locatesParsed[i].cityState = location[0].city + ', ' + location[0].region;
              locatesParsed[i].address = location[0].name + ' ' + location[0].street;
              locatesParsed[i].fullAddress = location[0].name + ' ' + location[0].street + ', ' + location[0].city + ', ' + location[0].region + ' ' + location[0].postalCode;
            }
            importedAssets[i].data = locatesParsed[i];
          }
          setAssets(locatesParsed);
          setParsedKeys(getUniqueKeys(locatesParsed));
          setExifKeys(getUniqueKeys(rawExif));
          console.log("assets set to locatedParsed data...", locatesParsed);
        }
      })();
    } else {
      console.log('Assets not transformed yet...');
    }
  }, [assetsTransformed === true, assets.length > 0]);

  const dateTimeParser = () => {
    return (
      importedAssets.map((photo) => {
        let dateTimeValue = formatDateTime(photo.exif.DateTime);
        let dateValue = photo.exif.DateTime !== undefined ? dateTimeValue.split('|')[0] : 'No data';
        let timeValue = photo.exif.DateTime !== undefined ? dateTimeValue.split('|')[1] : 'No data';
        return {
          latitude: photo.exif.GPSLatitude,
          longitude: photo.exif.GPSLongitude,
          date: dateValue,
          time: timeValue,
          city: 'No data',
          country: 'No data',
          district: 'No data',
          postalCode: 'No data',
          region: 'No data',
          subregion: 'No data',
          street: 'No data',
          cityState: 'No data',
          address: 'No data',
          fullAddress: 'No data',
          uri: photo.uri,
        };
      })
    );
  }

  const tagsParser = () => {
    let uniqueTags = [];
    for (let i = 0; i < importedAssets.length; i++) {
      if (importedAssets[i].tags !== undefined) {
        uniqueTags = uniqueTags.concat(importedAssets[i].tags);
      }
    }
    setTags(uniqueTags.filter((item, index) => { return uniqueTags.indexOf(item) === index; }));
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


  return (
    <SafeAreaView style={Containers.container}>
      {/* <View style={Containers.container}>

      </View> */}
      <DropDownPicker
        btnLabel = {'KeyVal'}
        values = {['value1', 'value2', 'value3']}
        selectedValues = {selectedValues}
        setSelectedValues = {setSelectedValues}
        />

<View style={Containers.menuContainer}>
      <FilterMenu
        assets={assets}
        parsedKeys={parsedKeys}
        exifKeys={exifKeys}
        tags={tags}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        setSelectorKeys={setSelectorKeys}
        setSelectorKeyValues={setSelectorKeyValues}
        selectorKeys={selectorKeys}
      />
    </View>

    </SafeAreaView>
  );
};
