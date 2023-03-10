import React, { useState, useEffect } from 'react';
import { FlatList, Modal, Pressable, Text, View } from 'react-native';
import { Containers, ModalStyle } from '../styles/GlobalStyles';
import { shapedArray } from '../utils/arrayUtils';
import { reduceObjFromKeys, morphObjToArrKeyValObjs } from '../utils/objUtils';
import { Closebtn, SelectBtn, SubmitBtn, EditBtn, PiecedBtn } from './buttons/FlatButtons';

export default function FilterMenu(props) {

    const {
        menuOpen,
        setMenuOpen,
        setFiltersLoaded,
        setSelectorKeyValues,
        selectorKeyValues,
        masterAsset,
        assets,
        setAssets,
        exifKeys,
        selectedExifKeys,
        setSelectedExifKeys,
        setSelectorExif,
        dataKeys,
        selectedDataKeys,
        setSelectedDataKeys,
        setSelectorData,
        // tags,
    } = props;

    const [selectedKeys, setSelectedKeys] = useState([]);
    const [keys, setKeys] = useState(exifKeys.concat(dataKeys));

    useEffect(() => {
        setSelectedKeys(selectedExifKeys.concat(selectedDataKeys));
        console.log('Selected keys Preset: ', selectedExifKeys.concat(selectedDataKeys));
    }, [menuOpen === true]);

    const toggleSelected = (key) => {
        if (selectedKeys.includes(key)) {
            let keys = selectedKeys.filter((item) => item !== key);
            setSelectedKeys(keys);
            shapedArray(setSelectedExifKeys, exifKeys, keys);
            shapedArray(setSelectedDataKeys, dataKeys, keys);
            console.log('Selected keys: ', keys);
        } else {
            let keys = [...selectedKeys, key];
            setSelectedKeys(keys);
            shapedArray(setSelectedExifKeys, exifKeys, keys);
            shapedArray(setSelectedDataKeys, dataKeys, keys);
            console.log('Selected keys: ', keys);
        }
    }

    const toggleAll = () => {
        if (keys === exifKeys) {
            setSelectedExifKeys(exifKeys);
            setSelectedKeys(
                selectedKeys.filter((key) => dataKeys.includes(key)).concat(exifKeys)
            );
            console.log('Selected keys: ', selectedKeys.filter((key) => dataKeys.includes(key)).concat(exifKeys));
        } else if (keys === dataKeys) {
            setSelectedDataKeys(dataKeys);
            setSelectedKeys(
                selectedKeys.filter((key) => exifKeys.includes(key)).concat(dataKeys)
            );
            console.log('Selected keys: ', selectedKeys.filter((key) => exifKeys.includes(key)).concat(dataKeys));
        } else {
            setSelectedExifKeys(exifKeys);
            setSelectedDataKeys(dataKeys);
            setSelectedKeys(exifKeys.concat(dataKeys));
            console.log('Selected keys: ', exifKeys.concat(dataKeys));
        }
    }


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const resetSelected = () => {
        setSelectedKeys([]);
        setSelectedDataKeys([]);
        setSelectedExifKeys([]);
        console.log('Selected keys reset');
    }

    const closeMenu = () => {
        setMenuOpen(false);
        // resetSelected();
    }

    const submitMenu = () => {
        // setSelectorExif(morphObjToArrKeyValObjs(reduceObjFromKeys(masterAsset.exif, selectedExifKeys)));
        // console.log('selectedExif set: ', morphObjToArrKeyValObjs(reduceObjFromKeys(masterAsset.exif, selectedExifKeys)));
        // setSelectorData(morphObjToArrKeyValObjs(reduceObjFromKeys(masterAsset.data, selectedDataKeys)));
        // console.log('selectedData set: ', morphObjToArrKeyValObjs(reduceObjFromKeys(masterAsset.data, selectedDataKeys)));
        setSelectorKeyValues(morphObjToArrKeyValObjs(reduceObjFromKeys(masterAsset.exif, selectedExifKeys)).concat(morphObjToArrKeyValObjs(reduceObjFromKeys(masterAsset.data, selectedDataKeys))));
        console.log('selectedKeyValues set: ', morphObjToArrKeyValObjs(reduceObjFromKeys(masterAsset.exif, selectedExifKeys)).concat(morphObjToArrKeyValObjs(reduceObjFromKeys(masterAsset.data, selectedDataKeys))));
        // reduceAssetsFromKeys();
        // console.log('Assets reduced');
        setFiltersLoaded(true);
        closeMenu();
    }

    return (
        <View>
            {menuOpen && (
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={menuOpen}
                >
                    <Pressable
                        style={ModalStyle.modalOverlay}
                        onPress={() => {
                            closeMenu();
                        }
                        }
                    />
                    <View style={ModalStyle.modal}>
                        <View style={ModalStyle.modalClose}>
                            <Closebtn
                                onPress={toggleMenu}
                            />
                        </View>
                        <View style={ModalStyle.modalHeader}>

                            <PiecedBtn
                                text1={'All'}
                                onPress1={() => {
                                    setKeys(exifKeys.concat(dataKeys));
                                }}
                                text2={'Exif'}
                                onPress2={() => {
                                    setKeys(exifKeys);
                                }}
                                text3={'Data'}
                                onPress3={() => {
                                    setKeys(dataKeys);
                                }}
                            />
                        </View>
                        <View style={ModalStyle.modalBody}>
                            <Text style={ModalStyle.modalDivider} />
                            <View style={{ height: 300 }}>
                                <FlatList
                                    data={keys}
                                    renderItem={({ item }) => (
                                        <SelectBtn
                                            text={item}
                                            onPress={() => {
                                                toggleSelected(item);
                                            }}
                                            pressed={selectedKeys.includes(item)}
                                        />
                                    )}
                                    keyExtractor={(item) => item}
                                    numColumns={2}
                                    columnWrapperStyle={{
                                        flexWrap: 'wrap',
                                    }}
                                />
                            </View>
                        </View>
                        <View style={ModalStyle.modalDivider} />
                            <View style={ModalStyle.row}>
                                <View>
                                    <Text style={ModalStyle.text}>Exif: {exifKeys.length}</Text>
                                    <Text style={ModalStyle.text}>Data: {dataKeys.length}</Text>
                                </View>
                                <View>
                                    <Text style={ModalStyle.text}>Selected: {selectedKeys.length}</Text>
                                </View>

                            </View>
                            <View style={ModalStyle.modalDivider} />
                            <View style={ModalStyle.rowEnd}>
                                <EditBtn
                                    text={'Select All'}
                                    onPress={() => {
                                        toggleAll();
                                    }}
                                    pressed={false}
                                />
                                <EditBtn
                                    text={'Reset'}
                                    onPress={() => {
                                        resetSelected();
                                    }}
                                    pressed={false}
                                />
                                <SubmitBtn
                                    text={'Apply'}
                                    onPress={submitMenu}
                                />
                            </View>
                        </View>
                </Modal>
            )}

        </View>
    )
}
