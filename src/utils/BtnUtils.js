import { clearStorage, retrieveData } from '../storage/asyncStorage';

export const resetFilters = async (props) => {
    const storedPhotoAssets = await retrieveData(PHOTOS_ASSETS_STORAGE_KEY);
    if (storedPhotoAssets) {
        props.setDisplayedAssets(storedPhotoAssets);
        props.setFilteredAssets([]);
        console.log('Reset filters and displaying stored assets.');
        console.log('Stored assets: ', storedPhotoAssets);
    } else {
        setDisplayedAssets([]);
        setFilteredAssets([]);
        console.log('No stored assets to display.');
    }
};

export const resetStorage = async ({setDisplayedAssets, setFilteredAssets}) => {
    await clearStorage();
    setDisplayedAssets([]);
    setFilteredAssets([]);
    console.log('Storage cleared.');
};
