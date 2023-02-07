import React from 'react';
import { TouchableOpacity, StyleSheet, Text} from 'react-native'

const AddButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <Text style={styles.textStyle}> Add</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5
  },
   textStyle: {
    color: '#fff',
    fontWeight: 'bold'
  }
})

export default AddButton;