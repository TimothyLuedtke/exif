import React from 'react';
import { StyleSheet, View, Modal, Pressable, Text } from 'react-native';
import { TxtIconBtn } from './TxtIconBtn';
import { CloseBtn } from './CloseBtn';

export default function MenuModal(props) {
    const {
        modalVisible,
        closeModal,
        resetFilters,
        resetStorage,
        setStorage,
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
                        <CloseBtn
                            onPress={() => closeModal()}
                        />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Storage</Text>
                    </View>
                    <View style={styles.contentContainer}>
                        <TxtIconBtn
                            text="Delete Storage"
                            iconName="delete"
                            onPress={resetStorage}
                        />
                        <TxtIconBtn
                            text="Set Storage"
                            iconName="storage"
                            onPress={setStorage}
                        />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Filters</Text>
                    </View>
                    <View style={styles.contentContainer}>
                    <TxtIconBtn
                            text="Reset"
                            text2= "Filters"
                            iconName="filter"
                            onPress={resetFilters}
                        />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Selected</Text>
                    </View>
                    <View style={styles.contentContainer}>
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
    closeBtnContainer: {
        top: 0,
        right: 0,
        position: 'absolute',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        margin: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'semi-bold',        
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
        backgroundColor: 'rgba(255,255,255,.3)',
    },

});