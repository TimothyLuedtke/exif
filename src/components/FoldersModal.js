// import React from 'react';
// import { useState, useEffect } from 'react';
// import { StyleSheet, View, Modal, Pressable, Text, TextInput } from 'react-native';
// import { CloseBtn } from './CloseBtn';
// import DropdownSelector from './DropdownSelector';
// import { IconBtnSmall } from './IconBtnSmall';
// import { TxtIconBtn } from './TxtIconBtn';


// export default function FoldersModal(props) {

//     const {
//         foldersModalOpen,
//         setFoldersModalOpen,
//         closeModal,
//         folders,
//         setFolders,
//         createFolder,
//         openFolder,
//         deleteFolder,
//         openedFolder,
//         clearCache,
//     } = props;

//     useEffect(() => {
//         setKey(key + 1);
//         console.log('FoldersModal key: ', key);
//     }, [foldersModalOpen, createFolder, openFolder, deleteFolder, clearCache, openPressedFolder, submitFolder ]);

//     let currentFolderName = folders.find(folder => folder.name === openedFolder);
//     const folderNames = folders.map(folder => folder.name);
    
//     const [newFolderName, setNewFolderName] = useState('');
//     const [key, setKey] = useState(0);

//     const submitFolder = () => {
//         createFolder(newFolderName, []);
//         openFolder(newFolderName);
//         console.log('Folder submitted: ', newFolderName);
//         setNewFolderName(null);
//     };

//     const openPressedFolder = (folderName) => {
//         openFolder(folderName);
//         console.log('Folder opened: ', folderName);
//     };

//     return (
//         <Modal
//             key={key}
//             animationType="slide"
//             transparent={true}
//             visible={foldersModalOpen}
//             onRequestClose={() => {
//                 closeModal();
//             }
//             }
//         >
//             <Pressable
//                 style={styles.overlay}
//                 onPress={() => closeModal()}
//             />
//             <View style={styles.modal}>
//                 <View style={styles.header}>
//                     <Text style={styles.title}>Folders</Text>
//                     <Text style={styles.subtitle}>Current: {currentFolderName}</Text>
//                     <CloseBtn
//                         onPress={() => closeModal()}
//                     />
//                 </View>
//                 <View style={styles.contentContainer}>
//                     <View style={styles.addFolderContainer}>
//                         <TextInput
//                             style={styles.input}
//                             onChangeText={(text) => setNewFolderName(text)}
//                             onSubmitEditing={() => submitFolder()}
//                             clearButtonMode='while-editing'
//                             value={folderNames}
//                             maxLength={30}
//                             fontSize={18}

//                             placeholder="Create a new folder..."
//                         />
//                         {/* <IconBtnSmall
//                             icon="check"             
//                             onPress={() => submitFolder()}
//                         /> */}
//                     </View>
//                 </View>
//                 <View style={styles.contentContainer}>
//                     <DropdownSelector
//                         placeholder="Open a folder"
//                         options={folderNames}
//                         onPressFunction={openPressedFolder}
//                     />
//                 </View>
//                 <View style={styles.contentContainer}>
//                     <DropdownSelector
//                         placeholder="Delete a folder"
//                         options={folderNames}
//                         onPressFunction={deleteFolder}
//                     />
//                 </View>
//                 <View style={styles.contentContainer}>
//                     <TxtIconBtn
//                         icon="delete"
//                         onPress={() => clearCache()}
//                         text="Clear cache"
//                     />
//                 </View>
//             </View>
//         </Modal>
//     );
// }

// const styles = StyleSheet.create({
//     addFolderContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         borderStyle: 'solid',
//         borderBottomWidth: 1,
//         borderBottomColor: 'black',
//         marginBottom: 20,
//         marginHorizontal: 20,

//     },
//     overlay: {
//         position: 'absolute',
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//         backgroundColor: 'rgba(0,0,0,0.5)',
//     },
//     modal: {
//         position: 'absolute',
//         bottom: 0,
//         left: 0,
//         right: 0,
//         height: '75%',
//         backgroundColor: 'white',
//         borderTopLeftRadius: 20,
//         borderTopRightRadius: 20,
//         padding: 20,
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 4,
//         elevation: 5,
//     },

//     header: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 20,

//     },
//     title: {
//         fontSize: 20,
//         fontWeight: 'semibold',
//         padding: 8,
//         paddingHorizontal: 20,


//     },
//     contentContainer: {
//         padding: 10,
//     },
//     input: {
//         height: 40,
//         marginLeft: 10,
//         paddingLeft: 6,
//         width: 200,
//         fontSize: 18,
//     },
// });