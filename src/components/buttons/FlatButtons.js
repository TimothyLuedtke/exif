import React from 'react';
import { View, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ImageStyle, FlatBtn } from '../../styles/GlobalStyles';
import { IconSize } from '../../styles/Sizing';
import Colors from '../../styles/Colors';


export function Checkbox(props) {
    const { check } = props;

    return (
        <View style={ImageStyle.overlayCheckBox}>
            <MaterialIcons name={check ? 'check-circle-outline' : 'radio-button-unchecked'} size={IconSize.medium} color={Colors.light} />
        </View>
    );
}

export const FlatIconBtn = ({ icon, color, onPress }) => (
    <View style={FlatBtn.btnContainer}>
        <Pressable style={FlatBtn.button} onPress={onPress}>
            <MaterialIcons
                name={icon}
                size={IconSize.medium}
                color={color ? color : Colors.dark}
            />
        </Pressable>
    </View>
);

    