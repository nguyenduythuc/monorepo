import React from 'react';
import {Pressable, View} from 'react-native';
import SearchIcon from '@lfvn-customer/shared/assets/images/svg/SearchIcon';
import CloseCircleIcon from '@lfvn-customer/shared/assets/images/svg/CloseCircleIcon';
import AddIcon from '@lfvn-customer/shared/assets/images/svg/AddIcon';
import AddFileIcon from '@lfvn-customer/shared/assets/images/svg/AddFileIcon';
import {IconProps} from '@lfvn-customer/shared/types';
import TransferMoneyIcon from '@lfvn-customer/shared/assets/images/svg/TransferMoneyIcon';
import ArrowLeft from '@lfvn-customer/shared/assets/images/svg/ArrowLeft';
import ArrowRight from '@lfvn-customer/shared/assets/images/svg/ArrowRight';
import SmartPhoneIcon from '@lfvn-customer/shared/assets/images/svg/SmartPhoneIcon';
import IdCardIcon from '@lfvn-customer/shared/assets/images/svg/IdCardIcon';
import CheckCircleIcon from '@lfvn-customer/shared/assets/images/svg/CheckCircleIcon';
import WarningCircleIcon from '@lfvn-customer/shared/assets/images/svg/WarningCircleIcon';
import EyeOpenIcon from '@lfvn-customer/shared/assets/images/svg/EyeOpenIcon';
import EyeCloseIcon from '@lfvn-customer/shared/assets/images/svg/EyeCloseIcon';
import ArrowDown from '@lfvn-customer/shared/assets/images/svg/ArrowDown';
import CheckboxIcon from '@lfvn-customer/shared/assets/images/svg/CheckBoxIcon';
import CheckCircle from '@lfvn-customer/shared/assets/images/svg/CheckCircle';
import InfoIcon from '@lfvn-customer/shared/assets/images/svg/InfoIcon';
import CalendarIcon from '@lfvn-customer/shared/assets/images/svg/CalendarIcon';
import InterestMoneyIcon from '@lfvn-customer/shared/assets/images/svg/InterestMoneyIcon';
import TimeCoinIcon from '@lfvn-customer/shared/assets/images/svg/TimeCoinIcon';
import CalendarDollarIcon from '@lfvn-customer/shared/assets/images/svg/CalendarDollarIcon';
import FastLoanIcon from '@lfvn-customer/shared/assets/images/svg/FastLoanIcon';
import SalaryBaseLoanIcon from '@lfvn-customer/shared/assets/images/svg/SalaryBaseLoanIcon';
import GovStaffLoanIcon from '@lfvn-customer/shared/assets/images/svg/GovStaffLoanIcon';
import LadyLoanIcon from '@lfvn-customer/shared/assets/images/svg/LadyLoanIcon';
import LifeInsuranceLoanIcon from '@lfvn-customer/shared/assets/images/svg/LifeInsuranceLoanIcon';
import TopUpLoanIcon from '@lfvn-customer/shared/assets/images/svg/TopUpLoanIcon';
import CashIcon from '@lfvn-customer/shared/assets/images/svg/CashIcon';
import CarLoanMenuIcon from '@lfvn-customer/shared/assets/images/svg/CarLoanMenuIcon';
import FastLoanMenuIcon from '@lfvn-customer/shared/assets/images/svg/FastLoanMenuIcon';
import CreditCardIcon from '@lfvn-customer/shared/assets/images/svg/CreditCardIcon';
import FaceIdIcon from '@lfvn-customer/shared/assets/images/svg/FaceIdIcon';

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
  'checkbox-icon': <CheckboxIcon {...props} />,
  'info-icon': <InfoIcon {...props} />,
  'arrow-down': <ArrowDown {...props} />,
  'calendar-icon': <CalendarIcon {...props} />,
  'interest-money-icon': <InterestMoneyIcon {...props} />,
  'time-coin-icon': <TimeCoinIcon {...props} />,
  'calendar-dollar-icon': <CalendarDollarIcon {...props} />,
  'fast-loan-icon': <FastLoanIcon {...props} />,
  'salary-base-loan-icon': <SalaryBaseLoanIcon {...props} />,
  'gov-staff-loan-icon': <GovStaffLoanIcon {...props} />,
  'lady-loan-icon': <LadyLoanIcon {...props} />,
  'life-insurance-loan-icon': <LifeInsuranceLoanIcon {...props} />,
  'top-up-loan-icon': <TopUpLoanIcon {...props} />,
  'cash-loan-icon': <CashIcon {...props} />,
  'credit-card-icon': <CreditCardIcon {...props} />,
  'fast-loan-menu-icon': <FastLoanMenuIcon {...props} />,
  'car-loan-icon': <CarLoanMenuIcon {...props} />,
  'faceid-icon': <FaceIdIcon {...props} />,
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
