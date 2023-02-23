import { MaterialIcons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { FlatBtn } from '../../../styles/GlobalStyles';

export const IconTextRowFlatBtn = ({ icon, text, onPress }) => (

        <View style={FlatBtn.rowContainer}>
            <Pressable style={FlatBtn.rowButton} onPress={onPress}>
                <MaterialIcons name={icon} size={30} color="black" />
                <Text style={FlatBtn.paddingH}>
                    {text}
                </Text>
            </Pressable>
        </View>

);