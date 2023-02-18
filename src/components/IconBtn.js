import { MaterialIcons } from '@expo/vector-icons';
import { View, Pressable, StyleSheet } from 'react-native';

export const IconBtn = ({ iconName, onPress }) => (
    <View style={styles.iconBtnContainer}>
        <Pressable style={styles.iconBTN} onPress={onPress}>
            <MaterialIcons name={iconName} size={36} color="black" />
        </Pressable>
    </View>
);

const styles = StyleSheet.create({
    iconBtnContainer: {
        width: 65,
        height: 65,
        marginHorizontal: 8,
        borderWidth: 3,
        borderColor: 'black',
        borderRadius: 32,
        backgroundColor: 'transparent',
        padding: 2,
    },
    iconBTN: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        backgroundColor: 'rgba(255,255,255,.7)',
    },
});