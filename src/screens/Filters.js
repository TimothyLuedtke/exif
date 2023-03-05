import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import * as Location from 'expo-location';
import { Containers, ModalStyle } from '../styles/GlobalStyles';
import { formatDateTime } from '../utils/formatUtils';
import { combineObjects, removeArrays } from '../utils/arrayUtils';
import { Closebtn, DropDownPicker, SubmitBtn, EditBtn, PlaceholderBtn } from '../components/buttons/FlatButtons';
import { IconBtn } from '../components/buttons/FloatingButtons';
import FilterMenu from '../components/buttons/FilterMenu';

export default function FilterScreen({ navigation, route }) {

  const importedAssets = route.params.importedAssets;
  const [assets, setAssets] = useState([]);
  const [masterAsset, setMasterAsset] = useState([]);
  const [keyCategories, setKeyCategories] = useState([]);
  const [exifKeys, setExifKeys] = useState([]);
  const [selectedExifKeys, setSelectedExifKeys] = useState([]);
  const [dataKeys, setDataKeys] = useState([]);
  const [selectedDataKeys, setSelectedDataKeys] = useState([]);
  const [uriVals, setUriVals] = useState([]);
  const [tags, setTags] = useState([]);
  const [filteringAsset, setFilteringAsset] = useState([]);

  // const [selectorKeys, setSelectorKeys] = useState([]);
  const [selectorKeyValues, setSelectorKeyValues] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [menuOpen, setMenuOpen] = useState(true);


  const [assetsTransformed, setAssetsTransformed] = useState(false);
  useEffect(() => {
    (async () => {
      if (importedAssets) {
        dataFiller();
        setAssetsTransformed(true);
      } else {
        console.log('No assets received in Filters.js');
      }
    })();
  }, [importedAssets]);

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (assetsTransformed === true) {
      let locatesParsed = importedAssets.map((asset) => {
        return asset.data;
      });
      // console.log('assets to locatesParsed: ', locatesParsed);
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
          // console.log('Parsed assets: ', importedAssets);
          const combinedAssets = combineObjects(importedAssets);
          setMasterAsset(combinedAssets);
          console.log('masterAsset: ', combinedAssets);
          setKeyCategories(Object.keys(combinedAssets));
          console.log('keyCategories: ', Object.keys(combinedAssets));
          setExifKeys(Object.keys(combinedAssets.exif));
          console.log('exifKeys: ', Object.keys(combinedAssets.exif));
          setDataKeys(Object.keys(combinedAssets.data));
          console.log('dataKeys: ', Object.keys(combinedAssets.data));
          setUriVals(Object.values(combinedAssets.uri));
          console.log('uriVals: ', Object.values(combinedAssets.uri));
          // setTags(Object.keys(combineObjects(importedAssets).tags));
          // console.log('tags: ', Object.keys(combineObjects(importedAssets).tags));
          setLoaded(true);
        }
      })();
    }
  }, [assetsTransformed === true]);

  const dataFiller = () => {
    if (importedAssets === undefined) {
      return;
    } else if (assetsTransformed === false) {
      return (
        importedAssets.map((photo) => {
          let dateTimeValue = formatDateTime(photo.exif.DateTime);
          let dateValue = photo.exif.DateTime !== undefined ? dateTimeValue.split('|')[0] : 'No data';
          let timeValue = photo.exif.DateTime !== undefined ? dateTimeValue.split('|')[1] : 'No data';
          let defaultData = {
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
          };
          photo.data = defaultData;
        })
      );
    } else {
      console.log('Assets already transformed...');
      setAssetsTransformed(true);
    }
  }

  function navigateToPhotos() {
    navigation.navigate('Photos');
  }

  function renderSelectorDropDown(obj, index) {
    const valuesArray = Object.values(obj)[0];
    // console.log('valuesArray: ', valuesArray);
    return (
      <View key={index}>
        <DropDownPicker
          btnLabel={Object.keys(obj)}
          values={valuesArray}
          selectedValues={selectedValues}
          setSelectedValues={setSelectedValues}
        />
      </View>
    );
  }

  return (
    <SafeAreaView style={Containers.container}>
      <View style={Containers.container}>
        {selectorKeyValues.length === 0 &&
          <View style={Containers.centered}>
            <PlaceholderBtn
              text="Add filters..."
              onPress={() => setMenuOpen(true)}
            />
          </View>
        }
        {selectorKeyValues.length > 0 &&
          <FlatList
            // contentContainerStyle={FlatBtn.btnContainer}
            data={selectorKeyValues}
            renderItem={({ item, index }) => renderSelectorDropDown(item, index)}
            keyExtractor={(item, index) => index.toString()}
          >
          </FlatList>
        }
      </View>

      {selectorKeyValues.length > 0 && menuOpen === false &&
        <View style={ModalStyle.bottomModal}>
          <View style={ModalStyle.modalClose}>
            <Closebtn
              onPress={() => {
                setSelectorKeyValues([]);
                setSelectedValues([]);
                navigateToPhotos();
              }}
            />
          </View>
          <View style={ModalStyle.modalHeader}>

          </View>
          <View style={ModalStyle.modalFooter}>
            <EditBtn
              text={`Clear (${selectedValues.length})`}
              onPress={() => {
                setSelectedValues([]);
              }}
            />
            <EditBtn
              text="Filters"
              onPress={() => setMenuOpen(true)}
            />
            {/* <SubmitBtn
              text="Apply"
              onPress={
            /> */}
          </View>
        </View>
      }

      <View style={Containers.menuContainer}>
        {menuOpen === false &&
          selectorKeyValues != undefined &&
          <IconBtn
            icon={'add'}
            onPress={() => setMenuOpen(true)}
          />
        }
        {menuOpen === true &&
        loaded === true &&
          <FilterMenu
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
            // setSelectorKeys={setSelectorKeys}
            setSelectorKeyValues={setSelectorKeyValues}
            masterAsset={masterAsset}
            setMasterAsset={setMasterAsset}
            setFilteringAsset={setFilteringAsset}
            exifKeys={exifKeys}
            selectedExifKeys={selectedExifKeys}
            setSelectedExifKeys={setSelectedExifKeys}
            dataKeys={dataKeys}
            selectedDataKeys={selectedDataKeys}
            setSelectedDataKeys={setSelectedDataKeys}
            uriVals={uriVals}
            // tags={tags}
          />
        }
      </View>
    </SafeAreaView>
  );
};