import React from 'react';
import { StyleSheet, View, Modal, Pressable, Text } from 'react-native';
import { TxtIconBtn } from './TxtIconBtn';

export default function MenuModal(props) {
    const {
        modalVisible,
        closeModal,
        resetFilters,
        resetStorage,
        deleteSelected } = props;


    return (
        <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    closeModal();
                }}
            >
                <Pressable
                    style={styles.overlay}
                    onPress={() => closeModal()}
                />
                <View style={styles.modal}>
                    <View style={styles.closeBtnContainer}>
                        <TxtIconBtn
                            style={styles.closeBtn}
                            iconName="close"
                            onPress={() => { closeModal() }}
                        />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Menu</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <TxtIconBtn
                            text="Reset"
                            text2= "Filters"
                            iconName="filter"
                            onPress={resetFilters}
                        />
                        <TxtIconBtn
                            text="Delete"
                            text2= "Storage"
                            iconName="delete"
                            onPress={resetStorage}
                        />
                        <TxtIconBtn
                            text="Delete"
                            text2= "Selected"
                            iconName="delete"
                            onPress={deleteSelected}
                        />
                    </View>
                </View>

            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
    },
    closeBtn: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    closeBtnContainer: {
        width: '100%',
        alignItems: 'flex-end',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',        
    },
    modal: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,.5)',
    },

});