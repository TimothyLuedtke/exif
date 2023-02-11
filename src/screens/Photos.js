import { Button, Dimensions, Platform, SafeAreaView, StyleSheet, Image } from 'react-native';
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
            // const storedPhotos = await retrieveData(PHOTOS_STORAGE_KEY);
            // if (storedPhotos) {
                //     setPhotos(storedPhotos);
                //     console.log('Stored photo URIs: ', storedPhotos);
            // } else {
            //     setPhotos([]);
            //     console.log('No stored photo URIs');
            // }
            const storedPhotoAssets = await retrieveData(PHOTOS_ASSETS_STORAGE_KEY);
            if (storedPhotoAssets) {
                setPhotoAssets(storedPhotoAssets);
                console.log('Stored photo assets: ', storedPhotoAssets);
            } else {
                setPhotoAssets([]);
                console.log('No stored photo assets');
            }
        })();
    }, []);
    
    useEffect(() => {
    if (filteredPhotos && filteredPhotos.length > 0) {
        setPhotoAssets(filteredPhotos);
        console.log('Filtered photos received by Photos.js: ', filteredPhotos);
        console.log('PhotoAssets filtered: ', photoAssets);
    } else {
        console.log('No filtered photos received by Photos.js');
    }  
    }, [filteredPhotos]); 
    
    const resetStorage = async () => {
        await clearStorage();
        // setPhotos([]);
        setPhotoAssets([]);
        console.log('Storage cleared');
    };

    const refresh = async () => {
        // const storedPhotos = await retrieveData(PHOTOS_STORAGE_KEY);
        const storedPhotoAssets = await retrieveData(PHOTOS_ASSETS_STORAGE_KEY);
        // if (storedPhotos) {
        //     setPhotos(storedPhotos);
        //     console.log('Stored photo URIs: ', storedPhotos);
        // } else {
        //     setPhotos([]);
        //     console.log('No stored photo URIs');
        // }
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
            // const newPhotos = [...photos, ...result.assets.map((item) => item.uri)];
            // setPhotos(newPhotos);
            // await storeData(PHOTOS_STORAGE_KEY, newPhotos);
            const newPhotoAssets = [...photoAssets, ...result.assets.map((item) => {
                return {
                    assetId: item.assetId,
                    exif: item.exif,
                    uri: item.uri,
                };

            })];
            setPhotoAssets(newPhotoAssets);
            await storeData(PHOTOS_ASSETS_STORAGE_KEY, newPhotoAssets);

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
            <Button title="Add Photo" onPress={pickImage} />
            <Button title="Refresh" onPress={refresh} />
            <Button title="Clear Storage" onPress={resetStorage} />
            <Button title="Filter" onPress={
                () => navigation.navigate('Filters', {
                    // photos: photos,
                    photoAssets: photoAssets,                                  
                })}
            />
            {/* <Button title="Filters" onPress={
                () => navigation.navigate('Filters')}
            /> */}
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
})