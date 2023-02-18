import { MaterialIcons } from '@expo/vector-icons';
import { Text, Pressable, StyleSheet } from 'react-native';

export const TxtIconBtn = ({ iconName, text, onPress }) => (
        <Pressable style={styles.btn} onPress={onPress}>
            <MaterialIcons name={iconName} size={30} color="black" />
            <Text style={styles.txt}>
                {text}
            </Text>
        </Pressable>
);

const styles = StyleSheet.create({
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    txt: {
        textAlign: 'center',
        fontWeight: '350',
        fontSize: 16,
        marginTop: 6,
    },
});