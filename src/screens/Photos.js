import { Button, Dimensions, SafeAreaView, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { FlatGrid } from 'react-native-super-grid';

const { width } = Dimensions.get('window');

export default function PhotosScreen() {
    const [image, setImage] = useState(null);
    const [filteredImage, setFilteredImage] = useState(null);
    const [exif, setExif] = useState(null);

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

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            exif: true,
            quality: 1,
        });

        if (!result.canceled) {
            setExif(result.assets.map((item) => item.exif));
            setImage(result.assets.map((item) => item.uri));
            setFilteredImage(result.assets.map((item) => item.uri));
            console.log(result.assets.map((item) => item.exif));
        } else {
            alert('You have not selected any image');
        }
    };

        
    return (
        <SafeAreaView style={styles.container}>

            {filteredImage != null ? (
                <FlatGrid
                    itemDimension={width / 2}
                    data={filteredImage}
                    style={styles.gridView}
                    spacing={0}
                    renderItem={({ item }) => (
                        <Image
                            source={{ uri: item }}
                            style={styles.image}
                        />
                    )}
                />
            ) : (
                <Button title="Pick an image from camera roll" onPress={pickImage} />
            )}
            {/* {exif && <Text>{JSON.stringify(exif)}</Text>} */}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridView: {
        // marginTop: 20,
        flex: 1,
    },
    image: {
        resizeMode: 'cover',
        width: width / 2,
        height: width / 2,
    },
});
