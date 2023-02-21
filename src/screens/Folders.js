import { Dimensions, Image, Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { FlatGrid } from 'react-native-super-grid';
import { clearStorage, getAllKeys, getMultiDatas, storeData, retrieveData, removeData } from '../utils/storage/asyncStorage';
import { MenuButton } from '../components/MenuAccordionBtn';
import FoldersModal from '../components/FoldersModal';
import { Images } from '../components/Images/Images';
import { SelectableImages } from '../components/Images/SelectableImages';
import DropdownSelector from '../components/DropdownSelector';

const { width } = Dimensions.get('window');

const FOLDERS_STORAGE_KEY = 'folders';

export default function FoldersScreen({ navigation, route }) {
    const [key, setKey] = useState(0);

    const [openedFolder, setOpenedFolder] = useState(null);
    const [folders, setFolders] = useState([]);

    const [foldersModalOpen, setFoldersModalOpen] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const [selectedAssets, setSelectedAssets] = useState([]);
    const [selectMode, setSelectMode] = useState(false);

    const defaultOpenedFolder = { name: 'uncategorized', assets: [] };

    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);


    useEffect(() => {
        let foldersStored;
        const getFolders = async () => {
            foldersStored = await retrieveData(FOLDERS_STORAGE_KEY);
        };
        getFolders().then(() => {
            foldersStored = foldersStored || [];
            setFolders(foldersStored);
            console.log('Retrieved folders: ', foldersStored);
        });
    }, [createFolder, deleteFolder, clearCache, addAssets, deleteSelectedAssets]);


    const createFolder = async (folderName, selectedAssets) => {
        if(!selectedAssets) selectedAssets = [];
        const newFolders = [...folders, { name: folderName, assets: selectedAssets }];
        await storeData(FOLDERS_STORAGE_KEY, newFolders).then(() => {
            setFolders(newFolders);
        });
        console.log('Created new folder: ', folderName);
        console.log('Stored folders: ', newFolders);
    };

    const addAssets = async (folderName, selectedAssets) => {
        const newFolders = folders.map((image) => {
            if (image.name === folderName) {
                console.log('Folder found: ', image.name);
                if(!image.assets) {
                    image.assets = [];
                    console.log('Folder assets not found: ', image.name);
                } 
                return {
                    name: image.name,
                    assets: [...image.assets, ...selectedAssets],
                };
            } else {
                console.log('Folder not found: ', image.name);
                return image;
            }
        });
        await storeData(FOLDERS_STORAGE_KEY, newFolders);
        console.log('Added assets to openedFolder: ', folderName);
    };

    const openFolder = async (folderName) => {
        const openedFolder = folders.find(image => image.name === folderName);
        setOpenedFolder(openedFolder);
        console.log('Opened folder: ', folderName);
    };

    const deleteFolder = async (folderName) => {
        const newFolders = folders.filter(image => image.name !== folderName);
        await storeData(FOLDERS_STORAGE_KEY, newFolders);
        setFolders(newFolders);
        console.log('Deleted folder: ', folderName);
    };

    const clearCache = async () => {
        await clearStorage();
        console.log('Cleared cache.');
        setFolders([]);
    };

    const rerender = () => {
        setKey(key + 1);
        console.log('Rerendered homescreen.');
    };
    const deleteSelectedAssets = async (folderName, selectedAssets) => {
        const newFolders = folders.map((image) => {
            if (image.name === folderName) {
                console.log('Folder found: ', image.name);
                return {
                    name: image.name,
                    assets: image.assets.filter(asset => !selectedAssets.includes(asset)),
                };
            } else {
                return image;
            }
        });
        await storeData(FOLDERS_STORAGE_KEY, newFolders);
        console.log('Deleted assets from openedFolder: ', folderName);
    };

    const selectAssets = async (uri) => {
        if (selectedAssets.includes(uri)) {
            setSelectedAssets(selectedAssets.filter(image => image !== uri));
        } else {
            setSelectedAssets([...selectedAssets, uri]);
        }
    };

    const pickImage = async (folderName) => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsMultipleSelection: true,
            exif: true,
            quality: 1,
        });
        if (!result.canceled) {
            setKey(key + 1);
            console.log('Picked image(s).');
            // console.log('Result: ', result);
            const newPhotoAssets = result.assets.map((image) => {
                return {
                    exif: image.exif,
                    uri: image.uri,
                    customTags: [],
                };
            });

            if (folderName === '') {
                await createFolder('New Folder', newPhotoAssets);
            } else {
                await addAssets(folderName, newPhotoAssets);
            }
            await openFolder(folderName === '' ? 'New Folder' : folderName);
        } else {
            alert('No assets selected.');
        }
    };

    const navigateToFilters = () => {
        console.log('Navigating to Filters...');
        navigation.navigate('Filters', {
            importedAssets: openedFolder,
        });
    };

    function RenderedOpenedFolder() {
        const assets = openedFolder !== null ? openedFolder.assets : [];
        const folderName = openedFolder !== null ? openedFolder.name : 'uncategorized';
        return (
            <View>
                <FlatGrid
                    key={key}
                    itemDimension={width / 2}
                    data={assets}
                    style={styles.gridView}
                    spacing={10}
                    renderItem={selectMode ? SelectableImages(images = { assets }) : Images(images = { assets })}
                />
            </View>
        );
    }



    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.openedFolder}>
            </View>
            <View style={styles.bottomContainer}>
                {selectedAssets.length > 0 && selectMode === true && (
                    <Text style={styles.bottomBtnText}>{selectedAssets.length} selected</Text>
                )}
                <View style={styles.bottomBtnContainer}>
                    <MenuButton                        
                        menuOpen={menuOpen}
                        setMenuOpen={setMenuOpen}
                        setFoldersModalOpen={setFoldersModalOpen}
                        selectMode={selectMode}
                        setSelectMode={setSelectMode}
                        navigateToFilters={navigateToFilters}
                        pickImage={pickImage}
                        rerender={rerender}
                    />

                </View>
            </View>
            <FoldersModal
                foldersModalOpen={foldersModalOpen}
                setFoldersModalOpen={setFoldersModalOpen}
                folders={folders}
                setFolders={setFolders}
                openedFolder={openedFolder}
                createFolder={createFolder}
                openFolder={openFolder}
                deleteFolder={deleteFolder}
                clearCache={clearCache}
                closeModal={() => setFoldersModalOpen(false)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },
    gridView: {
        flex: 1,
    },
    image: {
        position: 'relative',
        resizeMode: 'cover',
        width: width / 2,
        height: width / 2,
    },
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        padding: 7,
        backgroundColor: 'grey',
    },
    bottomBtnContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: 2,
        borderRadius: 50,
        padding: 5,
    },
    bottomBtnText: {
        color: 'black',
        fontSize: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 22,
    },
    bottomText: {
        color: 'black',
        fontSize: 15,
        fontWeight: 'semibold',
    },
    topBtnContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        padding: 5,
        backgroundColor: 'grey',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        width: width / 2,
        height: width / 2,
    },
});