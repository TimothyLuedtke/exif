import React, { useState } from 'react';
import { FlatList, Modal, Pressable, Text, View } from 'react-native';
import { Containers, ModalStyle } from '../../styles/GlobalStyles';
import { IconBtn } from './FloatingButtons';
import { Closebtn, SelectBtn, SubmitBtn, EditBtn } from './FlatButtons';

export default function FilterMenu(props) {

    const {
        assetKeys,
        menuOpen,
        setMenuOpen,
        setSelectorKeys,
        selectorKeys,
    } = props;

    const [key, setKey] = React.useState(0);
    const [selectedKeys, setSelectedKeys] = useState([]);


    // copy of assetKeys to be used for filtering options
    const loadedKeys = assetKeys;

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

    return (
        <View>
            {menuOpen && (
                <Modal
                    key={key}
                    animationType="slide"
                    transparent={true}
                    visible={menuOpen}
                    onRequestClose={() => {
                        resetMenu();
                    }
                    }
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
                                    setSelectedKeys(loadedKeys);
                                    console.log('All keys selected');
                                }}
                                pressed={false}
                            />
                            </View>
                            <View style={{ height: 300 }}>
                                <Text style={ModalStyle.modalDivider} />
                                <FlatList
                                    data={loadedKeys}
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
            <View style={Containers.menuContainer}>
                <IconBtn
                    icon={'add'}
                    onPress={toggleMenu}
                />
            </View>
        </View>
    )
}
