import React from 'react';
import {Pressable} from 'react-native';
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
import MoneyBagIcon from '@lfvn-customer/shared/assets/images/svg/MoneyBagIcon';
import QuickApproveIcon from '@lfvn-customer/shared/assets/images/svg/QuickApproveIcon';
import TimeMoneyIcon from '@lfvn-customer/shared/assets/images/svg/TimeMoneyIcon';
import DocLoanIcon from '@lfvn-customer/shared/assets/images/svg/DocLoanIcon';
import CommentQuestionIcon from '@lfvn-customer/shared/assets/images/svg/CommentQuestionIcon';
import PhoneOCRIcon from '@lfvn-customer/shared/assets/images/svg/PhoneOCRIcon';
import HintIcon from '@lfvn-customer/shared/assets/images/svg/HintIcon';
import ChevronRight from '@lfvn-customer/shared/assets/images/svg/ChevronRight';
import AddressCardIcon from '@lfvn-customer/shared/assets/images/svg/AddressCardIcon';
import UndoIcon from '@lfvn-customer/shared/assets/images/svg/UndoIcon';
import ProfileIcon from '@lfvn-customer/shared/assets/images/svg/ProfileIcon';
import ResidenceIcon from '@lfvn-customer/shared/assets/images/svg/ResidenceIcon';
import OccupationIcon from '@lfvn-customer/shared/assets/images/svg/OccupationIcon';
import ReferralContactIcon from '@lfvn-customer/shared/assets/images/svg/ReferralContactIcon';
import BeneficiaryIcon from '@lfvn-customer/shared/assets/images/svg/BeneficiaryIcon';
import UploadCircleIcon from '@lfvn-customer/shared/assets/images/svg/UploadCircleIcon';
import FolderIcon from '@lfvn-customer/shared/assets/images/svg/FolderIcon';
import UploadIcon from '@lfvn-customer/shared/assets/images/svg/UploadIcon';
import CameraIcon from '@lfvn-customer/shared/assets/images/svg/CameraIcon';
import PhotoIcon from '@lfvn-customer/shared/assets/images/svg/PhotoIcon';
import TrashIcon from '@lfvn-customer/shared/assets/images/svg/TrashIcon';
import CloseIcon from '@lfvn-customer/shared/assets/images/svg/CloseIcon';
import RotatePhoneIcon from '@lfvn-customer/shared/assets/images/svg/RotatePhoneIcon';
import FileIcon from '@lfvn-customer/shared/assets/images/svg/FileIcon';
import ExtendIcon from '@lfvn-customer/shared/assets/images/svg/ExtendIcon';
import ChangeCameraIcon from '@lfvn-customer/shared/assets/images/svg/ChangeCameraIcon';
import FlashIcon from '@lfvn-customer/shared/assets/images/svg/FlashIcon';
import CameraIphoneIcon from '@lfvn-customer/shared/assets/images/svg/CameraIphoneIcon';

const iconList = (props: IconProps) => ({
  search: <SearchIcon {...props} />,
  'close-circle': <CloseCircleIcon {...props} />,
  'add-icon': <AddIcon {...props} />,
  'add-file-icon': <AddFileIcon {...props} />,
  'transfer-money-icon': <TransferMoneyIcon {...props} />,
  'arrow-left': <ArrowLeft {...props} />,
  'chevron-right': <ChevronRight {...props} />,
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
  'money-bag-icon': <MoneyBagIcon {...props} />,
  'quick-approve-icon': <QuickApproveIcon {...props} />,
  'time-money-icon': <TimeMoneyIcon {...props} />,
  'doc-loan-icon': <DocLoanIcon {...props} />,
  'comment-question-icon': <CommentQuestionIcon {...props} />,
  'phone-ocr-icon': <PhoneOCRIcon {...props} />,
  'hint-icon': <HintIcon {...props} />,
  'address-card-icon': <AddressCardIcon {...props} />,
  'undo-icon': <UndoIcon {...props} />,
  'profile-icon': <ProfileIcon {...props} />,
  'residence-icon': <ResidenceIcon {...props} />,
  'occupation-icon': <OccupationIcon {...props} />,
  'referral-contact-icon': <ReferralContactIcon {...props} />,
  'beneficiary-icon': <BeneficiaryIcon {...props} />,
  'upload-circle-icon': <UploadCircleIcon {...props} />,
  'upload-icon': <UploadIcon {...props} />,
  'camera-icon': <CameraIcon {...props} />,
  'photo-icon': <PhotoIcon {...props} />,
  'folder-icon': <FolderIcon {...props} />,
  'trash-icon': <TrashIcon {...props} />,
  'close-icon': <CloseIcon {...props} />,
  'rotate-phone-icon': <RotatePhoneIcon {...props} />,
  'file-icon': <FileIcon {...props} />,
  'extend-icon': <ExtendIcon {...props} />,
  'change-camera-icon': <ChangeCameraIcon {...props} />,
  'flash-icon': <FlashIcon {...props} />,
  'camera-iphone-icon': <CameraIphoneIcon {...props} />,
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
