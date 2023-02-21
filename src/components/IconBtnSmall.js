import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet } from 'react-native';

export const IconBtnSmall = ({ icon, onPress }) => (
        <Pressable style={styles.btn} onPress={onPress}>
            <MaterialIcons name={icon} size={32} color="black" />            
        </Pressable>
);

const styles = StyleSheet.create({
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 6,
        borderRadius: 50,
    },
});