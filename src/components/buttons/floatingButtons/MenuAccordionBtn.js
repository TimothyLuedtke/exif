import React from 'react';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Pressable, StyleSheet } from 'react-native';
import DropdownSelector from '../../DropdownSelector';
import { FloatBtn } from '../../../styles/GlobalStyles';

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
        <View style={FloatBtn.borderRadius50}>
            {menuOpen && (
                <View>
                    <View style={FloatBtn.container}>
                        <Pressable style={FloatBtn.button} onPress={pickImage}>
                            <MaterialIcons name='add-a-photo' size={30} color="black" />
                        </Pressable>
                    </View>
                    <View style={FloatBtn.container}>
                        <Pressable style={FloatBtn.button} onPress={navigateToFilters}>
                            <MaterialIcons name='filter-alt' size={30} color="black" />
                        </Pressable>
                    </View>
                    <View style={FloatBtn.container}>
                        <Pressable style={FloatBtn.button} onPress={toggleSelectMode}>
                            <MaterialIcons name='edit' size={30} color="darkred" />
                        </Pressable>
                    </View>
                </View>
            )}
            <View style={FloatBtn.container}>
                <Pressable style={FloatBtn.button} onPress={toggleMenu}>
                    <MaterialIcons
                        name={menuOpen ? 'close' : 'keyboard-arrow-up'}
                        size={menuOpen ? 35 : 30}
                        color="black" />
                </Pressable>
            </View>
        </View>
    );
}