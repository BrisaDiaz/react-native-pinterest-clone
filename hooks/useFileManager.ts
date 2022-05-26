import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Permissions from "expo-permissions";
import * as Sharing from "expo-sharing";

export default function useFileManager() {
  const downloadExpoFile = async (uri: string, fileName: string) => {
    let fileUri = FileSystem.documentDirectory + fileName;
    const result = await FileSystem.downloadAsync(uri, fileUri);

    return result;
  };

  const saveExpoFile = async (fileUri: string) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
      return true;
    }
    return false;
  };
  const shareExpoFile = async (fileUri: string) => {
    await Sharing.shareAsync(fileUri);
  };
  const share = async (uri: string) => {
    const result = await downloadExpoFile(uri, Date.now() + ".jpg");
    console.log(result)
    await shareExpoFile(result.uri);
  };
  const save = async (uri: string) => {
    const result = await downloadExpoFile(uri, Date.now() + ".jpg");
    const saveResult = await saveExpoFile(result.uri);
    return saveResult;
  };
  return { save, share };
}