import React, { useState } from 'react';
import { View, Pressable, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ImageStyle, FlatBtn, DropDownPickerStyle } from '../../styles/GlobalStyles';
import { IconSize, TextSize } from '../../styles/Sizing';
import Colors from '../../styles/Colors';


export const Checkbox = ({ check }) => (
    <View style={ImageStyle.overlayCheckBox}>
        <MaterialIcons name={check ? 'check-circle-outline' : 'radio-button-unchecked'} size={IconSize.medium} color={Colors.light} />
    </View>
);

export const Closebtn = ({ onPress }) => (
    <View style={DropDownPickerStyle.dropdownButton.btnContainer}>
        <Pressable style={DropDownPickerStyle.dropdownButton.button} onPress={onPress}>
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
    <View style={DropDownPickerStyle.dropdownButton.btnContainer}>
        <Pressable style={DropDownPickerStyle.dropdownButton.highlightedRowBtn} onPress={onPress}>
            <Text style={{ fontSize: TextSize.medium, color: Colors.light }}>
                {text}
            </Text>
        </Pressable>
    </View>
);

export const SubmitIcon = ({ icon, onPress }) => (
    <View style={DropDownPickerStyle.dropdownButton.btnContainer}>
        <Pressable style={DropDownPickerStyle.dropdownButton.highlightedRowBtn} onPress={onPress}>
            <MaterialIcons name={icon} size={IconSize.medium} color={Colors.light} />
        </Pressable>
    </View>
);

export const EditBtn = ({ text, onPress }) => (
    <View style={DropDownPickerStyle.dropdownButton.btnContainer}>
        <Pressable style={DropDownPickerStyle.dropdownButton.editBtn} onPress={onPress}>
            <Text style={{ fontSize: TextSize.medium, color: Colors.dark }}>
                {text}
            </Text>
        </Pressable>
    </View>
);

export const SelectBtn = ({ text, onPress, pressed }) => (
    <View style={DropDownPickerStyle.dropdownButton.btnContainer}>
        <Pressable style={pressed ? DropDownPickerStyle.dropdownButton.highlightedRowBtn : DropDownPickerStyle.dropdownButton.selectBtn} onPress={onPress}>
            <Text style={{ fontSize: TextSize.medium, color: pressed ? Colors.light : Colors.dark }}>
                {text}
            </Text>
            {/* <MaterialIcons name={pressed ? 'check-circle-outline' : 'radio-button-unchecked'} size={IconSize.medium} color={pressed ? Colors.light : Colors.dark} /> */}
        </Pressable>
    </View>
);

export function DropDownPicker( props ) {

    const{
        values,
        selectedValues,
        setSelectedValues,
    } = props;



    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleValue = (value) => {
        if (selectedValues.includes(value)) {
            const newValues = selectedValues.filter((v) => v !== value);
            setSelectedValues(newValues);
        } else {
            setSelectedValues([...selectedValues, value]);
        }
    }

    return (
        <View style={DropDownPickerStyle.container}>
            <Pressable
                style={DropDownPickerStyle.labelBtn}
                onPress={toggleDropdown}
            >
                <Text style={DropDownPickerStyle.label}>

                    {'   selector key    '}

                </Text>
                <MaterialIcons
                    name={
                        isOpen ?
                            'keyboard-arrow-up'
                            : 'keyboard-arrow-down'}
                    size={IconSize.medium}
                    color={Colors.dark}
                />
            </Pressable>
            {isOpen && (
                <View style={DropDownPickerStyle.container}>
                    {values.map(value => (
                    <Pressable
                        style={DropDownPickerStyle.dropdown}
                        onPress={() => toggleValue(value)}
                    >
                        <Text style={DropDownPickerStyle.value}>
                            {value}
                        </Text>
                        { selectedValues.includes(value) &&
                            <MaterialIcons name={'close'} size={IconSize.small} color={Colors.dark} />}
                    </Pressable>
                    ))}
                </View>
            )}

        </View>
    );
}

