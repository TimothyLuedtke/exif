import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { FloatBtn } from '../../styles/GlobalStyles';
import { IconSize } from '../../styles/Sizing';
import Colors from '../../styles/Colors';

export const IconTextRowBtn = ({ icon, text, onPress }) => (

    <View style={FloatBtn.btnContainer} >
        <Pressable style={FloatBtn.rowButton} onPress={onPress}>
            <MaterialIcons name={icon} size={IconSize.medium} color={Colors.dark} />
            <Text color={Colors.dark}>
                {text}
            </Text>
        </Pressable>
    </View>

);

export const TextBtn = ({ text, onPress }) => (

    <View style={FloatBtn.btnContainer} >
        <Pressable style={FloatBtn.button} onPress={onPress}>
            <Text style={FloatBtn.paddingH} color={Colors.dark}>
                {text}
            </Text>
        </Pressable>
    </View>

);

export const IconBtn = ({ icon, color, onPress }) => (
    <View style={FloatBtn.btnContainer}>
        <Pressable style={FloatBtn.button} onPress={onPress}>
            <MaterialIcons
                name={icon}
                size={IconSize.medium}
                color={color ? color : Colors.dark}
            />
        </Pressable>
    </View>
);