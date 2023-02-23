import React from 'react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ImageStyle } from '../../../styles/GlobalStyles';


export default function Checkbox(props) {
    const { check } = props;

    return (

        <View style={ImageStyle.overlayCheckBox}>
            <MaterialIcons name={check ? 'check-box' : 'check-box-outline-blank'} size={24} color="white" />
        </View>
    );
}
    