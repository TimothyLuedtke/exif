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

export function PiecedBtn({ text1, text2, text3, onPress1, onPress2, onPress3 }) {
    const [pressed1, setPressed1] = useState(true);
    const [pressed2, setPressed2] = useState(false);
    const [pressed3, setPressed3] = useState(false);

    const handlePressed1 = () => {
        setPressed1(true);
        setPressed2(false);
        setPressed3(false);
        onPress1();
    }

    const handlePressed2 = () => {
        setPressed1(false);
        setPressed2(true);
        setPressed3(false);
        onPress2();
    }

    const handlePressed3 = () => {
        setPressed1(false);
        setPressed2(false);
        setPressed3(true);
        onPress3();
    }

     return(
    <View style={FlatBtn.btnContainer}>
        <View style={FlatBtn.piecedBtn}>
                <Pressable style={pressed1 === true ? FlatBtn.btnStartH : FlatBtn.btn} onPress={ () => handlePressed1()}>
                    <Text style={pressed1 === true? FlatBtn.btnTxtH : FlatBtn.btnTxt}>
                        {text1}
                    </Text>
                </Pressable>
                <Pressable style={pressed2 === true ? FlatBtn.btnH : FlatBtn.btn} onPress={() => handlePressed2()}>
                    <Text style={pressed2 === true? FlatBtn.btnTxtH : FlatBtn.btnTxt}>
                        {text2}
                    </Text>
                </Pressable>
            <Pressable style={pressed3 === true ? FlatBtn.btnEndH : FlatBtn.btnEnd} onPress={() => handlePressed3()}>
                <Text style={pressed3 === true? FlatBtn.btnTxtH : FlatBtn.btnTxt}>
                    {text3}
                </Text>
            </Pressable>
        </View>
    </View>
)}


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

export function DropDownPicker(props) {

    const {
        key,
        values,
        selectedValues,
        setSelectedValues,
    } = props;

    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const toggleValue = (value) => {
        // if (selectedValues.includes(value)) {
        //     const newValues = selectedValues.filter((v) => v !== value);
        //     setSelectedValues(newValues);
        // } else {
            setSelectedValues([...selectedValues, value]);
        // }
    }

    return (
        <View style={DropDownPickerStyle.container}>
            <Pressable
                style={DropDownPickerStyle.labelBtn}
                onPress={toggleDropdown}
            >
                <Text style={DropDownPickerStyle.label}>
                    {key}
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
                            {/* {selectedValues.includes(value) &&
                                <MaterialIcons name={'close'} size={IconSize.small} color={Colors.dark} />} */}
                        </Pressable>
                    ))}
                </View>
            )}

        </View>
    );
}

