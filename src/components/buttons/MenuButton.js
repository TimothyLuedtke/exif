import React from 'react';
import { View } from 'react-native';
import { Containers, ModalStyle } from '../../styles/GlobalStyles';
import { IconBtn } from './FloatingButtons';
import { SubmitIcon } from './FlatButtons';

export default function MenuButton(props) {

    const {
        menuOpen,
        setMenuOpen,
        selectMode,
        setSelectMode,
        navigateToFilters,
        pickImage,
    } = props;

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    }

    const toggleSelectMode = () => {
        setSelectMode(!selectMode);
        console.log('Select mode: ', selectMode);
    }

    return (
        <View>
            {menuOpen && (

                <View style={ModalStyle.bottomModal}>
                    <View style={ModalStyle.darkRow}>
                            <SubmitIcon
                                icon='delete'
                                onPress={toggleSelectMode}
                            />
                        <SubmitIcon
                            icon='add-a-photo'
                            onPress={pickImage}
                        />
                        <SubmitIcon
                            icon='filter-alt'
                            onPress={navigateToFilters}
                        />
                        <SubmitIcon
                            icon='menu'
                            onPress={toggleMenu}
                        />
                    </View>
                </View>

            )}
            {!menuOpen && (
                <View style={Containers.menuContainer}>
                    <IconBtn
                        icon='menu'
                        onPress={toggleMenu}
                    />
                </View>
            )}
        </View>
    );
}