import React from 'react';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Pressable, StyleSheet } from 'react-native';
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
        <View style={styles.btnView}>
            {menuOpen && (
                <View>
                    <View style={styles.iconBtnContainer}>
                        <Pressable style={styles.iconBtn} onPress={resetStorage}>
                            <MaterialIcons name='warning' size={30} color="darkred" />
                        </Pressable>
                    </View>
                    <View style={styles.iconBtnContainer}>
                        <Pressable style={styles.iconBtn} onPress={selectAll}>
                            <MaterialIcons name='check' size={30} color="darkred" />
                        </Pressable>
                    </View>
                    <View style={styles.iconBtnContainer}>
                        <Pressable style={styles.iconBtn} onPress={deleteSelected}>
                            <MaterialIcons name='delete' size={30} color="darkred" />
                        </Pressable>
                    </View>
                </View>
            )}
            <View style={styles.closeBtnContainer}>
                <Pressable style={styles.closeIconBtn} onPress={toggleSelectMode}>
                    <MaterialIcons name='close' size={35} color="black" />
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    iconBtnContainer: {
        width: 58,
        height: 58,
        margin: 10,
        // borderWidth: 2.3,
        // borderColor: 'rgb(255,255,255)',
        borderRadius: 32,
        backgroundColor: 'transparent',
        padding: 3,
    },
    iconBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: 'rgb(255,255,255)',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    closeBtnContainer: {
        width: 58,
        height: 58,
        margin: 10,
        // borderWidth: 2.3,
        // borderColor: 'rgb(255,255,255)',
        borderRadius: 32,
        backgroundColor: 'transparent',
        padding: 3,
    },
    closeIconBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: 'rgb(255,255,255)',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    btnView: {
        borderRadius: 50,
    },
});