import { StyleSheet } from "react-native";
import Colors from "./Colors";

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(255,255,255)',
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export const FloatBtn = StyleSheet.create({

    borderRadius50: {
        borderRadius: 50,
    },

    floatingIconButtonContainer: {
        width: 58,
        height: 58,
        margin: 10,
        // borderWidth: 2.3,
        // borderColor: 'rgb(255,255,255)',
        borderRadius: 32,
        backgroundColor: 'transparent',
        padding: 3,
    },

    floatingIconButton: {
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
        shadowRadius: 3.84,
        elevation: 5,
    },

});

