import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';

export const CloseBtn = ({ onPress }) => (
        <Pressable style={styles.btn} onPress={onPress}>
            <MaterialIcons name='close' size={32} color="black" />
        </Pressable>
);

const styles = StyleSheet.create({
    btn: {
        width: 55,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
    }
});