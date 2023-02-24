import React, { useState, useEffect } from 'react';
import { View, Pressable, FlatList, Text, StyleSheet } from 'react-native';
import { IconBtn } from './FlatButtons';
import { useToggleCallback } from '../utils/hooks/ToggleUtils';

export default function DropdownMultiPicker(props) {
    const { options, selected, setSelected, placeholder } = props;

    const [open, setOpen] = useState(false);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const toggleOpen = useToggleCallback(open, setOpen);

    const toggleOption = (option) => {
        const newSelected = [...selectedOptions];
        const index = newSelected.indexOf(option);
        if (index > -1) {
            newSelected.splice(index, 1);
        } else {
            newSelected.push(option);
        }
        setSelectedOptions(newSelected);
    }

    const close = () => {
        setOpen(false);
        setSelected(selectedOptions);
    }

    useEffect(() => {
        setSelectedOptions(selected);
    }, [selected]);

    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={toggleOpen}>
                <Text style={styles.text}>
                    {selectedOptions.length > 0 ? selectedOptions.join(', ') : placeholder}
                </Text>
                <IconBtn icon={open ? 'arrow-drop-up' : 'arrow-drop-down'} />
            </Pressable>
            {open &&
                <View style={styles.optionsContainer}>
                    <FlatList
                        data={options}
                        keyExtractor={item => item}
                        renderItem={({ item }) => (
                            <Pressable style={styles.option} onPress={() => toggleOption(item)}>
                                <Text style={styles.text}>
                                    {item}
                                </Text>
                                {selectedOptions.includes(item) &&
                                    <IconBtn icon='check' />
                                }
                            </Pressable>
                        )}
                    />
                    <Pressable style={styles.option} onPress={close}>
                        <Text style={styles.text}>
                            Done
                        </Text>
                    </Pressable>
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'lightgrey',
        marginBottom: 10,
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
    },
    optionsContainer: {
        position: 'absolute',
        top: 50,
        left: 0,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'lightgrey',
        zIndex: 2,
    },
    option: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
    },
});