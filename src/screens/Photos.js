import { Dimensions, Image, Pressable, Platform, SafeAreaView, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { FlatGrid } from 'react-native-super-grid';
import { clearStorage, storeData, retrieveData, } from '../utils/storage/asyncStorage';
import { Checkbox, PlaceholderBtn } from '../components/buttons/FlatButtons';
import MenuButton from '../components/buttons/MenuButton';
import SelectionMenu from '../components/buttons/SelectionMenu';
import { Containers, ImageStyle } from '../styles/GlobalStyles';

const { width } = Dimensions.get('window');

const PHOTOS_ASSETS_STORAGE_KEY = 'photos_assets';

export default function PhotosScreen({ navigation, route }) {
    const [key, setKey] = useState(0);
    const [displayedAssets, setDisplayedAssets] = useState([]);
    const [selectedAssets, setSelectedAssets] = useState([]);
    const [filteredAssets, setFilteredAssets] = useState([]);
    const [selectMode, setSelectMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [screenLoaded, setScreenLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const storedPhotoAssets = await retrieveData(PHOTOS_ASSETS_STORAGE_KEY);
            if (storedPhotoAssets && filteredAssets.length === 0) {
                setDisplayedAssets(storedPhotoAssets);
                console.log('Displaying stored Assets...');
                setScreenLoaded(true);
            } else if (filteredAssets.length > 0) {
                setDisplayedAssets(filteredAssets);
                console.log('Displaying filtered Assets...');
                setScreenLoaded(true);
            } else {
                console.log('No stored Assets.');
            }
        })();
    }, [screenLoaded === false]);

    useEffect(() => {
        if (route.params.filteredAssets && route.params.filteredAssets.length > 0) {
            setFilteredAssets(route.params.filteredAssets);
            setDisplayedAssets(route.params.filteredAssets);  
            setScreenLoaded(true); 
            console.log('Displaying filtered Assets...');
        } else {
            console.log('No filtered Assets.');
        }
    }, [route.params.filteredAssets]);

    useEffect(() => {
        setKey(key + 1);
    }, [displayedAssets]);

    const resetFilters = () => {
        setFilteredAssets([]);
        setKey(key + 1);
        setScreenLoaded(false);
        console.log('Resetting filters...');
    };

    const resetStorage = async () => {
        await clearStorage();
        setDisplayedAssets([]);
        setSelectedAssets([]);
        setKey(key + 1);
        console.log('Reset storage.');
    };

    const deleteSelected = async () => {
        const newPhotoAssets = displayedAssets.filter(item => !selectedAssets.includes(item.uri));
        setDisplayedAssets(newPhotoAssets);
        setSelectedAssets([]);
        storeData(PHOTOS_ASSETS_STORAGE_KEY, newPhotoAssets);
        console.log('Deleted selected photos.');
    };

    const selectPhoto = async (uri) => {
        if (selectedAssets.includes(uri)) {
            setSelectedAssets(selectedAssets.filter(item => item !== uri));
        } else {
            setSelectedAssets([...selectedAssets, uri]);
        }
    };

    const rerender = () => {
        setKey(key + 1);
        console.log('Rerendering...', key);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            exif: true,
            quality: 1,
        });
        if (!result.canceled) {
            setKey(key + 1);
            console.log('Picked image(s).');
            // console.log('Result: ', result);
            const newPhotoAssets = [...displayedAssets, ...result.assets.map((item) => {

                return {
                    exif: item.exif,
                    uri: item.uri,
                    tags: [],
                    data: {},
                    // data: "no data",
                };
            })];

            setDisplayedAssets(newPhotoAssets);
            await storeData(PHOTOS_ASSETS_STORAGE_KEY, newPhotoAssets);
            console.log('Updated Asset Storage.');

        } else {
            alert('No assets selected.');
        }
    };

    const navigateToFilters = () => {
        console.log('Navigating to Filters...');
        navigation.navigate('Filters', {
            importedAssets: displayedAssets,
        });
    };

    const selectAll = () => {
        if (selectedAssets.length === displayedAssets.length) {
            setSelectedAssets([]);
        } else {
            setSelectedAssets(displayedAssets.map(item => item.uri));
        }
    };

    const deselectAll = () => {
        setSelectedAssets([]);
    };

    return (
        <SafeAreaView style={Containers.container}>
            <View style={Containers.container}>
                {displayedAssets.length === 0 &&
                    <View style={Containers.centered}>
                        <PlaceholderBtn
                            text="Import Photos"
                            onPress={pickImage}
                        />
                    </View>
                }
                {displayedAssets.length > 0 && (
                    <FlatGrid
                        key={key}
                        itemDimension={(width / 3)}
                        data={displayedAssets}
                        style={Containers.container}
                        spacing={0}
                        renderItem={({ item }) => (
                            <View>
                                <Image
                                    source={{ uri: item.uri }}
                                    style={ImageStyle.halfCoverImage}
                                />
                                {selectMode && (
                                    <Checkbox
                                        check={false} />
                                )}

                                {selectMode && (
                                    <Pressable
                                        style={ImageStyle.overlay}
                                        onPress={() => selectPhoto(item.uri)}
                                    />
                                )}
                                {selectMode && selectedAssets.includes(item.uri) && (
                                    <Checkbox
                                        check={true} />
                                )}
                            </View>

                        )}
                    />
                )}
            </View>
            <View>
                {!selectMode &&
                    <View>
                        <MenuButton
                            menuOpen={menuOpen}
                            resetFilters={resetFilters}
                            setDisplayedAssets={setDisplayedAssets}
                            setMenuOpen={setMenuOpen}
                            selectMode={selectMode}
                            setSelectMode={setSelectMode}
                            navigateToFilters={navigateToFilters}
                            pickImage={pickImage}
                        />
                    </View>

                }
                {selectMode && (
                    <View>
                        <SelectionMenu
                            deleteSelected={deleteSelected}
                            deselectAll={deselectAll}
                            displayedAssets={displayedAssets}
                            selectAll={selectAll}
                            setSelectMode={setSelectMode}
                            selectedAssets={selectedAssets}
                        />
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}