import { MaterialIcons } from '@expo/vector-icons';
import { View, Pressable, StyleSheet } from 'react-native';

export const AddPhotoBtn = ({ onPress }) => (
    <View style={styles.iconBtnContainer}>
        <Pressable style={styles.iconBTN} onPress={onPress}>
            <MaterialIcons name='add' size={37} color="black" />
        </Pressable>
    </View>


);

const styles = StyleSheet.create({
    iconBtnContainer: {
        width: 55,
        height: 55,
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
    },
});