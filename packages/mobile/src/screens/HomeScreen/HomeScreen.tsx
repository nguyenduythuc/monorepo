import React from 'react';
import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';

const HomeScreen = () => {
  return (
    <View style={tw.style('flex-1')}>
      <SafeAreaView style={tw.style('flex-1')}>
        <Text style={tw.style('text-red-500')}>Home screen</Text>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
