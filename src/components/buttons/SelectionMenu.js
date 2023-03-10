import React from 'react';
import { View } from 'react-native';
import { ModalStyle } from '../../styles/GlobalStyles';
import { Closebtn, SubmitIcon, EditBtn } from './FlatButtons';

export default function SelectionMenu(props) {

    const {
        setSelectMode,
        deleteSelected,
        selectAll,
        deselectAll,
        selectedAssets,
    } = props;

    const deleter = () => {
        deleteSelected();
        setSelectMode(false);
    }

    const close = () => {
        deselectAll();
        setSelectMode(false);
    }

    return (
        <View style={ModalStyle.bottomModal}>
            <View style={ModalStyle.bottomModalClose} >
                <View style={ModalStyle.modalClose} >
                <Closebtn               
                    onPress={close}
                />
                </View>
            </View>
            <View style={ModalStyle.modalHeader}>
            </View>
            <View style={ModalStyle.modalFooter}>

                <EditBtn
                    text={`Clear (${selectedAssets.length})`}
                    onPress={deselectAll}
                />
                <EditBtn
                    text={'Select All'}
                    onPress={selectAll}
                />

                <SubmitIcon
                    icon={'delete'}
                    onPress={deleter}
                />
            </View>
        </View>
    );
}
