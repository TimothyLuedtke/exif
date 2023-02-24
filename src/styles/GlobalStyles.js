import { Dimensions, StyleSheet } from "react-native";
import Colors from "./Colors";

const { width, height } = Dimensions.get("window");


export const Containers = StyleSheet.create({
    // 1
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    // 1
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    // 1
    menuContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: 2,
        // backgroundColor: Colors.gray800,
    },

    // 1
    selectContainer: {
        position: 'absolute',
        bottom: 0,
        left: 10,
        width: '70%',
        zIndex: 2,
        // backgroundColor: Colors.gray800,
    },


});

export const ImageStyle = StyleSheet.create({

    // 1
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1,
        width: width / 2,
        height: width / 2,
    },

    // 1
    overlayCheckBox: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // 1
    halfCoverImage: {
        position: 'relative',
        width: width / 2,
        height: width / 2,
        resizeMode: 'cover',
    },

});

export const FloatBtn = StyleSheet.create({

    // 1
    paddingH: {
        paddingHorizontal: 5,
    },

    // 1
    btnContainer: {
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: Colors.gray,
    },

    // 1
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        padding: 12,
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 3.84,
        elevation: 5,
    },

    // 1
    rowButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        padding: 12,
        width: 150,
        backgroundColor: Colors.white,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 3.84,
        elevation: 5,
    },

});

export const FlatBtn = StyleSheet.create({

    // 1
    btnContainer: {
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: Colors.gray,
    },

    // 1
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        padding: 12,
        backgroundColor: Colors.white,
    },

    rowButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        padding: 12,
        width: 150,
        backgroundColor: Colors.white,
    },

});
