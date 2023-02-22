import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Pressable } from 'react-native';
import { FloatBtn } from '../../../styles/GlobalStyles';
import DropdownSelector from '../../DropdownSelector';

export default function SelectButton(props) {

    const {
        menuOpen,
        setMenuOpen,
        selectMode,
        setSelectMode,
        selectedAssets,
        deleteSelected,
        selectAll,
        deselectAll,
        resetStorage,
    } = props;


    const toggleSelectMode = () => {
        setSelectMode(!selectMode);
        console.log('Select mode: ', selectMode);
    }

    return (
        <View style={FloatBtn.borderRadius50}>
            {menuOpen && (
                <View>
                    <View style={FloatBtn.floatingIconButtonContainer}>
                        <Pressable style={FloatBtn.floatingIconButton} onPress={resetStorage}>
                            <MaterialIcons name='warning' size={32} color="darkred" />
                        </Pressable>
                    </View>
                    {/* <View style={FloatBtn.floatingIconButtonContainer}>
                        <Pressable style={FloatBtn.floatingIconButton} onPress={selectAll}>
                            <MaterialIcons name='check'  color="darkred" />
                        </Pressable>
                    </View> */}
                    <View style={FloatBtn.floatingIconButtonContainer}>
                        <Pressable style={FloatBtn.floatingIconButton} onPress={deleteSelected}>
                            <MaterialIcons name='delete' size={35} color="darkred" />
                        </Pressable>
                    </View>
                </View>
            )}
            <View style={FloatBtn.floatingIconButtonContainer}>
                <Pressable style={FloatBtn.floatingIconButton} onPress={toggleSelectMode}>
                    <MaterialIcons name='close' size={35} color="black" />
                </Pressable>
            </View>
        </View>
    );
}