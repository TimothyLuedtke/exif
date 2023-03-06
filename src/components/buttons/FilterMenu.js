import React, { useState, useEffect } from 'react';
import { FlatList, Modal, Pressable, Text, View } from 'react-native';
import { ModalStyle } from '../../styles/GlobalStyles';
import { shapedArray } from '../../utils/arrayUtils';
import { reduceObjFromKeys, morphObjToArrKeyValObjs } from '../../utils/objUtils';
import { Closebtn, SelectBtn, SubmitBtn, EditBtn, PiecedBtn } from './FlatButtons';

export default function FilterMenu(props) {

    const {
        menuOpen,
        setMenuOpen,
        setSelectorKeyValues,
        masterAsset,
        exifKeys,
        selectedExifKeys,
        setSelectedExifKeys,
        setSelectorExif,
        dataKeys,
        selectedDataKeys,
        setSelectedDataKeys,
        setSelectorData,
        uriVals,
        // tags,
    } = props;

    const [selectedKeys, setSelectedKeys] = useState([]);
    const [keys, setKeys] = useState(exifKeys);
    const [reducedExif, setReducedExif] = useState({});
    const [reducedData, setReducedData] = useState({});

    useEffect(() => {
        if (menuOpen) {
            setSelectedKeys(selectedExifKeys.concat(selectedDataKeys));
            console.log('Selected keys Preset: ', selectedExifKeys.concat(selectedDataKeys));
        } else {
            setSelectedKeys([]);
            console.log('Selected keys Reset: ', selectedKeys);
        }
    }, [menuOpen]);

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
        } else {
            setSelectedDataKeys(dataKeys);
            setSelectedKeys(
                selectedKeys.filter((key) => exifKeys.includes(key)).concat(dataKeys)
            );
            console.log('Selected keys: ', selectedKeys.filter((key) => exifKeys.includes(key)).concat(dataKeys));
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

    const resetMenu = () => {
        setMenuOpen(false);
        // resetSelected();
    }

    // const reduceMasterAsset = () => {

    //     return {
    //         exif: reducedExif,
    //         data: reducedData,
    //     };
    // };

    const submitMenu = () => {
        // setReducedExif(reduceObjFromKeys(masterAsset.exif, selectedExifKeys));
        // console.log('Reduced exif object:', reduceObjFromKeys(masterAsset.exif, selectedExifKeys));
        // setReducedData(reduceObjFromKeys(masterAsset.data, selectedDataKeys));
        // console.log('Reduced data object:', reduceObjFromKeys(masterAsset.data, selectedDataKeys));
        // setFilteringAsset(reduceMasterAsset());
        // console.log('Filtering asset: ', reduceMasterAsset());
        setSelectorExif(morphObjToArrKeyValObjs(reduceObjFromKeys(masterAsset.exif, selectedExifKeys)));
        console.log('selectedExif set: ', morphObjToArrKeyValObjs(reduceObjFromKeys(masterAsset.exif, selectedExifKeys)));
        setSelectorData(morphObjToArrKeyValObjs(reduceObjFromKeys(masterAsset.data, selectedDataKeys)));
        console.log('selectedData set: ', morphObjToArrKeyValObjs(reduceObjFromKeys(masterAsset.data, selectedDataKeys)));
        setSelectorKeyValues(morphObjToArrKeyValObjs(reduceObjFromKeys(masterAsset.exif, selectedExifKeys)));
        console.log('selectedKeyValues set: ', morphObjToArrKeyValObjs(reduceObjFromKeys(masterAsset.exif, selectedExifKeys)));
        resetMenu();
    }

    // const filterUsableKeyVals = (arr, keys) => {
    //     uniqueKeyVals = extractUniqueValues(arr, keys);
    //     return removeSingleValuePairs(uniqueKeyVals);
    // }

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
                            resetMenu();
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
                            <Text style={ModalStyle.modalTitle}>
                                Filter Options
                            </Text>
                        </View>
                        <View style={ModalStyle.modalBody}>
                            <View style={ModalStyle.row}>
                                <EditBtn
                                    text={`Unselect (${selectedKeys.length})`}
                                    onPress={() => {
                                        resetSelected();
                                        // console.log('Loaded keys: ', loadedKeys);   
                                    }}
                                    pressed={false}
                                />
                                <EditBtn
                                    text={'Select All'}
                                    onPress={() => {
                                        toggleAll();
                                    }}
                                    pressed={false}
                                />
                            </View>
                            <View style={ModalStyle.row}>
                            </View>
                            <View style={{ height: 300 }}>
                                <Text style={ModalStyle.modalDivider} />
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
                                    numColumns={5}
                                    columnWrapperStyle={{
                                        flexWrap: 'wrap',
                                    }}
                                />
                                <Text style={ModalStyle.modalDivider} />
                            </View>
                        </View>
                        <View style={ModalStyle.modalFooter}>
                            <PiecedBtn
                                text1={'Exif'}
                                onPress1={() => {
                                    setKeys(exifKeys);
                                }}
                                text2={'Data'}
                                onPress2={() => {
                                    setKeys(dataKeys);
                                }}
                            // text3={3}
                            // onPress3={() => {
                            //     setTags(tags);
                            // }}
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
