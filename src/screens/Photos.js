import { Dimensions, Image, Platform, SafeAreaView, StyleSheet, Pressable, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { FlatGrid } from 'react-native-super-grid';
import { clearStorage, storeData, retrieveData, removeData } from '../storage/asyncStorage';
import { AddPhotoBtn } from '../components/AddPhotoBtn';
import { Checkbox } from '../components/Checkbox';
import MenuModal from '../components/MenuModal';
import { IconBtn } from '../components/IconBtn';

const { width } = Dimensions.get('window');

const PHOTOS_ASSETS_STORAGE_KEY = 'photos_assets';

export default function PhotosScreen({ navigation, route }) {
    const [key, setKey] = useState(0);
    const [displayedAssets, setDisplayedAssets] = useState([]);
    const [filteredAssets, setFilteredAssets] = useState([]);
    const [selectedAssets, setSelectedAssets] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

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

    return (

        <SafeAreaView style={styles.container}>
            <FlatGrid
                key={key}
                itemDimension={width / 2}
                data={displayedAssets}
                style={styles.gridView}
                spacing={0}
                renderItem={({ item }) => (
                    <View>
                        <Image
                            source={{ uri: item.uri }}
                            style={styles.image}
                        />
                        {selectedAssets.includes(item.uri) && (
                            <Checkbox />
                        )}
                        <Pressable
                            style={styles.overlay}
                            onPress={() => selectPhoto(item.uri)}
                        />
                    </View>
                )}
            />
            <View style={styles.btnContainer}>
                       
                <IconBtn
                    icon={'menu'}
                    onPress={() => setModalVisible(true)}
                />
                <AddPhotoBtn
                    onPress={pickImage}
                />
                <IconBtn
                    icon={'filter'}
                    onPress={navigateToFilters}
                />
            </View>
            <MenuModal
                modalVisible={modalVisible}
                closeModal={() => setModalVisible(false)}
                resetFilters={resetFilters}
                resetStorage={resetStorage}
                deleteSelected={deleteSelected}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },
    gridView: {
        flex: 1,
    },
    image: {
        position: 'relative',
        resizeMode: 'cover',
        width: width / 2,
        height: width / 2,
    },
    btnContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgba(255,255,255,0.7)',
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