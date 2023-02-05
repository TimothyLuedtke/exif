import { Button, View, Text, StyleSheet, Image } from 'react-native';
import React, { Flatlist, useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function PhotosScreen() {
    const [image, setImage] = useState(null);
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

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setExif(result.assets[0].exif);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Pick an image from camera roll" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            {/* {exif && <Text>{JSON.stringify(exif)}</Text>} */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
