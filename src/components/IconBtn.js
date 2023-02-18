import { MaterialIcons } from '@expo/vector-icons';
import { View, Pressable, StyleSheet } from 'react-native';

export const IconBtn = ({ iconName, onPress }) => (
    <View style={styles.iconBtnContainer}>
        <Pressable style={styles.iconBTN} onPress={onPress}>
            <MaterialIcons name={iconName} size={38} color="black" />
        </Pressable>
    </View>
);

const styles = StyleSheet.create({
    iconBtnContainer: {
        width: 65,
        height: 65,
        marginHorizontal: 10,
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 32,
        backgroundColor: 'transparent',
        padding: 3,
    },
    iconBTN: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        backgroundColor: '#f5f5f5',
    },
});