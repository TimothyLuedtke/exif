import { Dimensions, StyleSheet } from "react-native";
import Colors from "./Colors";

const { width, height } = Dimensions.get("window");


export const Containers = StyleSheet.create({
    // 1
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    rowMargin: {
        margin: 10,
    },

    contain: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },

    containerCenter: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },


    containerTranslucency: {
        backgroundColor: Colors.background,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },

    expandingBtnContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        zIndex: 2,
        padding: 5,
        backgroundColor: 'grey',
    },

    overlayBottomRow: {
        flex: 1,
        flexDirection: 'row',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 2,
        backgroundColor: 'grey',
    },

    // containerAbsolute: {
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     bottom: 0,
    //     backgroundColor: Colors.background,
    // },

    // overlayContainer: {
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     bottom: 0,
    //     zIndex: 1,
    //     backgroundColor: Colors.transparent,
    // },

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

    fullCoverImage: {
        position: 'relative',
        width: width,
        height: height,
        resizeMode: 'cover',
    },

    fullContainImage: {
        position: 'relative',
        width: width,
        height: height,
        resizeMode: 'contain',
    },

    fullSquareContainImage: {
        position: 'relative',
        width: width,
        height: width,
        resizeMode: 'contain',
    },

    fullSquareCoverImage: {
        position: 'relative',
        width: width,
        height: width,
        resizeMode: 'cover',
    },

    halfCoverImage: {
        position: 'relative',
        width: width / 2,
        height: width / 2,
        resizeMode: 'cover',
    },

    halfContainImage: {
        position: 'relative',
        width: width / 2,
        height: width / 2,
        resizeMode: 'contain',
    },

    thirdCoverImage: {
        position: 'relative',
        width: width / 3,
        height: width / 3,
        resizeMode: 'cover',
    },

    thirdContainImage: {
        position: 'relative',
        width: width / 3,
        height: width / 3,
        resizeMode: 'contain',
    },

});

export const Modal = StyleSheet.create({
    modal: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },

    modalContainer: {
        width: '80%',
        height: '80%',
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
    },

});

export const Row = StyleSheet.create({
    tightrow: {
        flexDirection: 'row',
    },

    rowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    rowLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    absoluteBottomRow: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        backgroundColor: Colors.background,
        zIndex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    absoluteTopRow: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 100,
        backgroundColor: Colors.background,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    row: {
        height: 80,
        width: '100%',
        backgroundColor: Colors.background,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },
});



export const FloatBtn = StyleSheet.create({

    borderRadius50: {
        borderRadius: 50,
    },

    paddingH: {
        paddingHorizontal: 5,
    },

    container: {
        margin: 10,
        borderRadius: 32,
        backgroundColor: 'transparent',
        padding: 3,
    },

    rowContainer: {
        width: width / 2.5,

        borderRadius: 32,
        backgroundColor: 'transparent',
        padding: 3,
    },

    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        padding: 10,
        backgroundColor: Colors.background,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowRadius: 3.84,
        elevation: 5,
    },

    rowButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 32,
        padding: 10,
        backgroundColor: Colors.background,
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

    paddingH: {
        paddingHorizontal: 5,
    },

    rowContainer: {
        width: width / 2.5,
        margin: 10,
    },

    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    rowButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        // backgroundColor: Colors.red,
    },

});
