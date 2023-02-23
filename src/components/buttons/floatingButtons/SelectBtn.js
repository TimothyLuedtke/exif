import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Pressable } from 'react-native';
import { FloatBtn } from '../../../styles/GlobalStyles';
import Colors from '../../../styles/Colors';
import { IconSize } from '../../../styles/Sizing';

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

    const close = () => {
        setSelectMode(false);
        // setMenuOpen(false);
        deselectAll();
    }

    return (
        <View style={FloatBtn.container}>
            {menuOpen && (
                <View>
                    {/* <View style={FloatBtn.btnContainer}>
                        <Pressable style={FloatBtn.button} onPress={resetStorage}>
                            <MaterialIcons name='warning' size={IconSize.medium} color="darkred" />
                        </Pressable>
                    </View> */}
                    <View style={FloatBtn.btnContainer}>
                        <Pressable style={FloatBtn.button} onPress={deleteSelected}>
                            <MaterialIcons name='delete' size={IconSize.medium} color={Colors.dark} />
                        </Pressable>
                    </View>
                </View>
            )}
            <View style={FloatBtn.btnContainer}>
                <Pressable style={FloatBtn.button} onPress={close}>
                    <MaterialIcons name='close' size={IconSize.medium} color={Colors.dark} />
                </Pressable>
            </View>
        </View>
    );
}