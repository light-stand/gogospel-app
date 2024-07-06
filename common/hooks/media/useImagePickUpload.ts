import { pickOrTakePicture } from "@/utils/media";
import { useFileUpload } from "./useFileUpload";
import { useActionSheet } from "@expo/react-native-action-sheet";
import { deleteFile } from "@/utils/s3";

const options = [
  "profile.photoSelector.launchCamera",
  "profile.photoSelector.fromGallery",
  "ui.cancel",
];

export const usePickImageUpload = () => {
  const { isLoading, handleUpload } = useFileUpload();
  const { showActionSheetWithOptions } = useActionSheet();

  const pickImage = async (prevImageUrl = "") => {
    try {
      const option = await showActionSheet();
      if (option === null) return;
      const file = await pickOrTakePicture(option);
      if (!file) return;
      const url = await handleUpload(file);
      if (prevImageUrl) await deleteFile(prevImageUrl);
      return url;
    } catch (err) {
      console.error(err);
    }
  };

  const showActionSheet = () =>
    new Promise<number | null>((ok) => {
      showActionSheetWithOptions({ options, cancelButtonIndex: 2 }, (i) =>
        ok(i !== 2 && i !== undefined ? i : null)
      );
    });

  return { isLoading, pickImage };
};
