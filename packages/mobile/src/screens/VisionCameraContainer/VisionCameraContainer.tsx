import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { VisionCamera } from '@lfvn-customer/shared/screens';

export const VisionCameraContainer = () => {
    return (
        <View style={tw.style('flex-1 bg-black')}>
            <SafeAreaView style={tw.style('flex-1')} edges={['top']}>
                <VisionCamera />
            </SafeAreaView>
        </View>
    );
};

export default VisionCameraContainer;
