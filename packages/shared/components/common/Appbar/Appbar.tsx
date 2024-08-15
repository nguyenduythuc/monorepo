import React, {useMemo} from 'react';

import {View, TextStyle} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {AppbarBackAction} from './AppbarBackAction';
import {AppbarContent} from './AppbarContent';
import {AppbarAction} from './AppbarAction';
import {useConfigRouting} from '@lfvn-customer/shared/hooks';

export type AppbarProp = {
  backAction?: boolean;
  backIconColor?: string;
  labelContent?: string;
  rightComponent?: boolean;
  contentTextStyle?: TextStyle;
};

export const Appbar = ({
  backAction,
  backIconColor,
  labelContent,
  rightComponent,
  contentTextStyle,
}: AppbarProp) => {
  const {appNavigate} = useConfigRouting();

  return (
    <View
      style={tw`relative flex-row w-full h-11 items-center px-4 py-2 bg-transparent`}>
      {backAction && (
        <AppbarBackAction
          backIconColor={backIconColor}
          onPress={() => appNavigate('goBack')}
        />
      )}
      <AppbarContent title={labelContent} titleStyle={contentTextStyle} />
      {rightComponent && (
        <AppbarAction
          title="Save"
          titleStyle={tw`text-blue-500 font-semibold`}
        />
      )}
    </View>
  );
};
