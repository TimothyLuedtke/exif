import React, { useState, useEffect } from 'react';
import { FlatList, Modal, Pressable, Text, View } from 'react-native';
import { ModalStyle } from '../../styles/GlobalStyles';
import { filterNestedObjArr } from '../../utils/objUtils';
import { Closebtn, SelectBtn, EditBtn, SubmitIcon } from './FlatButtons';

export default function FilterButton(props) {

    const {
        assets,
        item,
        // options,
        selectedKeyValues,
        setFilteredAssets,
        filteredAssets,
        setSelectedKeyValues,
    } = props;

    const [isOpen, setIsOpen] = useState(false);
    const [toggled, setToggled] = useState(false);

    const label = Object.keys(item)[0];
    const values = Object.values(item)[0];
    const assetsClone = assets;

    const [selectedValues, setSelectedValues] = useState([]);

    useEffect(() => {
        setFilteredAssets(filterNestedObjArr(assetsClone, selectedKeyValues));
        // console.log('filteredAssets: ', filterNestedObjArr(assetsClone, selectedKeyValues));
        setToggled(false);
    }, [toggled === true]);

    const toggleAll = () => {
        if (selectedValues.length === values.length) {
            setSelectedValues([]);
            delete selectedKeyValues[label];
            // console.log('selectedKeyValues: ', selectedKeyValues);
            setToggled(true);
        } else {
            setSelectedValues(values);
            setSelectedKeyValues({ ...selectedKeyValues, [label]: values });
            // console.log('selectedKeyValues: ', { ...selectedKeyValues, [label]: values });
            setToggled(true);
        }
    };

    const toggleValue = (value) => {
        if (selectedValues.includes(value)) {
            const newValues = selectedValues.filter((v) => v !== value);
            setSelectedValues(newValues);
            if (newValues.length > 0) {
                setSelectedKeyValues({ ...selectedKeyValues, [label]: newValues });
                // console.log('selectedKeyValues: ', { ...selectedKeyValues, [label]: newValues });
            } else {
                delete selectedKeyValues[label];
                // console.log('selectedKeyValues: ', selectedKeyValues);
            }
            setToggled(true);
            // console.log('removed value: ', value);
            // console.log('new selectedValues: ', newValues);
        } else {
            setSelectedValues([...selectedValues, value]);
            if (selectedValues.length > 0) {
                setSelectedKeyValues({ ...selectedKeyValues, [label]: [...selectedValues, value] });
                // console.log('selectedKeyValues: ', { ...selectedKeyValues, [label]: [...selectedValues, value] });
            } else {
                setSelectedKeyValues({ ...selectedKeyValues, [label]: [value] });
                // console.log('selectedKeyValues: ', { ...selectedKeyValues, [label]: [value] });
            }
            setToggled(true);
            // console.log('added value: ', value);
            // console.log('new selectedValues: ', [...selectedValues, value]);
        }
    };

    return (

        <View>
            <SelectBtn
                text={label}
                onPress={() => {
                    setIsOpen(!isOpen);
                }}
                pressed={selectedValues.length > 0}
            />
            {isOpen && (
                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={isOpen}
                >
                    <Pressable
                        style={ModalStyle.modalOverlay}
                        onPress={() => {
                            setIsOpen(!isOpen);
                        }
                        }
                    />
                    <View style={ModalStyle.modal}>
                        <View style={ModalStyle.modalClose}>
                            <Closebtn
                                onPress={() => {
                                    setIsOpen(!isOpen);
                                }}
                            />
                        </View>
                        <View style={ModalStyle.modalHeader}>
                            <Text style={ModalStyle.modalTitle}>
                                {label}
                            </Text>
                        </View>
                                <View style={ModalStyle.modalDivider} />
                        <View style={ModalStyle.modalBody}>
                            <View style={{ height: 300 }}>
                                <FlatList
                                    data={values}
                                    renderItem={({ item, index }) => (
                                        <SelectBtn
                                            text={item}
                                            key={index}
                                            onPress={() => toggleValue(item)}
                                            pressed={selectedValues.includes(item)}
                                        />
                                    )}
                                    keyExtractor={(item, index) => index.toString()}
                                    numColumns={2}
                                    columnWrapperStyle={{
                                        flexWrap: 'wrap',
                                    }}
                                />
                            </View>
                        </View>
                                <View style={ModalStyle.modalDivider} />
                                    <View style={ModalStyle.row}>
                                    <Text style={ModalStyle.text}>
                                        {filteredAssets.length + ' of ' + assetsClone.length + ' matches'}
                                    </Text>
                                </View>
                        <View style={ModalStyle.modalDivider} />
                        <View style={ModalStyle.rowEnd}>
                            <EditBtn
                                text={'Clear'}
                                onPress={() => {
                                    setSelectedValues([]);
                                    delete selectedKeyValues[label];
                                    console.log('selectedKeyValues: ', selectedKeyValues);
                                    setToggled(true);
                                }}
                            />
                            <EditBtn
                                text={selectedValues.length === values.length ? 'Unselect All' : 'Select All'}
                                onPress={toggleAll}
                            />
                            <SubmitIcon
                            icon={'check'}
                            onPress={() => {
                                setIsOpen(!isOpen);
                            }}
                            />
                        </View>
                    </View>
                </Modal>
            )}
        </View>

    );
}