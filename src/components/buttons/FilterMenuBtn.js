import React from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { Containers, ModalStyle } from '../../styles/GlobalStyles';
import { IconBtn } from './FloatingButtons';
import { Closebtn } from './FlatButtons';

export default function FilterMenuButton(props) {
    const [key, setKey] = React.useState(0);

    const {
        menuOpen,
        setMenuOpen,
    } = props;

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
                            Filter Options
                        </Text>
                        <ScrollView style={ModalStyle.modalContent}>
                            <Text>Filter Menu Content</Text>
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
