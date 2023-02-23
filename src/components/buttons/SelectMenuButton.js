import React from 'react';
import { View } from 'react-native';
import { FloatBtn } from '../../styles/GlobalStyles';
import Colors from '../../styles/Colors';
import { IconBtn } from './FloatingButtons';

export default function SelectMenuButton(props) {

    const {
        menuOpen,
        setSelectMode,
        deleteSelected,
        deselectAll,
    } = props;

    const close = () => {
        deselectAll();
        setSelectMode(false);
    }

    return (
        <View style={FloatBtn.container}>
                <View>
                    <IconBtn
                        icon='delete'
                        color={Colors.darkred}
                        onPress={deleteSelected}
                    />
                </View>

            <IconBtn
                icon='close'
                onPress={close}
            />
        </View>
    );
}