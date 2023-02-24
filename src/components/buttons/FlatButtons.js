import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ImageStyle, FlatBtn } from '../../styles/GlobalStyles';
import { IconSize, TextSize } from '../../styles/Sizing';
import Colors from '../../styles/Colors';


export const Checkbox = ({ check }) => (
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

// export const FlatIconBtn = ({ icon, color, onPress }) => (
//     <View style={FlatBtn.btnContainer}>
//         <Pressable style={FlatBtn.editBtn} onPress={onPress}>
//             <MaterialIcons
//                 name={icon}
//                 size={IconSize.medium}
//                 color={color ? color : Colors.dark}
//             />
//         </Pressable>
//     </View>
// );

export const SubmitBtn = ({ text, onPress }) => (
    <View style={FlatBtn.btnContainer}>
        <Pressable style={FlatBtn.highlightedRowBtn} onPress={onPress}>
            <Text style={{ fontSize: TextSize.medium, color: Colors.light }}>
                {text}
            </Text>
        </Pressable>
    </View>
);

export const SubmitIcon = ({ icon, onPress }) => (
    <View style={FlatBtn.btnContainer}>
        <Pressable style={FlatBtn.highlightedRowBtn} onPress={onPress}>
            <MaterialIcons name={icon} size={IconSize.medium} color={Colors.light} />
        </Pressable>
    </View>
);

export const EditBtn = ({ text, onPress }) => (
    <View style={FlatBtn.btnContainer}>
        <Pressable style={FlatBtn.editBtn} onPress={onPress}>
            <Text style={{ fontSize: TextSize.medium, color: Colors.dark }}>
                {text}
            </Text>
        </Pressable>
    </View>
);

export const SelectBtn = ({ text, onPress, pressed }) => (
    <View style={FlatBtn.btnContainer}>
        <Pressable style={pressed ? FlatBtn.highlightedRowBtn : FlatBtn.selectBtn} onPress={onPress}>
            <Text style={{ fontSize: TextSize.medium, color: pressed ? Colors.light : Colors.dark }}>
                {text}
            </Text>
            {/* <MaterialIcons name={pressed ? 'check-circle-outline' : 'radio-button-unchecked'} size={IconSize.medium} color={pressed ? Colors.light : Colors.dark} /> */}
        </Pressable>
    </View>
);

