import React, {useMemo, useState} from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withTiming,
} from 'react-native-reanimated';
import {Icon} from '@lfvn-customer/shared/components';

const AnimatedImage = Animated.createAnimatedComponent(Image);
const {width, height} = {width: 300, height: 300};

const ZoomRotateImageScreen = ({uri}: {uri: string}) => {
  const {theme} = useGetTheme();
  const {textNegative500} = theme;

  const scale = useSharedValue(1);
  const [rotation, setRotation] = useState(0);

  const {bgUseful500, bgNegative100} = theme;

  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  });

  const rotateImage90 = () => {
    setRotation(prevRotation => (prevRotation + 90) % 360);
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

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {rotate: `${rotation}deg`}, // Updates when rotation changes
        {scale: scale.value}, // Reacts to scale shared value
      ],
    };
  }, [rotation]);

  const t = useTranslations();

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <PinchGestureHandler onGestureEvent={pinchHandler}>
          <Animated.View style={[styles.imageContainer, {width, height}]}>
            <AnimatedImage
              source={{uri}}
              style={[
                styles.image,
                imageStyle,
                animatedStyle,
                {
                  width,
                  height,
                },
              ]}
              resizeMode="contain"
            />
          </Animated.View>
        </PinchGestureHandler>

        <TouchableOpacity
          style={tw.style(
            `w-[60px] h-[60px] rounded-full ${bgUseful500} items-center justify-center absolute right-[24px] bottom-[24px]`,
          )}
          onPress={rotateImage90}>
          <Icon name={'rotate-phone-icon'} disabled />
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
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
