import React, { useEffect, useState } from 'react';
import { FlatList, Modal, Pressable, Text, View } from 'react-native';
import { Containers, ModalStyle } from '../../styles/GlobalStyles';
import { IconBtn } from './FloatingButtons';
import { Closebtn, SelectBtn, SubmitBtn, EditBtn } from './FlatButtons';

export default function FilterMenu(props) {

    const {
        assetKeys,
        rawAssetKeys,
        menuOpen,
        setMenuOpen,
        setSelectorKeys,
        selectorKeys,
    } = props;

    const [isLoaded, setIsLoaded] = useState(false);

    const [selectedKeys, setSelectedKeys] = useState([]);
    const [keys, setKeys] = useState(assetKeys);
    const [toggleKeys, setToggleKeys] = useState(false);
    const [keyChain, setKeyChain] = useState('Set Filtered');

    useEffect(() => {
        setKeys(assetKeys);
        setIsLoaded(true);
    }, [assetKeys]);

    const toggleSelected = (key) => {
        if (selectedKeys.includes(key)) {
            setSelectedKeys(selectedKeys.filter((item) => item !== key));
        } else {
            setSelectedKeys([...selectedKeys, key]);
        }
    }

    const toggleKeyChain = (toggle) => {
        if (toggle) {
            setKeys(assetKeys);
            setKeyChain('Filtered Data');
        } else {
            setKeys(rawAssetKeys);
            setKeyChain('Raw Data');
        }
        setToggleKeys(!toggle);
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
                                        setSelectedKeys(assetKeys);
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
                            <EditBtn
                                text={keyChain}
                                onPress={() => {
                                    toggleKeyChain(toggleKeys);
                                }}
                            />
                            <SubmitBtn
                                text={'Finished'}
                                onPress={() => {
                                    setSelectorKeys(selectedKeys);
                                    console.log('Selected keys: ', selectedKeys);
                                    resetMenu();
                                }}
                            />
                        </View>
                    </View>
                </Modal>
            )}
            {isLoaded && (
            <View style={Containers.menuContainer}>
                <IconBtn
                    icon={'add'}
                    onPress={toggleMenu}
                />
            </View>
            )}
        </View>
    )
}