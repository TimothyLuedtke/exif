import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Modal, Pressable, Text, TextInput } from 'react-native';
import { CloseBtn } from './CloseBtn';
import DropdownSelector from '../DropdownSelector';
import { IconBtnSmall } from './IconBtnSmall';
import { TxtIconBtn } from './TxtIconBtn';

export default function SettingsModal(props) {

    const {
        closeModal,
        clearCache,
        set2x2View,
        set3x3View,
        hydrate } = props;
    const [key, setKey] = useState(0);

    useEffect(() => {
        setKey(key + 1);
        console.log('SettingsModal key: ', key);
    }, [clearCache, set2x2View, set3x3View, hydrate]);

    return (
        <Modal
            key={key}
            animationType="slide"
            transparent={true}
            visible={true}
            onRequestClose={() => {
                closeModal();
            }
            }
        >
            <Pressable
                style={styles.overlay}
                onPress={() => {
                    closeModal();
                }}
            >
                <View style={styles.modal}>
                    <CloseBtn closeModal={closeModal} />
                    <Text>Settings</Text>
                    
                </View>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modal: {
        width: '80%',
        height: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
