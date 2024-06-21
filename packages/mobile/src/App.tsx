/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {ThemeProvider, useTheme} from '@lfvn-customer/shared/themes';
import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '@lfvn-customer/shared/redux/store';
import {increment} from '@lfvn-customer/shared/redux/slices/counterSlice';
import {selectCounterValue} from '@lfvn-customer/shared/redux/selectors/counterSelector';
import {useTranslations} from 'use-intl';
import LocaleProvider, {useLocale} from './providers/I18nContext';

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
  const {colorScheme, toggleTheme} = useTheme();
  const dispatch = useDispatch();
  const data = useSelector(selectCounterValue);

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
    <View className="w-full h-full justify-center items-center">
      <Text className="text-xl text-red-900">
        Current themes: {colorScheme}
      </Text>
      <Text className="text-xl text-blue-700">{t('welcome')}</Text>
      <TouchableOpacity onPress={toggleTheme}>
        <Text className="text-xl text-green-600">Toggle Theme</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
