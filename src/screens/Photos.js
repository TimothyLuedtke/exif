import { Dimensions, Image, Pressable, Platform, SafeAreaView, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { FlatGrid } from 'react-native-super-grid';
import { clearStorage, storeData, retrieveData, removeData } from '../utils/storage/asyncStorage';
import { Checkbox } from '../components/buttons/FlatButtons';
import MenuButton from '../components/buttons/MenuButton';
import SelectionMenu from '../components/buttons/SelectionMenu';
import { Containers, ImageStyle } from '../styles/GlobalStyles';
import { TextBtn, IconTextRowBtn } from '../components/buttons/FloatingButtons';

const { width } = Dimensions.get('window');

const PHOTOS_ASSETS_STORAGE_KEY = 'photos_assets';

export default function PhotosScreen({ navigation, route }) {
    const [key, setKey] = useState(0);
    const [displayedAssets, setDisplayedAssets] = useState([]);
    const [filteredAssets, setFilteredAssets] = useState([]);
    const [selectedAssets, setSelectedAssets] = useState([]);
    const [selectMode, setSelectMode] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);


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
            if (storedPhotoAssets) {
                setDisplayedAssets(storedPhotoAssets);
                console.log('Displaying stored Assets...');
            } else {
                setDisplayedAssets([]);
                console.log('No stored Assets.');
            }
        })();
    }, [route.params.filteredAssets < 0 || route.params.filteredAssets > null]);

    useEffect(() => {
        if (route.params.filteredAssets && route.params.filteredAssets.length > 0) {
            setFilteredAssets(route.params.filteredAssets);
            setDisplayedAssets(filteredAssets);
            console.log('Displaying filtered Assets...');
        } else {
            console.log('No filtered Assets.');
        }
    }, [route.params.filteredAssets && route.params.filteredAssets.length > 0]);

    const resetFilters = async () => {
        const storedPhotoAssets = await retrieveData(PHOTOS_ASSETS_STORAGE_KEY);
        if (storedPhotoAssets) {
            setDisplayedAssets(storedPhotoAssets);
            setFilteredAssets([]);
            setSelectedAssets([]);
            console.log('Reset filters and displaying stored assets.');
            console.log('Stored assets: ', storedPhotoAssets);
        } else {
            setDisplayedAssets([]);
            setFilteredAssets([]);
            setSelectedAssets([]);
            console.log('No stored assets to display.');
        }
    };

    const resetStorage = async () => {
        await clearStorage();
        setDisplayedAssets([]);
        setFilteredAssets([]);
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
                    customTags: [],
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

            <FlatGrid
                key={key}
                itemDimension={(width / 2)}
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
            <View>
                {!selectMode && (<MenuButton
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                    selectMode={selectMode}
                    setSelectMode={setSelectMode}
                    navigateToFilters={navigateToFilters}
                    pickImage={pickImage}
                />
                )}
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