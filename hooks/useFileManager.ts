import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as ImagePicker from "expo-image-picker";
export default function useFileManager() {
  const downloadExpoFile = async (uri: string, fileName: string) => {
    let fileUri = FileSystem.documentDirectory + fileName;
    const result = await FileSystem.downloadAsync(uri, fileUri);

    return result;
  };
  const requestCameraPermissions = async () => {
    const { accessPrivileges } = await MediaLibrary.getPermissionsAsync();
    if (accessPrivileges !== "all") {
      const { accessPrivileges: requestPermissionsResponse } =
        await MediaLibrary.requestPermissionsAsync();
      return requestPermissionsResponse;
    }
    return accessPrivileges;
  };

  const saveExpoFile = async (fileUri: string) => {
    let accessPrivileges = await requestCameraPermissions();

    if (accessPrivileges === "all") {
      const asset = await MediaLibrary.createAssetAsync(fileUri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
      return true;
    }
    return false;
  };
  const shareExpoFile = async (fileUri: string) => {
    await Sharing.shareAsync(fileUri);
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      return result;
    }
    return null;
  };

  const share = async (uri: string) => {
    const result = await downloadExpoFile(uri, Date.now() + ".jpg");
    console.log(result);
    await shareExpoFile(result.uri);
  };
  const save = async (uri: string) => {
    const result = await downloadExpoFile(uri, Date.now() + ".jpg");
    const saveResult = await saveExpoFile(result.uri);
    return saveResult;
  };
  return { save, share, pickImage };
}
