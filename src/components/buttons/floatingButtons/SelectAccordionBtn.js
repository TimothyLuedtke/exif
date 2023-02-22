import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Pressable } from 'react-native';
import { FloatBtn } from '../../../styles/GlobalStyles';
import DropdownSelector from '../../DropdownSelector';

export default function Selectbutton(props) {

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
                    {/* <View style={FloatBtn.container}>
                        <Pressable style={FloatBtn.button} onPress={resetStorage}>
                            <MaterialIcons name='warning' size={32} color="darkred" />
                        </Pressable>
                    </View> */}
                    {/* <View style={FloatBtn.container}>
                        <Pressable style={FloatBtn.button} onPress={selectAll}>
                            <MaterialIcons name='check'  color="darkred" />
                        </Pressable>
                    </View> */}
                    <View style={FloatBtn.container}>
                        <Pressable style={FloatBtn.button} onPress={deleteSelected}>
                            <MaterialIcons name='delete' size={35} color="darkred" />
                        </Pressable>
                    </View>
                </View>
            )}
            <View style={FloatBtn.container}>
                <Pressable style={FloatBtn.button} onPress={toggleSelectMode}>
                    <MaterialIcons name='close' size={35} color="black" />
                </Pressable>
            </View>
        </View>
    );
}