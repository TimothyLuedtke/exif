import react from "react";
import { View, Image, Pressable } from "react-native";
import { Checkbox } from "../Checkbox";

export const SelectableImages = ({ images }) => {
    <View>
        {images.map((asset, index) => {
            <Pressable
                key={index}
                style={styles.image}
                onPress={() => selectAssets(asset.uri)}
            >
                <Image
                    style={styles.image}
                    source={{ uri: asset.uri }}
                />
                {selectedAssets.includes(asset.uri) && (
                    <View style={styles.selectedImageOverlay}>
                        <Checkbox />
                    </View>
                )}
            </Pressable>;
        })}
    </View>;
};