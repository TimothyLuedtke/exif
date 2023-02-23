import React from 'react';
import { View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ImageStyle } from '../../../styles/GlobalStyles';
import { IconSize } from '../../../styles/Sizing';
import Colors from '../../../styles/Colors';


export default function Checkbox(props) {
    const { check } = props;

    return (
        <View style={ImageStyle.overlayCheckBox}>
            <MaterialIcons name={check ? 'check-box' : 'check-box-outline-blank'} size={IconSize.medium} color={Colors.light} />
        </View>
    );
}
    