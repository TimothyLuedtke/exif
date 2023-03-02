import { Dimensions, StyleSheet } from "react-native";
import Colors from "./Colors";
import { IconSize, TextSize } from "./Sizing";

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

    holderContainer: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.gray,
        width: '50%',
        height: '50%',
        
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
        margin: 10,
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

    //
    editBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.dark,
        borderWidth: 1,
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    // 
    submitBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.dark,
        borderWidth: 1,
        backgroundColor: Colors.dark,
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },

    // 
    piecedBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.dark,
        borderWidth: 1,
        borderRadius: 30,
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
        paddingVertical: 10,
        // paddingHorizontal: 20,
        // padding: 10,
    },
    //
    select: {
        fontSize: TextSize.medium,
        color: Colors.dark,
        paddingVertical: 10,
        paddingHorizontal: 20,
        // padding: 10,
        borderColor: Colors.light,
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: Colors.light,
    },
    // 
    selected: {
        fontSize: TextSize.medium,
        color: Colors.light,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderColor: Colors.dark,
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: Colors.dark,
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
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadiusTopLeft: 10,
        borderRadiusTopRight: 10,
        paddingVertical: 10,
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

    // 1
    modal: {
        position: 'absolute',
        left: 10,
        right: 10,
        bottom: 50,
        justifyContent: 'flex-end',
        backgroundColor: Colors.white,
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
    },

    // 
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 20,
    },

    // 1
    modalTitle: {
        fontSize: TextSize.large,
        fontWeight: 'bold',
        textAlign: 'center',
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
    },

    // 1
    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },

    // 1
    modalDivider: {
        height: 1,
        backgroundColor: Colors.black,
        marginVertical: 10,
    },
});

export const DropDownPickerStyle = StyleSheet.create({

    // 1
    container: {
        // backgroundColor: Colors.gray,
        // borderRadius: 50,
        marginVertical: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    //
    // 
    labelBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderColor: Colors.dark,
        paddingVertical: 10,
        // paddingHorizontal: 40,
        width: '100%',
        marginVertical: 2,

    },
    // 1
    label: {
        color: Colors.dark,
        fontSize: TextSize.medium,
        fontWeight: '500',
        marginHorizontal: 10,
        textTransform: 'uppercase',
    },
// 
    dropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        // paddingHorizontal: 20,
    },
    // 1
    value: {
        fontSize: TextSize.medium,
        color: Colors.dark,
        paddingVertical: 10,
        paddingHorizontal: 20,
        // padding: 10,
        borderColor: Colors.light,
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: Colors.light,
    },
    // 
    selectedValue: {
        fontSize: TextSize.medium,
        color: Colors.light,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderColor: Colors.dark,
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: Colors.dark,
    },
});