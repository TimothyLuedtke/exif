import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, View } from 'react-native';
import { FloatBtn } from '../../../styles/GlobalStyles';

export const IconBtn = ( {icon, onPress} ) => (
    <View style={FloatBtn.container}>
        <Pressable style={FloatBtn.button} onPress={onPress}>
        <MaterialIcons name={ icon } size={30} color="black" />
        </Pressable>
    </View>
);
