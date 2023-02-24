import React from 'react';
import { View } from 'react-native';
import { Containers } from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';
import { IconBtn, IconTextRowBtn } from './FloatingButtons';

export default function SelectionMenu(props) {

    const {
        setSelectMode,
        deleteSelected,
        selectAll,
        deselectAll,
        selectedAssets,
        displayedAssets,
    } = props;

    const close = () => {
        deselectAll();
        setSelectMode(false);
    }

    return (

        <View>
            <View style={Containers.selectContainer}>
                <IconTextRowBtn
                    icon={selectedAssets.length === displayedAssets.length ? 'radio-button-unchecked' : 'check-circle-outline'}
                    text={selectedAssets.length === displayedAssets.length ? 'Deselect All' : 'Select All'}
                    onPress={selectedAssets.length === displayedAssets.length ? () => deselectAll() : () => selectAll()}
                />
                <IconTextRowBtn
                    icon={'close'}
                    text={`${selectedAssets.length} Selected`}
                    onPress={() => deselectAll()}
                />
            </View>

            <View style={Containers.menuContainer}>
                <IconBtn
                    icon='delete'
                    color={Colors.darkred}
                    onPress={deleteSelected}
                />
                <IconBtn
                    icon='close'
                    onPress={close}
                />
            </View>

        </View>
    );
}