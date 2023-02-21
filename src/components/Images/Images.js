import React from 'react';
import { View, Image } from 'react-native';


export const Images = ({ images }) => {
    <View>
        {images.assets.map((asset, index) => {
            <Image
                key={index}
                style={styles.image}
                source={{ uri: asset.uri }}
            />;
        })}
    </View>;
};
