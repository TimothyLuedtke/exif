import { Dimensions, StyleSheet } from "react-native";
import Colors from "./Colors";
import { TextSize } from "./Sizing";

const { height, width } = Dimensions.get("window");


export const Containers = StyleSheet.create({

    // 1
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
        width: width / 3,
        height: width / 3,
    },

    // 1
    overlayCheckBox: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },

    // 1
    halfCoverImage: {
        position: 'relative',
        width: width / 3,
        height: width / 3,
        resizeMode: 'cover',
    },

    fullScreen: {
        flex: 1,
        backgroundColor: Colors.background,
        resizeMode: "contain",
        height: height * 1,
        width,
    },

});

export const FloatBtn = StyleSheet.create({

    // 1
    paddingH: {
        paddingHorizontal: 5,
    },

    // 1
    btnContainer: {
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: Colors.gray,
    },

    // 1
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        padding: 12,
        backgroundColor: Colors.dark,
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
        borderRadius: 50,
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
        // backgroundColor: Colors.light,
    },

    // 1
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        padding: 12,
        backgroundColor: Colors.light,
    },

    invertedEditBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.dark,
        borderColor: Colors.white,
        borderWidth: 1,
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    //
    editBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.light,
        borderColor: Colors.dark,
        borderWidth: 1,
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    submitIconBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // borderColor: Colors.dark,
        // borderWidth: 1,
        backgroundColor: Colors.light,
        borderRadius: 50,
        padding: 10,
        paddingHorizontal: 10,
    },
    // 
    submitBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.dark,
        borderWidth: 1,
        backgroundColor: Colors.dark,
        borderRadius: 50,
        padding: 10,
        paddingHorizontal: 20,
    },

    // 
    piecedBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.dark,
        borderWidth: 1,
        borderRadius: 50,
        // paddingVertical: 10,
        // paddingHorizontal: 20,
    },

    btnTxt: {
        fontSize: TextSize.medium,
        color: Colors.dark,
    },

    btn: {
        borderColor: Colors.dark,
        borderRightWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },

    btnEnd: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },

    btnTxtH: {
        fontSize: TextSize.medium,
        color: Colors.light,

    },

    btnStartH: {
        borderColor: Colors.dark,
        borderRightWidth: 1,
        backgroundColor: Colors.dark,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },

    btnH: {
        borderColor: Colors.dark,
        borderRightWidth: 1,
        backgroundColor: Colors.dark,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },

    btnEndH: {
        borderColor: Colors.dark,
        borderRightWidth: 1,
        backgroundColor: Colors.dark,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },

    //
    selectBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingVertical: 10,
        paddingVertical: 5,
        borderRadius: 50,
        backgroundColor: Colors.background,
    },
    //
    select: {
        fontSize: TextSize.medium,
        color: Colors.dark,
        paddingVertical: 10,
        paddingHorizontal: 20,
        // padding: 10,
        borderColor: Colors.dark,
        borderWidth: 1,
        borderRadius: 50,
        backgroundColor: Colors.white,
    },
    // 
    selected: {
        fontSize: TextSize.medium,
        color: Colors.light,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderColor: Colors.dark,
        borderWidth: 1,
        borderRadius: 50,
        backgroundColor: Colors.dark,
    },

    outlineSelected: {
        fontSize: TextSize.medium,
        color: Colors.dark,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderColor: Colors.dark,
        borderWidth: 1,
        borderRadius: 50,
        backgroundColor: Colors.white,
    },

    placeholderBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderColor: Colors.light,
        borderWidth: 1,
        borderRadius: 50,
        backgroundColor: Colors.light,
    },

    placeholderTxt: {
        fontSize: TextSize.medium,
        color: Colors.dark,
    },
});

export const ModalStyle = StyleSheet.create({

    // 1
    modalOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: Colors.transparent50,
    },

    bottomModal: {
        // position: 'absolute',
        // bottom: 0,
        // left: 0,
        // right: 0,
        width: '100%',
        // alignItems: 'center',
        // backgroundColor: Colors.transparent,
        // borderRadiusTopLeft: 10,
        // borderRadiusTopRight: 10,
        // paddingBottom: 10,
        // zIndex: 2,
        // shadowColor: Colors.black,
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 3.84,
        // elevation: 5,
    },
    bottomModalClose: {
        width: '100%',
        alignItems: 'flex-end',
        marginBottom: 40,
    },

    // 1
    modal: {
        position: 'absolute',
        left: 10,
        right: 10,
        bottom: 30,
        justifyContent: 'flex-end',
        backgroundColor: Colors.light,
        borderRadius: 10,
        padding: 10,
        zIndex: 2,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    // 
    modalClose: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 2,
        // backgroundColor: Colors.gray,
    },

    // 
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },

    // 1
    modalTitle: {
        fontSize: TextSize.large,
        fontWeight: 'bold',
        textAlign: 'center',
        textDecorationColor: Colors.dark,
        // marginVertical: 15,
    },

    // 1
    modalBody: {
        fontSize: TextSize.medium,
        textAlign: 'center',
    },

    // 1
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: Colors.transparent,
    },

    darkRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: Colors.dark,
    },

    rowEnd: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: Colors.transparent,
    },

    darkRowEnd: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: Colors.dark,
    },

    rowStart: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: Colors.transparent,
    },

    column: {
        flexDirection: 'column',
    },

    text: {
        fontSize: TextSize.medium,
        color: Colors.dark,
    },

    // 1
    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // marginTop: 10,
    },

    modalTabFooter: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.dark,
        // paddingVertical: 10,
        // paddingHorizontal: 20,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },

    // 1
    modalDivider: {
        height: 1,
        backgroundColor: Colors.black,
        marginVertical: 10,
    },
});

export const PaginationStyle = StyleSheet.create({
    paginationContainer: {
        bottom: 0,

    },
    pagination: {
        borderRadius: 100,
        backgroundColor: Colors.transparent,
        borderColor: Colors.dark,
        borderWidth: 1,
        width: 10,
        height: 10,
        marginHorizontal: 5,

    },
});