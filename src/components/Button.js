import { MaterialIcons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity } from 'react-native';

const IconTextButton = ({ iconName, text, text2, onPress }) => (
    <TouchableOpacity onPress={onPress}>
        <View style={{ alignItems: 'center', justifyContent: 'center', margin: 14 }}>
            <MaterialIcons name={iconName} size={32} color="black" />
            <Text
                style={{
                    textAlign: 'center',
                    textAlignVertical: 'center',
                    fontSize: 16,
                    fontWeight: '400',
                }}>
                {text}
            </Text>
        </View>
    </TouchableOpacity>
);

export default IconTextButton;