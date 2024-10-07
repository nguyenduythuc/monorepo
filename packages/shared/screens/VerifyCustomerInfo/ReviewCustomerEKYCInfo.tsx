import React, { useEffect } from 'react';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { useDispatch } from 'react-redux';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import { View, Text, ScrollView, Platform } from 'react-native';
import {
  Appbar,
  ConfirmModal,
  CustomButton,
  Icon,
} from '@lfvn-customer/shared/components';
import useVerifyCustomerEkycInfo from '@lfvn-customer/shared/hooks/useVerifyCustomerEkycInfo';
import {
  clearLoadingScreen,
  setLoadingScreen,
} from '@lfvn-customer/shared/redux/slices/loadingSlices';
import {
  ekycDataType,
  mapEkycKeyValue,
} from '@lfvn-customer/shared/types/services/verifyCustomerTypes';
import { formatGenderInfo } from '../../utils/commonFunction';
import { useAppSelector } from '../../redux/store';
import { InfoDataCard } from '../../components/common/InfoDataCard';

export const ReviewCustomerEKYCInfo = () => {
  const t = useTranslations();

  const ekycData: ekycDataType = useAppSelector(state => state.verifyAccount.ekycData)
  // const submitAction = () => {
  //   // appNavigate(ScreenParamEnum.CreateLoanApl);
  // };
  const dispatch = useDispatch();

  const displayEkycData: ekycDataType = {
    fullname: ekycData?.fullname,
    idNumber: ekycData?.idNumber,
    doi: ekycData?.doi,
    dob: ekycData?.dob,
    gender: formatGenderInfo(ekycData?.gender || '', 'display'),
    nationality: ekycData?.nationality || ekycData?.ethnicity,
    origin: ekycData?.origin,
    oldIdNumber: ekycData?.oldIdNumber,
  };

  const {
    isModalVisible,
    setIsModalVisible,
    msgRequestError,
    onCustomerCancel,
    handleSubmit,
    onCustomerConfirm,
    isModalInvalidInfo,
    setIsModalInvalidInfo,
    msgRequestInvalidInfoError,
    onInvalidInfoConfirm,
    isLoading,
  } = useVerifyCustomerEkycInfo({ ekycData: ekycData });

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoadingScreen());
    } else {
      dispatch(clearLoadingScreen());
    }
  }, [isLoading]);
  return (
    <>
      <Appbar
        rightComponent
        actionTitle="Save"
        actionTitleStyle={tw.style('text-blue-500 text-lg')}
      />
      <ScrollView style={tw.style('flex-1')}>
        <View style={tw.style('px-4 my-4')}>
          <Text style={tw.style('text-3xl font-bold')}>
            {t('VerifyCustomer.reviewCustomerEkycInfo')}
          </Text>
          <Text style={tw.style('text-base my-3')}>
            {t('VerifyCustomer.reviewCustomerEkycInfoDes')}
          </Text>
          <View
            style={tw.style('flex-row bg-[#F4F8FF] rounded-lg px-4 py-3 mb-5')}>
            <Icon name="hint-icon"></Icon>
            <Text style={tw.style('text-base flex-1 ml-2')}>
              {t('VerifyCustomer.hintDes')}
            </Text>
          </View>
          <InfoDataCard cardRawData={displayEkycData} />
        </View>
      </ScrollView>
      <View style={tw`bg-white px-4 pt-3 pb-4 border-gray-200`}>
        <CustomButton onPress={handleSubmit} color="red">
          {t('VerifyCustomer.confirm')}
        </CustomButton>
      </View>
      <ConfirmModal
        disabled
        title={t('VerifyCustomer.confirmCorrectID')}
        visible={isModalVisible}
        setVisible={setIsModalVisible}
        // content={msgRequestError}
        renderContent={
          <View style={tw.style('items-center justify-center')}>
            <Text style={tw.style('text-lg text-center')}>
              {t('VerifyCustomer.verifyChangeIdNumber')}
            </Text>
            <Text style={tw.style('text-2xl text-red-500 font-bold')}>
              {displayEkycData.idNumber}
            </Text>
          </View>
        }
        onButtonLeftPress={onCustomerCancel}
        onButtonRightPress={onCustomerConfirm}
        labelButtonRight={t('VerifyCustomer.confirm')}
      />
      <ConfirmModal
        disabled
        visible={isModalInvalidInfo}
        setVisible={setIsModalInvalidInfo}
        content={msgRequestInvalidInfoError}
        singleButton
        onButtonRightPress={onInvalidInfoConfirm}
        labelButtonRight={t('VerifyCustomer.confirm')}
      />
    </>
  );
};
