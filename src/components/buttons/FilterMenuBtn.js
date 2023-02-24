import React, {useState} from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { Containers, ModalStyle } from '../../styles/GlobalStyles';
import { TextSize } from '../../styles/Sizing';
import { IconBtn } from './FloatingButtons';
import { Closebtn, HighlightSelectBtn } from './FlatButtons';

export default function FilterMenuBtn(props) {

    const {
        assetKeys,
        menuOpen,
        setMenuOpen,
        setSelecterKeys,
        selectorKeys,
    } = props;

    const [key, setKey] = React.useState(''); // key for modal
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


    
    // state for pressed buttons
    const [pressed, setPressed] = useState(false);
    const togglePressed = () => {
        setPressed(!pressed);
    }

    // state for modal visibility
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
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
                        toggleMenu();
                    }
                    }
                >
                    <Pressable
                        style={ModalStyle.modalOverlay}
                        onPress={toggleMenu}
                    />
                    <View style={ModalStyle.modal}>
                        <View style={ModalStyle.modalClose}>
                            <Closebtn
                                onPress={toggleMenu}
                            />
                        </View>
                        <Text style={ModalStyle.modalTitle}>
                            Filters
                        </Text>
                        <ScrollView style={ModalStyle.modalContent}>
                            <Text style={{fontSize: TextSize.medium}}>
                                Select filter options:
                            </Text>
                            <Text style={ModalStyle.modalDivider} />
                            <HighlightSelectBtn
                                text={'Test Button'}
                                onPress={() => {
                                    togglePressed();
                                 console.log('Test');
                                }}
                                pressed={pressed}
                            />
                            <Text style={ModalStyle.modalDivider} />

                        </ScrollView>
                    </View>
                </Modal>
            )}
            <View style={Containers.menuContainer}>
                <IconBtn
                    icon={'menu'}
                    onPress={toggleMenu}
                />
            </View>
        </View>
    )
}
