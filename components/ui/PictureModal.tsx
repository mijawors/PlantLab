import { SafeAreaView, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus, useMediaLibraryPermissions, launchImageLibraryAsync } from "expo-image-picker";


function PictureModal({handleClose, imageChanger}: any) {
  const LOCATION_SWITCH = {
    CAMERA: 'camera', 
    GALLERY: 'gallery'
  };
  const [cameraPermissionInformation, requestCameraPermission] = useCameraPermissions();
  const [galleryPermissionInformation, requestGalleryPermission] = useMediaLibraryPermissions();

  function choosePhoto(location: string) {
    if (location === LOCATION_SWITCH.CAMERA) {
      return {
        launcher: launchCameraAsync,
        picture: cameraPermissionInformation,
        setPicture: requestCameraPermission
      }
    }
    return {
      permissions: PermissionStatus.DENIED,
      launcher: launchImageLibraryAsync,
      picture: galleryPermissionInformation,
      setPicture: requestGalleryPermission
    }
  }

  async function verifyPermissions(picture: any, req: Function) {
    if (picture?.status === PermissionStatus.UNDETERMINED || PermissionStatus.GRANTED) {
      const permissionResponse = await req();
      return permissionResponse.granted;
    }
    if (picture?.status === PermissionStatus.DENIED) return false;
  }

  async function launcherHandler(location: string) {
    const photoProps = choosePhoto(location)
    const hasPermission = await verifyPermissions(photoProps.picture, photoProps.setPicture);

    if (!hasPermission) return;

    const image = await photoProps.launcher({
      allowsEditing: true,
      quality: 1,
    });

    if (!image.canceled) imageChanger(image.assets[0].uri as string)
    handleClose();
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.area} onPress={handleClose}></TouchableOpacity>
      <View style={styles.content}>
        <TouchableOpacity style={styles.button} onPress={() => launcherHandler(LOCATION_SWITCH.CAMERA)}>
          <Text style={styles.text}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => launcherHandler(LOCATION_SWITCH.GALLERY)}>
          <Text style={styles.text}>Choose from local gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.text} onPress={handleClose}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default PictureModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  area: {
    flex: 1,
    zIndex: 9,
  },
  content: {
    marginVertical: 15,
    marginLeft: 20,
    marginRight: 20
  },
  button: {
    zIndex: 10,
    backgroundColor: 'white',
    borderRadius: 25,
    marginTop: 10,
    padding: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
  },
  text: {
    textAlign: 'center',
    padding: 8
  }
})