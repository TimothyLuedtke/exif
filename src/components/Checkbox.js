import React from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


export default function Checkbox() {
    return (

<View style={styles.checkboxContainer}>
<MaterialIcons name="check-box" size={25} color="black" />
</View>

    );
}

const styles = StyleSheet.create({
    checkboxContainer: {
        position: 'absolute',
        top: 6,
        right: 6,
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
});