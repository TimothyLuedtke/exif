import { MaterialIcons } from '@expo/vector-icons';
import { Text, Pressable, StyleSheet } from 'react-native';

export const TxtIconBtn = ({ iconName, text, text2, onPress }) => (
        <Pressable style={styles.btn} onPress={onPress}>
            <MaterialIcons name={iconName} size={32} color="black" />
            <Text style={styles.txt}>
                {text}
            </Text>
            <Text style={styles.txt2}>
                {text2}
            </Text>
        </Pressable>
);

const styles = StyleSheet.create({
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 8,
    },
    txt: {
        textAlign: 'center',
        fontWeight: '350',
        fontSize: 16,
        marginTop: 6,
    },
    txt2: {
        textAlign: 'center',
        fontWeight: '350',
        fontSize: 16,
    },
});