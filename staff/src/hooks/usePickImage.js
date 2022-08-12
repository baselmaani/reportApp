import * as ImagePicker from 'expo-image-picker';

export const usePickImage = ({ onSelectImage }) => {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    if (!result.cancelled) {
      onSelectImage(result.base64);
    }
  };

  return {
    pickImage,
  };
};
