import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Pressable } from 'react-native';
import { FloatBtn } from '../../../styles/GlobalStyles';
import Colors from '../../../styles/Colors';
import { IconSize } from '../../../styles/Sizing';

export default function MenuButton(props) {

    const {
        menuOpen,
        setMenuOpen,
        selectMode,
        setSelectMode,
        navigateToFilters,
        pickImage,
    } = props;

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const toggleSelectMode = () => {
        setSelectMode(!selectMode);
        console.log('Select mode: ', selectMode);
    }

    return (
        <View style={FloatBtn.container}>
            {menuOpen && (
                <View>
                    <View style={FloatBtn.btnContainer}>
                        <Pressable style={FloatBtn.button} onPress={pickImage}>
                            <MaterialIcons name='add-a-photo' size={IconSize.medium} color={Colors.dark} />
                        </Pressable>
                    </View>
                    <View style={FloatBtn.btnContainer}>
                        <Pressable style={FloatBtn.button} onPress={navigateToFilters}>
                            <MaterialIcons name='filter-alt' size={IconSize.medium} color={Colors.dark} />
                        </Pressable>
                    </View>
                    <View style={FloatBtn.btnContainer}>
                        <Pressable style={FloatBtn.button} onPress={toggleSelectMode}>
                            <MaterialIcons name='edit' size={IconSize.medium} color={Colors.dark} />
                        </Pressable>
                    </View>
                </View>
            )}
            <View style={FloatBtn.btnContainer}>
                <Pressable style={FloatBtn.button} onPress={toggleMenu}>
                    <MaterialIcons
                        name={menuOpen ? 'close' : 'keyboard-arrow-up'}
                        size={IconSize.medium}
                        color={Colors.dark}
                    />
                </Pressable>
            </View>
        </View>
    );
}