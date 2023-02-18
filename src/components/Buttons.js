import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export const IconTxtBtn = ({ iconName, text, onPress }) => (
    <View style={styles.iconTxtContainer}>
        <Pressable style={styles.iconTxtBTN} onPress={onPress}>
            <MaterialIcons name={iconName} size={30} color="black" />
            <Text style={styles.iconTxt}>
                {text}
            </Text>
        </Pressable>
    </View>
);

export const IconBtn = ({ iconName, onPress }) => (
    <View style={styles.iconBtnContainer}>
        <Pressable style={styles.iconBTN} onPress={onPress}>
            <MaterialIcons name={iconName} size={38} color="black" />
        </Pressable>
    </View>
);

const styles = StyleSheet.create({
    iconTxtContainer: {
        flex: 1,
        flexDirection: 'column',
        width: 65,
        height: 65,
    },
    iconTxtBTN: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconTxt: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
    },
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