import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

export const DropDownPicker = ({ label, values, selectedValues, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(prevIsOpen => !prevIsOpen);
  };

  const handleValueChange = value => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <View style={styles.dropdownContainer}>
      <Text style={styles.dropdownLabel}>{label}</Text>
      <Pressable style={styles.dropdownButton} onPress={toggleDropdown}>
        <Text style={styles.dropdownButtonText}>
          {selectedValues.length === 0 ? 'Select value(s)' : selectedValues.join(', ')}
        </Text>
        <Text style={styles.dropdownButtonIcon}>{isOpen ? '\u25B2' : '\u25BC'}</Text>
      </Pressable>
      {isOpen && (
        <View style={styles.dropdownOptionsContainer}>
          {values.map(value => (
            <Pressable
              key={value}
              style={styles.dropdownOption}
              onPress={() => handleValueChange(value)}
            >
              <Text style={styles.dropdownOptionText}>{String(value)}</Text>
              {selectedValues.includes(value) && (
                <Text style={styles.dropdownOptionIcon}>&#10003;</Text>
              )}
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    padding: 16
  },
  dropdownContainer: {
    marginBottom: 16
  },
  dropdownLabel: {
    fontWeight: 'bold',
    marginBottom: 8
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8
  },
  dropdownButtonText: {
    flex: 1,
    color: '#333',
    fontSize: 16
  },
  dropdownButtonIcon: {
    marginLeft: 8,
    color: '#333',
    fontSize: 16
  },
  dropdownOptionsContainer: {
    marginTop: 8,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#ccc'
  },
  dropdownOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8
  },
  dropdownOptionText: {
    flex: 1,
    color: '#333',
    fontSize: 16
  },
  dropdownOptionIcon: {
    marginLeft: 8,
    color: '#333',
    fontSize: 16
  }
});
