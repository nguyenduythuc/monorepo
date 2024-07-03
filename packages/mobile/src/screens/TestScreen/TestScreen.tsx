import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import tw from 'twrnc';
import useTestScreen from '@lfvn-customer/shared/hooks/useTest';

const TestScreen = () => {
  const {renderFrom, handleSubmit, getValues} = useTestScreen();

  const onPressSubmit = handleSubmit(() => {
    console.log('submit', getValues());
  });

  return (
    <View style={tw.style('flex-1')}>
      <SafeAreaView style={tw.style('flex-1 p-4')}>
        <Text style={tw.style('text-red-500')}>Test screen</Text>
        {renderFrom()}
        <TouchableOpacity
          onPress={onPressSubmit}
          style={tw.style('p-4 items-center bg-red-500')}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

export default TestScreen;
