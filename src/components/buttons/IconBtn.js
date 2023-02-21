import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';

export const IconBtn = ( {icon, onPress} ) => (
    <View style={styles.iconBtnContainer}>
        <Pressable style={styles.btn} onPress={onPress}>
        <MaterialIcons name={ icon } size={29} color="black" />
        </Pressable>
    </View>
);

const styles = StyleSheet.create({
    iconBtnContainer: {
        width: 58,
        height: 58,
        margin: 10,
        borderRadius: 32,
        backgroundColor: 'transparent',
        padding: 3,
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        backgroundColor: 'rgb(255,255,255)',
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
});