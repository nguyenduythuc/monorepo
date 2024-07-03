/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {Provider, useDispatch, useSelector} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from '@lfvn-customer/shared/redux/store';
import {
  TextInput,
  TextInputSearch,
  PrimaryButton,
  CustomButton,
  RoundButton,
} from '@lfvn-customer/shared/components';
import {increment} from '@lfvn-customer/shared/redux/slices/counterSlice';
import {selectCounterValue} from '@lfvn-customer/shared/redux/selectors/counterSelector';
import {useTranslations} from 'use-intl';
import LocaleProvider, {useLocale} from './providers/I18nContext';
import {ThemeProvider, useTheme} from '@lfvn-customer/shared/themes';
import tw from 'twrnc';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import {
  useGetExampleQuery,
  useSetExampleMutation,
} from '@lfvn-customer/shared/redux/slices/apiSlices';
import SecuritiesChecking from './providers/SecuritiesChecking';
import {RootNavigator} from './navigators/RootNavigator';

const App = () => {
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize('db151860-ad3a-48c3-a9e6-9dc40055e624');

  // requestPermission will show the native iOS or Android notification permission prompt.
  // We recommend removing the following code and instead using an In-App Message to prompt for notification permission
  OneSignal.Notifications.requestPermission(true);

  // Method for listening for notification clicks
  OneSignal.InAppMessages.addTrigger('triggerKey', 'triggerValue');

  OneSignal.Notifications.addEventListener('click', event => {
    console.log('OneSignal: notification clicked:', event);
  });

  return (
    <SecuritiesChecking>
      <LocaleProvider>
        <ThemeProvider>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <RootNavigator />
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </LocaleProvider>
    </SecuritiesChecking>
  );
};

const MainComponent = () => {
  // Theme example
  const {colorScheme, toggleTheme} = useTheme();

  // Redux example
  const dispatch = useDispatch();
  const data = useSelector(selectCounterValue);

  // i18n example
  const t = useTranslations();
  const {setLocale} = useLocale();

  // API example
  const {data: apiData, error, isLoading} = useGetExampleQuery();
  const [setExample, {isLoading: isSaving, error: postError}] =
    useSetExampleMutation();
  console.log('redux data: ', data);
  console.log('get API data', apiData, 'error: ', error, 'loading:', isLoading);
  console.log('set API data error: ', postError, 'saving:', isSaving);

  useEffect(() => {
    dispatch(increment());

    setTimeout(() => {
      setLocale('vi');
    }, 3000);

    (async () => {
      const result = await setExample({status: 'success'});
      console.log('result', result);
    })();
  }, [dispatch, setExample, setLocale]);

  const [text, setText] = React.useState('');

  const onPressClearText = () => {
    setText('');
  };

  return (
    <View style={tw`relative w-full h-full justify-center`}>
      <ScrollView>
        <View style={tw`px-4 bottom-20`}>
          <Text style={tw`text-xl text-blue-900`}>{`${t(
            'welcome',
          )}, Theme: ${colorScheme}`}</Text>
          <Text style={tw`text-xl text-blue-900`}>Current themes: 111</Text>
          <TouchableOpacity
            style={tw`bg-orange-500 h-40`}
            onPress={toggleTheme}>
            <Text style={tw`text-xl text-red-900`}>Toggle Theme</Text>
          </TouchableOpacity>
          <TextInput
            label="Label Name"
            placeholder="Type Something"
            containerStyle="mt-4"
            required
            value={text}
            onChangeText={setText}
            // error="Error Text is displayed here, up to 2 lines"
            onPressRightComponent={onPressClearText}
            // disabled
            focus
          />
          <TextInputSearch
            label="Label Name"
            placeholder="Type Something"
            containerStyle="mt-4"
            required
            value={text}
            onChangeText={setText}
            // error="Error Text is displayed here, up to 2 lines"
            onPressRightComponent={onPressClearText}
            // disabled
            focus
          />

          <View style={tw`my-2`}>
            <CustomButton color="red" variant="text">
              Continue
            </CustomButton>
            <CustomButton color="red" prefixIcon="add-icon" iconColor="white">
              Continue
            </CustomButton>
          </View>

          <View style={tw`my-2`}>
            <CustomButton
              variant="link"
              onPress={() => console.log('Continue')}>
              Continue
            </CustomButton>
            <CustomButton
              variant="outlined"
              prefixIcon="add-icon"
              iconColor="blue">
              Continue
            </CustomButton>
          </View>

          <View style={tw`my-2`}>
            <RoundButton prefixIcon="add-file-icon" />
          </View>
        </View>
      </ScrollView>
      <PrimaryButton title="Continue" onPress={() => console.log('Continue')} />
    </View>
  );
};

export default App;
