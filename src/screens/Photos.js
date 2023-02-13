import { Button, Dimensions, Image, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { FlatGrid } from 'react-native-super-grid';
import { clearStorage, storeData, retrieveData, removeData } from '../storage/AsyncStorage';
import IconTextButton from '../components/Button';

const { width } = Dimensions.get('window');

// const PHOTOS_STORAGE_KEY = 'photos_data';
const PHOTOS_ASSETS_STORAGE_KEY = 'photos_assets';

export default function PhotosScreen({ navigation, route }) {
    const [key, setKey] = useState(0);
    const [displayedAssets, setDisplayedAssets] = useState([]);
    const [filteredAssets, setFilteredAssets] = useState([]);

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
                console.log('Stored Assets: ', storedPhotoAssets);
            } else {
                setDisplayedAssets([]);
                console.log('No stored Assets.');
            }
        })();
    }, []);

    useEffect(() => {
        (async () => {
            if (route.params) {
                setFilteredAssets(route.params.filteredAssets);
                console.log('Filtered assets received...', filteredAssets);
            } else {
                console.log('No filtered assets recieved to display.');
            }
        })();
    }, [route.params]);

    useEffect(() => {
        if (filteredAssets && filteredAssets.length > 0) {
            setDisplayedAssets(filteredAssets);
            console.log('Displaying filtered assets...');
        } else {
            console.log('No filtered assets to display.');
        }
    }, [filteredAssets]);

    const resetStorage = async () => {
        await clearStorage();
        setDisplayedAssets([]);
        console.log('Storage cleared.');
    };

    const refresh = async () => {
        const storedPhotoAssets = await retrieveData(PHOTOS_ASSETS_STORAGE_KEY);
        if (storedPhotoAssets) {
            setDisplayedAssets(storedPhotoAssets);
            setFilteredAssets([]);
            console.log('Reset filters and displaying stored assets.');
        } else {
            setDisplayedAssets([]);
            setFilteredAssets([]);
            console.log('No stored assets to refresh.');
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
            const newPhotoAssets = [...displayedAssets, ...result.assets.map((item) => {
                return {
                    assetId: item.assetId,
                    exif: item.exif,
                    uri: item.uri,
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
        navigation.navigate('Filters', {
            displayedAssets: displayedAssets,
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
                    <Image
                        source={{ uri: item.uri }}
                        style={styles.image}
                    />
                )}
            />
            {/* <View style={styles.inline}>
                <Text style={styles.button} onPress={pickImage}>Add</Text>
                <Text style={styles.button} onPress={
                    () => navigation.navigate('Filters', {
                        displayedAssets: displayedAssets,
                    })}
                >Filters</Text>
            </View>  */}
            <View style={styles.inline}>
                <IconTextButton
                    iconName={'delete'}
                    text={"Storage"}
                    onPress={resetStorage}
                />
                <IconTextButton
                    iconName={'refresh'}
                    text={"Reset"}
                    onPress={refresh}
                />
                <IconTextButton
                    iconName={'filter-alt'}
                    text={"Filters"}
                    onPress={navigateToFilters}
                />
                <IconTextButton
                    iconName={'add'}
                    text={"Photos"}
                    onPress={pickImage}
                />
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridView: {
        flex: 1,
    },
    image: {
        resizeMode: 'cover',
        width: width / 2,
        height: width / 2,
    },
    inline: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
})