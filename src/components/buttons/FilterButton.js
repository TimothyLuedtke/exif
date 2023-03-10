import React, { useState, useEffect } from 'react';
import { FlatList, Modal, Pressable, Text, View } from 'react-native';
import { ModalStyle } from '../../styles/GlobalStyles';
import { shapedArray } from '../../utils/arrayUtils';
import { reduceObjFromKeys, morphObjToArrKeyValObjs } from '../../utils/objUtils';
import { Closebtn, SelectBtn, SubmitBtn, EditBtn, PiecedBtn } from './FlatButtons';

export default function FilterButton(props) {

    const {
        filterBtnOpen,
        setFilterBtnOpen,
        assets,
        index,
        item,
        options,
        selectedKeyValues,
        setFilteredAssets,
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

    const toggleValue = (value) => {
        if (selectedValues.includes(value)) {
            const newValues = selectedValues.filter((v) => v !== value);
            setSelectedValues(newValues);
            if (newValues.length > 0) {
                setSelectedKeyValues({ ...selectedKeyValues, [label]: newValues });
                console.log('selectedKeyValues: ', { ...selectedKeyValues, [label]: newValues });
            } else {
                delete selectedKeyValues[label];
                console.log('selectedKeyValues: ', selectedKeyValues);
            }
            setToggled(true);
            // console.log('removed value: ', value);
            // console.log('new selectedValues: ', newValues);
        } else {
            setSelectedValues([...selectedValues, value]);
            if (selectedValues.length > 0) {
                setSelectedKeyValues({ ...selectedKeyValues, [label]: [...selectedValues, value] });
                console.log('selectedKeyValues: ', { ...selectedKeyValues, [label]: [...selectedValues, value] });
            } else {
                setSelectedKeyValues({ ...selectedKeyValues, [label]: [value] });
                console.log('selectedKeyValues: ', { ...selectedKeyValues, [label]: [value] });
            }
            setToggled(true);
            // console.log('added value: ', value);
            // console.log('new selectedValues: ', [...selectedValues, value]);
        }
    };

    return (



        <View>

            <Modal
                animationType='slide'
                transparent={true}
                visible={filterBtnOpen}
            >
                <Pressable
                    style={ModalStyle.modalOverlay}
                    onPress={() => {
                        setFilterBtnOpen(!filterBtnOpen);
                    }
                    }
                />
                <View style={ModalStyle.modal}>
                    <View style={ModalStyle.modalClose}>
                        <Closebtn
                            onPress={() => {
                                setFilterBtnOpen(!filterBtnOpen);
                            }}
                        />
                    </View>
                    <View style={ModalStyle.modalHeader}>
                        <Text style={ModalStyle.modalTitle}>
                            {label}
                        </Text>
                    </View>
                    <View style={ModalStyle.modalBody}>
                        <View style={ModalStyle.row}>
                            {/* <EditBtn
                                text={`Unselect (${selectedKeys.length})`}
                                onPress={() => {
                                    resetSelected();
                                    // console.log('Loaded keys: ', loadedKeys);   
                                }}
                                pressed={false}
                            />
                            <EditBtn
                                text={'Select All'}
                                onPress={() => {
                                    toggleAll();
                                }}
                                pressed={false}
                            /> */}
                        </View>
                        <View style={ModalStyle.row}>
                        </View>
                        <View style={{ height: 300 }}>
                            <Text style={ModalStyle.modalDivider} />
                            <FlatList
                                data={values}
                                renderItem={({ value, index }) => (
                                    <Pressable
                            style={FlatBtn.selectBtn}
                            key={index}
                            onPress={() => toggleValue(value)}
                        >
                            <Text style={selectedValues.includes(value) ? FlatBtn.selected : FlatBtn.select}>
                                {value}
                            </Text>

                            <MaterialIcons
                                name={'close'}
                                size={IconSize.small}
                                color={
                                    selectedValues.includes(value) ?
                                        Colors.dark :
                                        Colors.background} />
                        </Pressable>
                                )}
                                keyExtractor={(item) => item}
                                numColumns={5}
                                columnWrapperStyle={{
                                    flexWrap: 'wrap',
                                }}
                            />
                            <Text style={ModalStyle.modalDivider} />
                        </View>
                    </View>
                    <View style={ModalStyle.modalFooter}>

                        {/* <SubmitBtn
                            text={'Apply'}
                            onPress={submitMenu}
                        /> */}
                    </View>
                </View>
            </Modal>
        </View>
    );
}