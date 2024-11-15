import React, {useState} from 'react';
import {View, TouchableOpacity, Dimensions, Image} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import {animated} from 'react-spring';
import {Icon} from '@lfvn-customer/shared/components/common/Icon';

const {width, height} = Dimensions.get('window');

const ZoomRotateImageScreen = ({uri}: {uri: string}) => {
  const {theme} = useGetTheme();
  const {bgUseful500, bgNegative100} = theme;

  const [rotation, setRotation] = useState(0);

  const onPressRotateImage = () => {
    setRotation(prevRotation => (prevRotation + 90) % 360);
  };

  const animatedStyles = {
    transform: `rotate(${rotation}deg)`,
  };

  return (
    <View style={tw.style(`flex-1 p-5 ${bgNegative100}`)}>
      <View style={tw.style('overflow-hidden')}>
        <animated.div
          style={{
            ...animatedStyles,
          }}>
          <Image
            source={{uri}}
            style={{
              width: width - 24,
              height: height * 0.8,
            }}
            resizeMode="center"
          />
        </animated.div>
      </View>
      <TouchableOpacity
        style={tw.style(
          `w-[60px] h-[60px] rounded-full ${bgUseful500} items-center justify-center bottom-10 absolute right-[24px]`,
        )}
        onPress={onPressRotateImage}>
        <Icon name={'rotate-phone-icon'} disabled />
      </TouchableOpacity>
    </View>
  );
};

export default ZoomRotateImageScreen;
