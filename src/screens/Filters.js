import React, { useState, useEffect } from 'react';
import { ActivityIndicator, FlatList, ScrollView, SafeAreaView, View } from 'react-native';
import * as Location from 'expo-location';
import { Containers, FlatBtn, ModalStyle, LoadingIcon } from '../styles/GlobalStyles';
import Colors from '../styles/Colors';
import { formatDateTime } from '../utils/formatUtils';
import { combineObjects } from '../utils/arrayUtils';
import { removeEmptyUniqueVals } from '../utils/objUtils';
import { Closebtn, DropDownPicker, EditBtn, InvertedEditBtn, PiecedBtn, PlaceholderBtn, SubmitBtn, SubmitIcon } from '../components/buttons/FlatButtons';
import { IconBtn } from '../components/buttons/FloatingButtons';
import FilterMenu from '../components/buttons/FilterMenu';
import FilterButton from '../components/buttons/FilterButton';

export default function FilterScreen({ navigation, route }) {

  const importedAssets = route.params.importedAssets;

  const [reloads, setReloads] = useState(0);
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
        // console.log('Assets received in Filters.js: ', importedAssets);
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
          let dateTimeValue = formatDateTime(photo.exif.DateTimeOriginal);
          let dateValue = photo.exif.DateTimeOriginal !== undefined ? dateTimeValue.split('|')[0] : 'No Data';
          let timeValue = photo.exif.DateTimeOriginal !== undefined ? dateTimeValue.split('|')[1] : 'No Data';
          let defaultData = {
            Latitude: photo.exif.GPSLatitude !== undefined ? photo.exif.GPSLatitude : 'No Data',
            Longitude: photo.exif.GPSLongitude !== undefined ? photo.exif.GPSLongitude : 'No Data',
            Date: dateValue,
            Time: timeValue,
            City: 'No Data',
            Country: 'No Data',
            District: 'No Data',
            PostalCode: 'No Data',
            Region: 'No Data',
            Subregion: 'No Data',
            Street: 'No Data',
            CityState: 'No Data',
            Address: 'No Data',
            FullAddress: 'No Data',
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
            if (locatesParsed[i].Latitude === 'No Data' || locatesParsed[i].Longitude === 'No Data') {
              console.log('No location data for asset: ', locatesParsed[i]);

            } else {
              let location = await Location.reverseGeocodeAsync({
                latitude: locatesParsed[i].Latitude,
                longitude: locatesParsed[i].Longitude,
              });
              locatesParsed[i].City = location[0].city;
              locatesParsed[i].Country = location[0].country;
              locatesParsed[i].District = location[0].district;
              locatesParsed[i].PostalCode = location[0].postalCode;
              locatesParsed[i].Region = location[0].region;
              locatesParsed[i].Subregion = location[0].subregion;
              locatesParsed[i].Street = location[0].street;
              locatesParsed[i].CityState = location[0].city + ', ' + location[0].region;
              locatesParsed[i].Address = location[0].name + ' ' + location[0].street;
              locatesParsed[i].FullAddress = location[0].name + ' ' + location[0].street + ', ' + location[0].city + ', ' + location[0].region + ' ' + location[0].postalCode;
            }
            importedAssets[i].data = locatesParsed[i];
          }
          // console.log('Parsed assets: ', importedAssets);
          const combinedAssets = combineObjects(importedAssets);
          // console.log('masterAsset: ', combinedAssets);
          const valuedAssets = removeEmptyUniqueVals(combinedAssets);
          setMasterAsset(valuedAssets);
          // console.log('masterAsset: ', valuedAssets);
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
    // setOptions(true);
  }

  function navigateToPhotos() {
    navigation.navigate('Photos');
  }

  function navigateToFilteredPhotos() {
    console.log('Navigating to Photos with filtered assets...');
    console.log('filteredAssets: ', filteredAssets);
    navigation.navigate('Photos', { filteredAssets: filteredAssets });
  }

  // const [options, setOptions] = useState(true);
  // const [filterBtnOpen, setFilterBtnOpen] = useState(false);
  function addFilterBtns(item, index) {
    // console.log('item: ', item);
    if (selectedKeyValues.length > 0) {
      console.log('selectedKeyValues: ', selectedKeyValues);
    }
    return (
      <FilterButton
        assets={assets}
        index={index}
        item={item}
        // options={options}
        selectedKeyValues={selectedKeyValues}
        setFilteredAssets={setFilteredAssets}
        setSelectedKeyValues={setSelectedKeyValues}
      />
    );
  }

  return (

    <SafeAreaView style={Containers.container}>
      <View style={Containers.container}>
        {loaded === false &&
          <View style={Containers.centered}>
            <ActivityIndicator size="large" color={Colors.dark} />
          </View>
        }
        {selectorKeyValues.length === 0 &&
          loaded === true &&
          <View style={Containers.centered}>
            <PlaceholderBtn
              text="Add filters..."
              onPress={() => setMenuOpen(true)}
            />
          </View>
        }
        {selectorKeyValues.length > 0 &&
        <View style={Containers.centered}>
          <FlatList
            // contentContainerStyle={FlatBtn.btnContainer}
            data={selectorKeyValues}
            renderItem={({ item, index }) => addFilterBtns(item, index)}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            columnWrapperStyle={{ flexWrap: 'wrap', justifyContent: 'space-around' }}
          />
        </View>
        }
      </View>

      {selectorKeyValues.length > 0 && menuOpen === false &&
        <View style={ModalStyle.bottomModal}>
          <View style={ModalStyle.rowEnd}>
          <EditBtn
              text={'Photos: ' + filteredAssets.length + '/' + assets.length}
              onPress={() => {
                setSelectedKeyValues([]);
                setFilteredAssets(assets);
                console.log('FilteredAssets Reset...', assets);

              }}
            />
            <EditBtn
              text={'Filters'}
              onPress={() => {
                backToFilterModal();
              }}
            />
            <SubmitBtn
              text={'Apply'}
              onPress={() => {
                navigateToFilteredPhotos();
              }}
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