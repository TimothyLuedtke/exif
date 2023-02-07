import React from 'react';
import { TouchableOpacity, StyleSheet, Text} from 'react-native'

const DeleteButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
      <Text style={styles.textStyle}> Delete</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5
  },
   textStyle: {
    color: '#fff',
    fontWeight: 'bold'
  }
})

export default DeleteButton;