import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useToggle } from '../../../utils/ToggleUtils';


export default function Checkbox(props) {
    const { check } = props;
    const [isToggled, toggle] = useToggle(check);


    return (

        <View style={styles.checkboxContainer}>
            <MaterialIcons name={isToggled ? 'check-box' : 'check-box-outline-blank'} size={24} color="white" />
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