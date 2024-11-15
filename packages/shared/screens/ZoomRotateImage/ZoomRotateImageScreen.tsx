import React, {useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withTiming,
} from 'react-native-reanimated';

const AnimatedImage = Animated.createAnimatedComponent(Image);
const {width, height} = {width: 300, height: 300};

const ZoomRotateImageScreen = ({uri}: {uri: string}) => {
  const {theme} = useGetTheme();
  const {textNegative500} = theme;

  const scale = useSharedValue(1);
  const [rotation, setRotation] = useState(0);

  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const rotateImage = () => {
    setRotation(prevRotation => (prevRotation + 180) % 360);
  };

  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: event => {
        scale.value = event.scale;
      },
      onEnd: () => {
        scale.value = withTiming(1, {duration: 300});
      },
    });

  const t = useTranslations();

  return (
    <View style={styles.container}>
      <PinchGestureHandler onGestureEvent={pinchHandler}>
        <Animated.View style={[styles.imageContainer, {width, height}]}>
          <AnimatedImage
            source={{uri}}
            style={[
              styles.image,
              imageStyle,
              {
                width,
                height,
                transform: [{rotate: `${rotation}deg`}, {scale: scale.value}],
              },
            ]}
            resizeMode="contain"
          />
        </Animated.View>
      </PinchGestureHandler>
      <TouchableOpacity onPress={rotateImage} style={styles.button}>
        <Text>Rotate 180°</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ZoomRotateImageScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  imageContainer: {
    overflow: 'hidden',
    marginBottom: 20,
  },
  image: {
    flex: 1,
  },
  button: {
    marginTop: 10,
  },
});
