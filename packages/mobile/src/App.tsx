/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '@lfvn-customer/shared/redux/store';
import {increment} from '@lfvn-customer/shared/redux/slices/counterSlice';
import {selectCounterValue} from '@lfvn-customer/shared/redux/selectors/counterSelector';
import {useTranslations} from 'use-intl';
import LocaleProvider, {useLocale} from './providers/I18nContext';
import {TextInputBase} from '@lfvn-customer/shared/components';
import {ThemeProvider, useTheme} from '@lfvn-customer/shared/themes';
import tw from 'twrnc';

const App = () => {
  return (
    <LocaleProvider>
      <ThemeProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <SafeAreaView>
              <MainComponent />
            </SafeAreaView>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </LocaleProvider>
  );
};

const MainComponent = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectCounterValue);
  const {colorScheme, toggleTheme} = useTheme();

  const t = useTranslations();
  const {setLocale} = useLocale();

  console.log('redux data: ', data);
  useEffect(() => {
    dispatch(increment());
    setTimeout(() => {
      setLocale('vi');
    }, 3000);
  }, [dispatch, setLocale]);

  return (
    <View style={tw`w-full h-full justify-center px-4`}>
      <Text style={tw`text-xl text-blue-900`}>{`${t(
        'welcome',
      )}, Theme: ${colorScheme}`}</Text>
      <Text style={tw`text-xl text-blue-900`}>Current themes: 111</Text>
      <TouchableOpacity style={tw`bg-orange-500 h-40`} onPress={toggleTheme}>
        <Text style={tw`text-xl text-red-900`}>Toggle Theme</Text>
      </TouchableOpacity>
      <TextInputBase />
    </View>
  );
};

export default App;
