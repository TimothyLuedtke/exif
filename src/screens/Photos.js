import { Dimensions, Image, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { FlatGrid } from 'react-native-super-grid';
import { clearStorage, storeData, retrieveData, removeData } from '../storage/asyncStorage';
import IconTextButton from '../components/Button';

const { width } = Dimensions.get('window');

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

    const resetStorage = async () => {
        await clearStorage();
        setDisplayedAssets([]);
        setFilteredAssets([]);
        console.log('Storage cleared.');
    };

    const resetFilters = async () => {
        const storedPhotoAssets = await retrieveData(PHOTOS_ASSETS_STORAGE_KEY);
        if (storedPhotoAssets) {
            setDisplayedAssets(storedPhotoAssets);
            setFilteredAssets([]);
            console.log('Reset filters and displaying stored assets.');
        } else {
            setDisplayedAssets([]);
            setFilteredAssets([]);
            console.log('No stored assets to display.');
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
                    <Image
                        source={{ uri: item.uri }}
                        style={styles.image}
                    />
                )}
            />
            <View style={styles.inline}>
                <IconTextButton
                    iconName={'delete'}
                    // text={"Storage"}
                    onPress={resetStorage}
                />
                <IconTextButton
                    iconName={'refresh'}
                    // text={"Reset"}
                    onPress={resetFilters}
                />
                <IconTextButton
                    iconName={'add'}
                    // text={"Photos"}
                    onPress={pickImage}
                />
                <IconTextButton
                    iconName={'filter-alt'}
                    // text={"Filters"}
                    onPress={navigateToFilters}
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