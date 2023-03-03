import React, { useEffect, useState } from 'react';
import { FlatList, Modal, Pressable, Text, View } from 'react-native';
import { ModalStyle } from '../../styles/GlobalStyles';
import { extractUniqueValues, removeSingleValuePairs } from '../../utils/arrayUtils';
import { Closebtn, SelectBtn, SubmitBtn, EditBtn, PiecedBtn } from './FlatButtons';

export default function FilterMenu(props) {

    const {
        assets,
        tags,
        parsedKeys,
        exifKeys,
        menuOpen,
        setMenuOpen,
        setSelectorKeys,
        setSelectorKeyValues,
    } = props;

    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [keys, setKeys] = useState(parsedKeys);

    useEffect(() => {
        setKeys(exifKeys);
        setIsLoaded(true);
    }, [exifKeys]);

    const toggleSelected = (key) => {
        if (selectedKeys.includes(key)) {
            setSelectedKeys(selectedKeys.filter((item) => item !== key));
        } else {
            setSelectedKeys([...selectedKeys, key]);
        }
    }

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const resetSelected = () => {
        setSelectedKeys([]);
    }

    const resetMenu = () => {
        setMenuOpen(false);
        resetSelected();
    }

    const submitMenu = () => {
        setMenuOpen(false);
        setSelectorKeys(selectedKeys);
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
            {menuOpen && isLoaded && (
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
                                        console.log('Selected keys reset');
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
                                                console.log(([...selectedKeys] + ', ' + item));
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
                                    setKeys(parsedKeys);
                                }}
                                text3={3}
                                onPress3={() => {
                                    setKeys(tags);
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
