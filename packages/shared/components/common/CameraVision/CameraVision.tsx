// import { ICON_TYPE, IconX } from 'components/Icon'
import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Platform,
} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {useIsFocused} from '@react-navigation/native';
import {Appbar} from '../Appbar';

// TODO: Components is still in implement progress
export const generatePath = (path: string) =>
  `${Platform.OS === 'android' ? 'file://' : ''}${path}`;

interface CameraVisionProps {
  camera: React.LegacyRef<Camera>;
  takePhoto: () => void;
  flash: boolean;
  setFlash: () => void;
}

export const ON_IMAGE_SAVED = 'ON_IMAGE_SAVED';
const CameraVision = ({camera, takePhoto}: CameraVisionProps) => {
  const backCamera = true;
  const availableDevices = useCameraDevice(backCamera ? 'back' : 'front');
  const isFocused = useIsFocused();
  // const lastImage = imagePaths.length - 1
  const checkPermission = async () => {
    const statusPms = await Camera.getCameraPermissionStatus();
    if (statusPms !== 'denied') {
      const permission = await Camera.requestCameraPermission();
      if (permission === 'denied') await Linking.openSettings();
    }
  };

  React.useEffect(() => {
    checkPermission();
  }, []);

  return (
    <View style={{flex: 1}}>
      <Appbar backIconColor="white" />
      <View style={{flex: 7, marginTop: 30}}>
        {availableDevices && isFocused && (
          <View style={{backgroundColor: 'black'}}>
            <Camera
              device={availableDevices}
              isActive={isFocused}
              ref={camera}
              photo={true}
              style={{width: '100%', height: '100%'}}
            />
          </View>
        )}
      </View>
      <View style={styles.cameraButton}>
        <TouchableOpacity style={styles.buttonCapture} onPress={takePhoto}>
          <View style={styles.viewCapture} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textButton: {
    fontSize: Platform.OS === 'ios' ? 24 : 20,
  },
  buttonCapture: {
    backgroundColor: 'white',
    width: 67,
    height: 67,
    borderRadius: 50,
    justifyContent: 'center',
  },
  viewCapture: {
    borderRadius: 50,
    borderWidth: 1.5,
    width: 58,
    height: 58,
    alignSelf: 'center',
  },
  cameraButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 2,
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  amountImage: {
    position: 'absolute',
    backgroundColor: 'red',
    top: -5,
    right: -5,
    width: Platform.OS === 'ios' ? 18 : 22,
    height: Platform.OS === 'ios' ? 18 : 22,
    borderRadius: 15,
    justifyContent: 'center',
  },
});

export default CameraVision;
