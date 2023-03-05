import React, { useEffect, useState } from 'react';
import { FlatList, Modal, Pressable, Text, View } from 'react-native';
import { ModalStyle } from '../../styles/GlobalStyles';
import { combineObjects } from '../../utils/arrayUtils';
import { extractUniqueValues, removeSingleValuePairs } from '../../utils/arrayUtils';
import { Closebtn, SelectBtn, SubmitBtn, EditBtn, PiecedBtn } from './FlatButtons';

export default function FilterMenu(props) {

    const {
        menuOpen,
        setMenuOpen,
        setSelectorKeyValues,
        // setSelectorKeys,
        masterAsset,
        masterKeys,
        exifKeys,
        dataKeys,
        uriVals,
    } = props;

    // const [isLoaded, setIsLoaded] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [keys, setKeys] = useState(exifKeys);
    const [selectedExifKeys, setSelectedExifKeys] = useState([]);
    const [selectedDataKeys, setSelectedDataKeys] = useState([]);

    const organizeKeys = (keys) => {
        setSelectedExifKeys(keys.filter((key) => exifKeys.includes(key)));
        setSelectedDataKeys(keys.filter((key) => dataKeys.includes(key)));
        console.log('Selected exif keys: ', keys.filter((key) => exifKeys.includes(key)));
        console.log('Selected data keys: ', keys.filter((key) => dataKeys.includes(key)));
    }

    const toggleSelected = (key) => {
        if (selectedKeys.includes(key)) {
            setSelectedKeys(selectedKeys.filter((item) => item !== key));
            organizeKeys(selectedKeys.filter((item) => item !== key));
            console.log('Selected keys: ', selectedKeys.filter((item) => item !== key));
        } else {
            setSelectedKeys([...selectedKeys, key]);
            organizeKeys([...selectedKeys, key]);
            console.log('Selected keys: ', [...selectedKeys, key]);
        }
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const resetSelected = () => {
        setSelectedKeys([]);
        setSelectedExifKeys([]);
        setSelectedDataKeys([]);
        console.log('Selected keys reset');
    }

    const resetMenu = () => {
        setMenuOpen(false);
        resetSelected();
    }

    const submitMenu = () => {
        setMenuOpen(false);
        // setSelectorKeys(selectedKeys);
        setSelectorKeyValues(filterUsableKeyVals(assets, selectedKeys));
        console.log('Selected key values: ', filterUsableKeyVals(assets, selectedKeys));
        // resetMenu();
    }

    const filterUsableKeyVals = (arr, keys) => {
        uniqueKeyVals = extractUniqueValues(arr, keys);
        return removeSingleValuePairs(uniqueKeyVals);
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
                                    text={`Clear (${selectedKeys.length})`}
                                    onPress={() => {
                                        resetSelected();
                                        // console.log('Loaded keys: ', loadedKeys);   
                                    }}
                                    pressed={false}
                                />
                                <EditBtn
                                    text={'Select All'}
                                    onPress={() => {
                                        setSelectedKeys(keys);
                                        console.log('All keys selected');
                                    }}
                                    pressed={false}
                                />
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
                                text1={1}
                                onPress1={() => {
                                    setKeys(exifKeys);
                                }}
                                text2={2}
                                onPress2={() => {
                                    setKeys(dataKeys);
                                }}
                                text3={3}
                                onPress3={() => {
                                    setKeys(uriVals);
                                }}
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
