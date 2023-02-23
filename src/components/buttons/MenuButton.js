import React from 'react';
import { View } from 'react-native';
import { FloatBtn } from '../../styles/GlobalStyles';
import { IconBtn } from './FloatingButtons';

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
        <View style={FloatBtn.container}>
            {menuOpen && (
                <View>
                    <IconBtn
                        icon='add-a-photo'
                        onPress={pickImage}
                    />
                    <IconBtn
                        icon='filter-alt'
                        onPress={navigateToFilters}
                    />
                    <IconBtn
                        icon='edit'
                        onPress={toggleSelectMode}
                    />
                </View>
            )}
            <IconBtn
                icon={menuOpen ? 'close' : 'menu'}
                onPress={toggleMenu}
            />
        </View>
    );
}