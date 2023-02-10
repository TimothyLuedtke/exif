import { Button, Dimensions, SafeAreaView, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { FlatGrid } from 'react-native-super-grid';
import { storeData, retrieveData, removeData, clearStorage } from '../storage/AsyncStorage';


const { width } = Dimensions.get('window');

const PHOTOS_STORAGE_KEY = 'photos_data';
// const EXIF_STORAGE_KEY = 'exif_data';

export default function PhotosScreen({ navigation, route }) {
    const [key, setKey] = useState(0);
    const [photos, setPhotos] = useState([]);
    // const [exif, setExif] = useState([]);

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
            const storedPhotos = await retrieveData(PHOTOS_STORAGE_KEY);
            if (storedPhotos) {
                setPhotos(clearStorage);
                console.log(storedPhotos);
                // setExif(await retrieveData(EXIF_STORAGE_KEY));
            } else {
                setPhotos([]);
                // setExif([]);
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            exif: true,
            quality: 1,
        });
        if (!result.canceled) {
            setKey(key + 1);
            const newPhotos = [...photos, ...result.assets.map((item) => item.uri)];
            setPhotos(newPhotos);
            await storeData(PHOTOS_STORAGE_KEY, newPhotos);
            // const newExif = [...exif, ...result.assets.map((item) => item.exif)];
            // setExif(newExif);
            // await storeData(EXIF_STORAGE_KEY, newExif);
            // console.log(newExif);
        } else {
            alert('You have not selected any image');
        }
    };

    const clearStorage = async () => {
        await removeData(PHOTOS_STORAGE_KEY);  
        // await removeData(EXIF_STORAGE_KEY);
        setPhotos([]);
        // setExif([]);
    };

    // const reset = async () => {
    //     const storedPhotos = await retrieveData(PHOTOS_STORAGE_KEY);
    //     if (storedPhotos) {
    //         setPhotos(storedPhotos);
    //     } else {
    //         setPhotos([]);
    //     }
    // };

    return (

        <SafeAreaView style={styles.container}>
            <FlatGrid
                key={key}
                itemDimension={width / 2}
                data={route.params ? route.params.filteredData : photos}
                style={styles.gridView}
                spacing={0}
                renderItem={({ item }) => (
                    <Image
                        source={{ uri: item }}
                        style={styles.image}
                    />
                )}
            />
            <Button title="Add Photo" onPress={pickImage} />
            {/* <Button title="Reset" onPress={reset} /> */}
            <Button title="Clear Storage" onPress={clearStorage} />
            <Button title="Filters" onPress={() => navigation.navigate('Filters')} />
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