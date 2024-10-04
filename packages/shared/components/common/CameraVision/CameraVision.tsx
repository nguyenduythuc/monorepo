// import { ICON_TYPE, IconX } from 'components/Icon'
import React, {Dispatch, SetStateAction} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Platform,
  Image,
  Text,
} from 'react-native';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
// import { color } from 'theme'
import {useIsFocused} from '@react-navigation/native';
// import TopControl from './TopControl'
// import { Box } from 'components/styled'
// import PinLocation from './PinLocation'
import moment from 'moment';
import {Appbar} from '../Appbar';
// import { ImageType } from '.'

// TODO: Components is still in implement progress
export const generatePath = (path: string) =>
  `${Platform.OS === 'android' ? 'file://' : ''}${path}`;

interface CameraVisionProps {
  camera: React.LegacyRef<Camera>;
  takePhoto: () => void;
  // imagePaths: ImageType[]
  flash: boolean;
  setFlash: () => void;
  // onBack: () => void
  // onPressImage: () => void
  // isPinGPS: boolean
  // onPinGPS?: Dispatch<SetStateAction<boolean>>
  // currentAddress?: string
}

export const ON_IMAGE_SAVED = 'ON_IMAGE_SAVED';
const CameraVision = ({
  camera,
  takePhoto,
  setFlash,
  flash,
  // // imagePaths,
  // onBack,
  // onPressImage,
  // isPinGPS,
  // onPinGPS,
  // currentAddress,
}: CameraVisionProps) => {
  const [backCamera, setBackCamera] = React.useState(true);
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
      {/* <TopControl
                style={{ flex: 1 }}
                flash={flash}
                setFlash={setFlash}
                isPinGPS={isPinGPS}
                onPinGPS={onPinGPS}
                onBack={onBack}
            />
            {isPinGPS && !!currentAddress && (
                <PinLocation address={currentAddress || ''} time={moment().format('DD/MM/YYYY HH:mm')} />
            )} */}
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
              enableHighQualityPhotos={true}
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
    // color: color.palette.white,
    fontSize: Platform.OS === 'ios' ? 24 : 20,
  },
  buttonCapture: {
    // marginStart: -22,
    // backgroundColor: color.palette.white,
    backgroundColor: 'white',
    width: 67,
    height: 67,
    borderRadius: 50,
    justifyContent: 'center',
  },
  viewCapture: {
    // borderColor: color.palette.pureGrey,
    borderRadius: 50,
    borderWidth: 1.5,
    width: 58,
    height: 58,
    alignSelf: 'center',
  },
  cameraButton: {
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: color.palette.pureBlack,
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
