import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';

export const IconBtn = ( {icon, onPress} ) => (
        <Pressable style={styles.btn} onPress={onPress}>
            <MaterialIcons name={ icon } size={35} color="black" />
        </Pressable>
);

const styles = StyleSheet.create({
    btn: {
        width: 65,
        height: 65,
        alignItems: 'center',
        justifyContent: 'center',
    },
});