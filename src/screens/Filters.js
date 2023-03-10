import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, View } from 'react-native';
import * as Location from 'expo-location';
import { Containers, FlatBtn, ModalStyle } from '../styles/GlobalStyles';
import { formatDateTime } from '../utils/formatUtils';
import { combineObjects } from '../utils/arrayUtils';
import { removeEmptyUniqueVals } from '../utils/objUtils';
import { Closebtn, DropDownPicker, EditBtn, PiecedBtn, PlaceholderBtn, SubmitBtn } from '../components/buttons/FlatButtons';
import { IconBtn } from '../components/buttons/FloatingButtons';
import FilterMenu from '../components/buttons/FilterMenu';

export default function FilterScreen({ navigation, route }) {

  const importedAssets = route.params.importedAssets;
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [masterAsset, setMasterAsset] = useState([]);
  const [exifKeys, setExifKeys] = useState([]);
  const [selectedExifKeys, setSelectedExifKeys] = useState([]);
  const [dataKeys, setDataKeys] = useState([]);
  const [selectedDataKeys, setSelectedDataKeys] = useState([]);

  // const [selectorKeys, setSelectorKeys] = useState([]);
  const [selectorKeyValues, setSelectorKeyValues] = useState([]);
  const [selectedKeyValues, setSelectedKeyValues] = useState([]);
  const [menuOpen, setMenuOpen] = useState(true);

  const [assetsTransformed, setAssetsTransformed] = useState(false);
  useEffect(() => {
    (async () => {
      if (importedAssets) {
        console.log('Assets received in Filters.js: ', importedAssets);
        dataFiller();
        setAssetsTransformed(true);
      } else {
        console.log('No assets received in Filters.js');
      }
    })();
  }, [importedAssets]);

  const dataFiller = () => {
    if (importedAssets === undefined) {
      return;
    } else if (assetsTransformed === false) {
      return (
        importedAssets.map((photo) => {
          let dateTimeValue = formatDateTime(photo.exif.DateTime);
          let dateValue = photo.exif.DateTime !== undefined ? dateTimeValue.split('|')[0] : 'No Data';
          let timeValue = photo.exif.DateTime !== undefined ? dateTimeValue.split('|')[1] : 'No Data';
          let defaultData = {
            latitude: photo.exif.GPSLatitude,
            longitude: photo.exif.GPSLongitude,
            date: dateValue,
            time: timeValue,
            city: 'No Data',
            country: 'No Data',
            district: 'No Data',
            postalCode: 'No Data',
            region: 'No Data',
            subregion: 'No Data',
            street: 'No Data',
            cityState: 'No Data',
            address: 'No Data',
            fullAddress: 'No Data',
          };
          photo.data = defaultData;
        })
      );
    } else {
      console.log('Assets already transformed...');
      setAssetsTransformed(true);
    }
  };

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
              locatesParsed[i].latitude = 'No Data';
              locatesParsed[i].longitude = 'No Data';
              console.log('No location data for asset: ', locatesParsed[i]);

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
          console.log('Parsed assets: ', importedAssets);
          const combinedAssets = combineObjects(importedAssets);
          // console.log('masterAsset: ', combinedAssets);
          const valuedAssets = removeEmptyUniqueVals(combinedAssets);
          setMasterAsset(valuedAssets);
          setAssets(importedAssets);
          // console.log('assets: ', importedAssets);
          setExifKeys(Object.keys(combinedAssets.exif));
          // console.log('exifKeys: ', Object.keys(combinedAssets.exif));
          setDataKeys(Object.keys(combinedAssets.data));
          // console.log('dataKeys: ', Object.keys(combinedAssets.data));
          // setTags(Object.keys(combineObjects(importedAssets).tags));
          // console.log('tags: ', Object.keys(combineObjects(importedAssets).tags));
          setLoaded(true);
        }
      })();
    }
  }, [assetsTransformed === true]);

  const [filtersLoaded, setFiltersLoaded] = useState(false);
  useEffect(() => {
    if (filtersLoaded === true) {
      // console.log('assets: ', assets);
      console.log('Filters loading...');
      setFiltersLoaded(false);
    } else {
      console.log('Filters loaded.');
    }
  }, [filtersLoaded]);

  const backToFilterModal = () => {
    setAssets(importedAssets);
    setMenuOpen(true);
    setOptions(true);
  }

  function navigateToPhotos() {
    navigation.navigate('Photos');
  }

  const [options, setOptions] = useState(true);
  function renderSelectorDropDown(item, index) {
    // console.log('item: ', item);
    if (selectedKeyValues.length > 0) {
      console.log('selectedKeyValues: ', selectedKeyValues);
    }

    return (
      <View>
        <DropDownPicker
          assets={assets}
          index={index}
          item={item}
          options={options}
          selectedKeyValues={selectedKeyValues}
          setFilteredAssets={setFilteredAssets}
          setSelectedKeyValues={setSelectedKeyValues}
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
            numColumns={3}
            columnWrapperStyle={{ flexWrap: 'wrap', justifyContent: 'space-around' }}
          >
          </FlatList>
        }
      </View>

      {selectorKeyValues.length > 0 && menuOpen === false &&
        <View style={ModalStyle.bottomModal}>
          <View style={ModalStyle.modalHeader}>
            {/* <EditBtn
              text={`Clear (${selectedKeyValues.length})`} CHNGE THIS VALUE
              onPress={() => {
                setSelectedKeyValues([]);
              }}
            /> */}
            {/* <PiecedBtn
              text1={
                'Options'
              }
              text2={
                'Selected'
              }
              onPress1={() => {
                setOptions(true);
              }}
              onPress2={() => {
                setOptions(false);
              }}
            /> */}
            <EditBtn
              text={'Filters'}
              onPress={() => {
                backToFilterModal();
              }}
            />

          </View>
          <View style={ModalStyle.modalFooter}>
            <EditBtn
              text={'Reset'}
              onPress={() => {
                setSelectedKeyValues([]);
                setFilteredAssets(assets);

                console.log('FilteredAssets Reset...', assets);

              }}
            />

            <SubmitBtn
              text={'Photos' + ' (' + filteredAssets.length + ')'}
            />
          </View>
        </View>
      }

      <View style={Containers.menuContainer}>
        {menuOpen === false &&
          selectorKeyValues === 0 &&
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
            setFiltersLoaded={setFiltersLoaded}
            // setSelectorKeys={setSelectorKeys}
            setSelectorKeyValues={setSelectorKeyValues}
            // selectorKeyValues={selectorKeyValues}
            masterAsset={masterAsset}
            assets={assets}
            setAssets={setAssets}
            setMasterAsset={setMasterAsset}
            exifKeys={exifKeys}
            selectedExifKeys={selectedExifKeys}
            setSelectedExifKeys={setSelectedExifKeys}
            // setSelectorExif={setSelectorExif}
            dataKeys={dataKeys}
            selectedDataKeys={selectedDataKeys}
            setSelectedDataKeys={setSelectedDataKeys}
          // setSelectorData={setSelectorData}
          // tags={tags}
          />
        }
      </View>
    </SafeAreaView>
  );
};