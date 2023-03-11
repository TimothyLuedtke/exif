import React from 'react';
import { View } from 'react-native';
import { ModalStyle } from '../../styles/GlobalStyles';
import { SubmitIcon, EditBtn } from './FlatButtons';

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
            <View style={ModalStyle.row}>
                <EditBtn
                    text='Select All'
                    onPress={selectAll}
                />
                <EditBtn
                    text='Deselect All'
                    onPress={deselectAll}
                />

            </View>
            <View style={ModalStyle.darkRowEnd}>
                <SubmitIcon
                    icon='delete'
                    onPress={deleter}
                />
                <SubmitIcon
                    icon='close'
                    onPress={close}
                />
            </View>
        </View>

    );
}
