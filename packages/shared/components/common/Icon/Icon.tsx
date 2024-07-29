import React from 'react';
import {Pressable, View} from 'react-native';
import SearchIcon from '../../../assets/images/svg/SearchIcon';
import CloseCircleIcon from '../../../assets/images/svg/CloseCircleIcon';
import AddIcon from '../../../assets/images/svg/AddIcon';
import AddFileIcon from '../../../assets/images/svg/AddFileIcon';
import {IconProps} from '../../../types';
import TransferMoneyIcon from '../../../assets/images/svg/TransferMoneyIcon';
import ArrowLeft from '../../../assets/images/svg/ArrowLeft';
import ArrowRight from '../../../assets/images/svg/ArrowRight';
import SmartPhoneIcon from '../../../assets/images/svg/SmartPhoneIcon';
import IdCardIcon from '../../../assets/images/svg/IdCardIcon';
import CheckCircleIcon from '../../../assets/images/svg/CheckCircleIcon';
import WarningCircleIcon from '../../../assets/images/svg/WarningCircleIcon';
import EyeOpenIcon from '../../../assets/images/svg/EyeOpenIcon';
import EyeCloseIcon from '../../../assets/images/svg/EyeCloseIcon';

const iconList = (props: IconProps) => ({
  search: <SearchIcon {...props} />,
  'close-circle': <CloseCircleIcon {...props} />,
  'add-icon': <AddIcon {...props} />,
  'add-file-icon': <AddFileIcon {...props} />,
  'transfer-money-icon': <TransferMoneyIcon {...props} />,
  'arrow-left': <ArrowLeft {...props} />,
  'arrow-right': <ArrowRight {...props} />,
  'smart-phone': <SmartPhoneIcon {...props} />,
  'id-card': <IdCardIcon {...props} />,
  'check-circle': <CheckCircleIcon {...props} />,
  'warning-circle': <WarningCircleIcon {...props} />,
  'eye-open': <EyeOpenIcon {...props} />,
  'eye-close': <EyeCloseIcon {...props} />,
});

type IconList = ReturnType<typeof iconList>;
export type IconKeys = keyof IconList;

export const Icon: React.FC<IconProps> = ({
  name,
  disabled,
  onPress,
  ...props
}) => {
  const renderIcon = (key: IconKeys): React.ReactNode => {
    return iconList({
      name,
      disabled,
      onPress,
      ...props,
    })[key];
  };

  return (
    <Pressable disabled={disabled} onPress={onPress}>
      {renderIcon(name)}
    </Pressable>
  );
};
