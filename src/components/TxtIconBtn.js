import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export const TxtIconBtn = ({ iconName, text, onPress }) => (
    <View style={styles.iconTxtContainer}>
        <Pressable style={styles.iconTxtBTN} onPress={onPress}>
            <MaterialIcons name={iconName} size={30} color="black" />
            <Text style={styles.iconTxt}>
                {text}
            </Text>
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
});