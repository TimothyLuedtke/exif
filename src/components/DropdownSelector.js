import React, { useState, useEffect } from 'react';
import { View, Pressable, FlatList, Text, StyleSheet, Picker } from 'react-native';
import { IconBtnSmall } from './IconBtnSmall';

export default function DropdownSelector(props) {

    const { placeholder, options, onPressFunction } = props;

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
        console.log('dropdown options: ' + options);
    };

    const selectItem = item => {
        console.log(onPressFunction);
        onPressFunction(item);
        console.log('selected item: ' + item);
        toggleDropdown();
    };

    return (
        <View>
            <Pressable style={styles.container} onPress={toggleDropdown}>
                <Text style={styles.btnText}>{placeholder}</Text>
                <IconBtnSmall icon="keyboard-arrow-down" onPress={toggleDropdown} />
            </Pressable>
            {showDropdown && (
                <View style={styles.dropdown}>
                    <FlatList
                        data={options}  // options is an array of strings   
                        renderItem={({ item }) => (
                            <Pressable style={styles.dropdownItem} onPress={() => selectItem(item)}>
                                <Text style={styles.dropdownItemText}>{item}</Text>
                            </Pressable>
                        )}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
        container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginBottom: 20,
        marginHorizontal: 20,

    },
    btnText: {
        fontSize: 18,
        marginLeft: 6,
        height: 40,
        width: 200,
        backgroundColor: 'white',
        marginLeft: 10,
        paddingLeft: 6,
        textAlignVertical: 'center',
    },
    dropdown: {
        marginHorizontal: 20,   
        backgroundColor: 'rgb(255,255,255)',
    },
    dropdownItem: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'yellow',
    },
    dropdownItemText: {
        fontSize: 18,
        color: 'black',

    },
});