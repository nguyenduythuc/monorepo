import React, {useEffect, useMemo, useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {
  Appbar,
  CustomButton,
  IconKeys,
  InformationTab,
} from '@lfvn-customer/shared/components';
import {useConfigRouting} from '@lfvn-customer/shared/hooks';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import {
  formatDate,
  formatGenderInfo,
  formatMaritalStatus,
  formatNationalityInfo,
} from '@lfvn-customer/shared/utils/commonFunction';
import {useDispatch} from 'react-redux';
import {
  clearLoadingScreen,
  setLoadingScreen,
} from '../../redux/slices/loadingSlices';
import useTranslations from '../../hooks/useTranslations';
import useCifAndAplInformation from '../../hooks/useCifAndAplInformation';

const CifAndAplInformation = ({flowId}: {flowId: string}) => {
  const {appNavigate} = useConfigRouting();
  const dispatch = useDispatch();
  const t = useTranslations();

  const {
    cifData,
    aplData,
    onHandleGetAplData,
    onHandleGetCifData,
    checkExistCustomer,
  } = useCifAndAplInformation({
    flowId,
  });

  const displayPersonalInfoData = useMemo(() => {
    const displayCustomerData = aplData
      ? {
          untitled: {
            fullname: aplData.customer?.name,
            dob: formatDate(aplData.customer?.demographic.dob || ''),
            gender: formatGenderInfo(aplData.customer?.gender, 'display'),
            idNumber: aplData.customer?.nric,
            doi: formatDate(aplData.customer?.nricDate || ''),
            nationality: formatNationalityInfo(
              aplData.customer?.demographic.nationality || '',
            ),
            oldIdNumber: aplData.customer?.oldNric,
            origin: aplData.customer?.demographic.placeOfOrigin,
            marriedStatus: formatMaritalStatus(
              aplData.customer?.demographic.maritalStatus || '',
            ),
          },
        }
      : aplData;
    return displayCustomerData;
  }, [aplData]);

  const displayResidenceData = useMemo(() => {
    const displayCustomerData = cifData
      ? {
          residenceAddress: {
            province: cifData?.Adr_home?.city,
            district: cifData?.Adr_home?.state,
            ward: cifData?.Adr_home?.addresline1,
            detailAdd: cifData?.Adr_home?.addresline2,
          },
          registerAddress: {
            province: cifData?.Adr_mailing?.city,
            district: cifData?.Adr_mailing?.state,
            ward: cifData?.Adr_mailing?.addresline1,
            detailAdd: cifData?.Adr_mailing?.addresline2,
          },
        }
      : cifData;
    return displayCustomerData;
  }, [cifData]);

  const displayOccupationData = useMemo(() => {
    const displayCustomerData = cifData
      ? {
          occupationInformation: {},
          workPlaceInformation: {},
          companyAddress: {
            province: cifData?.Adr_work?.city,
            district: cifData?.Adr_work?.state,
            ward: cifData?.Adr_work?.addresline1,
            detailAdd: cifData?.Adr_work?.addresline2,
          },
        }
      : cifData;
    return displayCustomerData;
  }, [cifData]);

  const displayReferralContactData = useMemo(() => {
    const displayCustomerData = cifData
      ? {
          untitled: {
            fullname: cifData?.Reference1.name1,
            phoneNumber: cifData?.Reference1.phone1,
            referralRelationship: cifData?.Reference1.relate1,
          },
        }
      : cifData;
    return displayCustomerData;
  }, [cifData]);

  useEffect(() => {
    onHandleGetCifData();
    onHandleGetAplData();
  }, []);

  const listTab: {name: string; icon: IconKeys; data: {} | undefined}[] = [
    {
      name: 'Personal Information',
      icon: 'profile-icon',
      data: displayPersonalInfoData,
    },
    {name: 'Occupation', icon: 'occupation-icon', data: displayOccupationData},
    {name: 'Residence', icon: 'residence-icon', data: displayResidenceData},
    {
      name: 'Referral contact',
      icon: 'referral-contact-icon',
      data: displayReferralContactData,
    },
    {
      name: 'Beneficiary',
      icon: 'beneficiary-icon',
      data: displayReferralContactData,
    },
  ];

  return (
    <View style={tw.style('flex-1')}>
      <Appbar labelContent={t('CifAndAplInformation.profileInformation')} />
      <View style={tw.style('flex-1 bg-white px-4 py-2')}>
        <ScrollView>
          <View style={tw.style('flex-1 flex-col  mt-2')}>
            <Text style={tw.style('font-bold text-2xl mb-1')}>
              {t('CifAndAplInformation.profileInformation')}
            </Text>
            <Text style={tw.style('text-base mb-3')}>
              {t('CifAndAplInformation.description')}
            </Text>
            <InformationTab tabData={listTab} />
          </View>
        </ScrollView>
      </View>
      <View
        style={tw`flex-row w-full gap-3 justify-between px-4 pt-3 border-t border-gray-200`}>
        {/* <View style={tw.style('flex-1')}>
          <CustomButton
            color="white"
            textCustomStyle="text-black"
            onPress={() => {}}>
            {t('CifAndAplInformation.addMoreInfo')}
          </CustomButton>
        </View> */}

        <View style={tw.style('w-full flex-1 flex-row justify-between gap-3')}>
          {checkExistCustomer && (
            <View style={tw.style('flex-1')}>
              <CustomButton
                onPress={() =>
                  appNavigate(ScreenParamEnum.InputAdditionalInformation, {
                    currentStep: 0,
                  })
                }
                buttonStyle={`bg-red-100 shadow-none`}
                textCustomStyle={`text-red-500`}>
                {t('CifAndAplInformation.edit')}
              </CustomButton>
            </View>
          )}
          <View style={tw.style('flex-1')}>
            <CustomButton
              disabled={!cifData}
              onPress={() =>
                appNavigate(ScreenParamEnum.InputAdditionalInformation, {
                  currentStep: 7,
                })
              }
              color="red">
              {t('CifAndAplInformation.submit')}
            </CustomButton>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CifAndAplInformation;
