import React from 'react';
import { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { View, Pressable, StyleSheet } from 'react-native';
import DropdownSelector from './DropdownSelector';

export function MenuButton(props) {

    const {
        menuOpen,
        setMenuOpen,
        setFoldersModalOpen,
        navigateToFilters,
        pickImage,
        openedFolder,
        selectMode,
        setSelectMode,

        rerender,
    } = props;

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const folderName = () => {
        openedFolder.map(folder => folder.name);
    }

    const addPhotos = () => {
        console.log('Add photos to folder: ', {folderName})
        openedFolder !== null ? pickImage({folderName}) : alert('Please select a folder first');
    }

    const toggleSelectMode = () => {
        setSelectMode(!selectMode);
        console.log('Select mode: ', selectMode);
    }

    return (
        <View style={styles.btnView}>
            {menuOpen && (
                <View>
                    <View style={styles.iconBtnContainer}>
                        <Pressable style={styles.iconBtn} onPress={() => setFoldersModalOpen(true)}>
                            <MaterialIcons name='folder' size={30} color="black" />
                        </Pressable>
                    </View>
                    <View style={styles.iconBtnContainer}>
                        <Pressable style={styles.iconBtn} onPress={addPhotos}>
                            <MaterialIcons name='add-a-photo' size={30} color="black" />
                        </Pressable>
                    </View>
                    <View style={styles.iconBtnContainer}>
                        <Pressable style={styles.iconBtn} onPress={toggleSelectMode}>
                            <MaterialIcons name='check-circle' size={30} color="black" />
                        </Pressable>
                    </View>
                    <View style={styles.iconBtnContainer}>
                        <Pressable style={styles.iconBtn} onPress={navigateToFilters}>
                            <MaterialIcons name='filter-alt' size={30} color="black" />
                        </Pressable>
                    </View>
                    <View style={styles.iconBtnContainer}>
                        <Pressable style={styles.iconBtn} onPress={rerender}>
                            <MaterialIcons name='refresh' size={30} color="black" />
                        </Pressable>
                    </View>
                </View>
            )}
            <View style={styles.iconBtnContainer}>
                <Pressable style={styles.iconBtn} onPress={toggleMenu}>
                    <MaterialIcons
                        name={menuOpen ? 'keyboard-arrow-down' : 'menu'}
                        size={30}
                        color="black" />
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
        borderRadius: 32,
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