import React, { useState } from 'react';
import { FlatList, Modal, Pressable, Text, View } from 'react-native';
import { ModalStyle } from '../../styles/GlobalStyles';
import { getKeyValues } from '../../utils/arrayUtils';
import { extractUniqueValues, removeSingleValuePairs } from '../../utils/arrayUtils';
import { Closebtn, SelectBtn, SubmitBtn, EditBtn, PiecedBtn } from './FlatButtons';

export default function FilterMenu(props) {

    const {
        menuOpen,
        setMenuOpen,
        // setSelectorKeys,
        masterAsset,
        setFilteringAsset,
        exifKeys,
        selectedExifKeys,
        setSelectedExifKeys,
        dataKeys,
        selectedDataKeys,
        setSelectedDataKeys,
        uriVals,
        // tags,
    } = props;

    // const [isLoaded, setIsLoaded] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [keys, setKeys] = useState(exifKeys);

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
        resetSelected();
    }

    const reduceMasterAsset = () => {
        const reduce = (source, keys) => {
            const result = {};
            for (const key of keys) {
                result[key] = source[key];
            }
            return result;
        };

        const reducedExif = reduce(masterAsset.exif, selectedExifKeys);
        console.log('Reduced exif:', reducedExif);

        const reducedData = reduce(masterAsset.data, selectedDataKeys);
        console.log('Reduced data:', reducedData);

        return {
            exif: reducedExif,
            data: reducedData,
        };
    };



    const submitMenu = () => {
        // setSelectedExifKeys(selectedKeys.filter((key) => exifKeys.includes(key)));
        // setSelectedDataKeys(selectedKeys.filter((key) => dataKeys.includes(key)));
        // console.log('Selected exif keys: ', selectedKeys.filter((key) => exifKeys.includes(key)));
        // console.log('Selected data keys: ', selectedKeys.filter((key) => dataKeys.includes(key)));
        setFilteringAsset(reduceMasterAsset());
        console.log('Filtering asset: ', reduceMasterAsset());
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
