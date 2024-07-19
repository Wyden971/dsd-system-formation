import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";
import { useCallback } from "react";
export const useImagePicker = () => {
  const { showActionSheetWithOptions } = useActionSheet();
  const pickImage = useCallback(async (isMultiple = false) => {
    return new Promise<any>((resolve, reject) => {
      showActionSheetWithOptions(
        {
          options: ["Via l'appareil photo", "Via la librarie", "Annuler"],
          cancelButtonIndex: 2,
        },
        async (result) => {
          let imageResult: ImagePicker.ImagePickerResult;
          switch (result) {
            case 0: {
              imageResult = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                aspect: [4, 3],
                quality: 1,
                allowsMultipleSelection: isMultiple,
              });

              break;
            }
            case 1: {
              imageResult = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: false,
                aspect: [4, 3],
                quality: 1,
                allowsMultipleSelection: isMultiple,
              });
              break;
            }

            default:
              return resolve(undefined);
          }

          if (!imageResult.canceled && !!imageResult.assets.length) {
            if (isMultiple) {
              resolve(imageResult.assets.map(({ uri }) => uri));
            } else {
              resolve(imageResult.assets[0].uri);
            }
          }
        }
      );
    });
  }, []);

  return {
    pickImage,
  };
};
