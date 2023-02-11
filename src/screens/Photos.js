import { Dimensions, Image, Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { FlatGrid } from 'react-native-super-grid';
import { clearStorage, storeData, retrieveData, removeData } from '../storage/AsyncStorage';

const { width } = Dimensions.get('window');

// const PHOTOS_STORAGE_KEY = 'photos_data';
const PHOTOS_ASSETS_STORAGE_KEY = 'photos_assets';

export default function PhotosScreen({ navigation, route }) {
    const [key, setKey] = useState(0);
    const [photoAssets, setPhotoAssets] = useState([]);
    
    const { filteredPhotos } = route.params;

    
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
            const storedPhotoAssets = await retrieveData(PHOTOS_ASSETS_STORAGE_KEY);
            if (storedPhotoAssets) {
                setPhotoAssets(storedPhotoAssets);
                console.log('Stored photoAssets: ', storedPhotoAssets);
            } else {
                setPhotoAssets([]);
                console.log('No stored photoAssets');
            }
        })();
    }, []);
    
    useEffect(() => {
    if (filteredPhotos && filteredPhotos.length > 0) {
        setPhotoAssets(filteredPhotos);
        console.log('FilteredPhotos received...');
        console.log('Filtered photoAssets: ', photoAssets);
    } else {
        console.log('No filtered photos');
    }  
    }, [filteredPhotos]); 
    
    const resetStorage = async () => {
        await clearStorage();
        setPhotoAssets([]);
        console.log('Storage cleared');
    };

    const refresh = async () => {
        const storedPhotoAssets = await retrieveData(PHOTOS_ASSETS_STORAGE_KEY);
        if (storedPhotoAssets) {
            setPhotoAssets(storedPhotoAssets);
            filteredPhotos = null;
        } else {
            setPhotoAssets([]);
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
            const newPhotoAssets = [...photoAssets, ...result.assets.map((item) => {
                return {
                    assetId: item.assetId,
                    exif: item.exif,
                    uri: item.uri,
                };

            })];
            setPhotoAssets(newPhotoAssets);
            await storeData(PHOTOS_ASSETS_STORAGE_KEY, newPhotoAssets);
            console.log('Updated Stored photoAssets.');

        } else {
            alert('You have not selected any image');
        }
    };



    return (

        <SafeAreaView style={styles.container}>
            <FlatGrid
                key={key}
                itemDimension={width / 2}
                data={photoAssets}
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
            <Text style={styles.button} onPress={pickImage}>Add</Text>
            <Text style={styles.button} onPress={refresh}>Refresh</Text>
            <Text style={styles.button} onPress={resetStorage}>Reset Storage</Text>
            <Text style={styles.button} onPress={
                () => navigation.navigate('Filters', {
                    photoAssets: photoAssets,                                  
                })}
            >Filters</Text>
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
    button: {
        fontSize: 17,
        fontWeight: 'semibold',
        margin: 7,
        padding: 7,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        borderColor: 'black',
        textAlign: 'center',
      },
    inline: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
})