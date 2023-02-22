import { Dimensions, Text, Image, Pressable, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { FlatGrid } from 'react-native-super-grid';
import { clearStorage, storeData, retrieveData, removeData } from '../utils/storage/asyncStorage';
import Checkbox from '../components/buttons/flatButtons/Checkbox';
import MenuButton from '../components/buttons/floatingButtons/MenuAccordionBtn';
import SelectButton from '../components/buttons/floatingButtons/SelectAccordionBtn';
import { Containers, Row, FloatBtn, ImageStyle } from '../styles/GlobalStyles';
import { IconTextRowBtn } from '../components/buttons/floatingButtons/IconTextRowBtn';

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
                style={styles.gridView}
                spacing={0}
                renderItem={({ item }) => (
                    <View>
                        <Image
                            source={{ uri: item.uri }}
                            style={ImageStyle.halfCoverImage}
                        />
                        {selectMode && selectedAssets.includes(item.uri) && (
                            <Checkbox
                                check={true} />
                        )}
                        {selectMode && (
                            <Checkbox
                                check={false} />
                        )}

                        {selectMode && (
                            <Pressable
                                style={styles.overlay}
                                onPress={() => selectPhoto(item.uri)}
                            />
                        )}
                    </View>
                )}
            />
            <View style={styles.bottomBtnContainer}>
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
                    <SelectButton
                        menuOpen={menuOpen}
                        setMenuOpen={setMenuOpen}
                        selectMode={selectMode}
                        setSelectMode={setSelectMode}
                        selectedAssets={selectedAssets}
                        deleteSelected={deleteSelected}
                        selectAll={selectAll}
                        resetStorage={resetStorage}
                    />
                )}
            </View>
            {selectMode && (
            <View style={Containers.containerTranslucency}>
                <IconTextRowBtn
                    icon='check-box'
                    text='select all'
                    onPress={selectAll}
                />
                <IconTextRowBtn
                    icon='check-box-outline-blank'
                    text='deselect all'
                    onPress={deselectAll}
                />
            </View>
            )}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: 30,
    },
    gridView: {
        flex: 1,
    },

    bottomBtnContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: 2,
        borderRadius: 50,
        padding: 5,
    },
    bottomBtnText: {
        color: 'black',
        fontSize: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 22,
    },
    bottomText: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'semibold',
    },
    topBtnContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        padding: 5,
        backgroundColor: 'grey',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        width: width / 2,
        height: width / 2,
    },
})