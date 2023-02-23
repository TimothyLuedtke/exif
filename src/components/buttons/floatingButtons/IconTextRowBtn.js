import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { FloatBtn } from '../../../styles/GlobalStyles';

export const IconTextRowBtn = ({ icon, text, onPress }) => (

        <View >
            <Pressable style={FlatBtn.rowButton} onPress={onPress}>
                <MaterialIcons name={icon} size={30} color="black" />
                <Text style={FlatBtn.paddingH}>
                    {text}
                </Text>
            </Pressable>
        </View>

);