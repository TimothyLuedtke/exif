import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export const TxtIconRowBtn = ({ icon, text, onPress }) => (
        <View style={styles.iconBtnContainer}>
        <Pressable style={styles.btn} onPress={onPress}>
            <MaterialIcons name={icon} size={32} color="black" />
            <Text style={styles.txt}>
                {text}
            </Text>            
        </Pressable>
        </View>
);

const styles = StyleSheet.create({
    iconBtnContainer: {
        flexDirection: 'row',
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 12,
    },
    txt: {
        textAlign: 'center',
        fontWeight: '350',
        fontSize: 16,
        marginTop: 6,
    },
});