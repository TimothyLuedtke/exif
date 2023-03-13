import React from 'react';
import { View } from 'react-native';
import { ModalStyle } from '../styles/GlobalStyles';
import { Closebtn, SubmitIcon, EditBtn } from './buttons/FlatButtons';

export default function SelectionMenu(props) {

    const {
        setSelectMode,
        deleteSelected,
        selectAll,
        deselectAll,
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
            <View style={ModalStyle.rowEnd}>

                <Closebtn
                    onPress={close}
                />
            </View>
            <View style={ModalStyle.rowEnd}>
                <EditBtn
                    text='Deselect All'
                    onPress={deselectAll}
                />
                <EditBtn
                    text='Select All'
                    onPress={selectAll}
                />
                <SubmitIcon
                    icon='delete'
                    onPress={deleter}
                />
            </View>
        </View>

    );
}
