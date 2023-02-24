import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ImageStyle, FlatBtn } from '../../styles/GlobalStyles';
import { IconSize } from '../../styles/Sizing';
import Colors from '../../styles/Colors';


export const Checkbox = ({ check }) =>(
        <View style={ImageStyle.overlayCheckBox}>
            <MaterialIcons name={check ? 'check-circle-outline' : 'radio-button-unchecked'} size={IconSize.medium} color={Colors.light} />
        </View>
    );

export const Closebtn = ({ onPress }) => (
    <View style={FlatBtn.btnContainer}>
        <Pressable style={FlatBtn.button} onPress={onPress}>
            <MaterialIcons name={'close'} size={IconSize.medium} color={Colors.dark} />
        </Pressable>
    </View>
);

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

export const FlatIconTextRowBtn = ({ icon, text, onPress }) => (
    <View style={FlatBtn.btnContainer} >
        <Pressable style={FlatBtn.rowButton} onPress={onPress}>
            <MaterialIcons name={icon} size={IconSize.medium} color={Colors.dark} />
            <Text color={Colors.dark}>
                {text}
            </Text>
        </Pressable>
    </View>
);

    