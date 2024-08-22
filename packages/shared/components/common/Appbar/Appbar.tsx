import React from 'react';
import {View, TextStyle} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {AppbarBackAction} from './AppbarBackAction';
import {AppbarContent} from './AppbarContent';
import {AppbarAction} from './AppbarAction';
import {useConfigRouting} from '@lfvn-customer/shared/hooks';
import {IconKeys} from '../Icon';

export type AppbarProp = {
  backAction?: boolean;
  backIconColor?: string;
  labelContent?: string;
  rightComponent?: boolean;
  contentTextStyle?: TextStyle;
  iconAction?: IconKeys;
  iconActionColor?: string;
  actionTitle?: string;
  actionTitleStyle?: TextStyle;
};

export const Appbar = ({
  backAction = true,
  backIconColor,
  labelContent = '',
  rightComponent,
  contentTextStyle,
  iconAction,
  iconActionColor,
  actionTitle,
  actionTitleStyle,
}: AppbarProp) => {
  const {goBack} = useConfigRouting();

  return (
    <View
      style={tw`relative flex-row w-full h-11 items-center px-4 py-2 bg-transparent`}>
      {backAction && (
        <AppbarBackAction
          backIconColor={backIconColor}
          onPress={() => goBack()}
        />
      )}
      <AppbarContent title={labelContent} titleStyle={contentTextStyle} />
      {rightComponent && (
        <AppbarAction
          icon={iconAction}
          iconColor={iconActionColor}
          title={actionTitle}
          titleStyle={actionTitleStyle}
        />
      )}
    </View>
  );
};
