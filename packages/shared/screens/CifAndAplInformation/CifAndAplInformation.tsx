import React, {useEffect, useMemo} from 'react';
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
  formatNationalityInfo,
} from '@lfvn-customer/shared/utils/commonFunction';
import useTranslations from '../../hooks/useTranslations';
import useCifAndAplInformation from '../../hooks/useCifAndAplInformation';

const CifAndAplInformation = ({flowId}: {flowId: string}) => {
  const {appNavigate} = useConfigRouting();
  const t = useTranslations();

  const {cifData, aplData, onHandleGetAplData, onHandleGetCifData} =
    useCifAndAplInformation({
      flowId,
    });

  const displayData = useMemo(() => {
    return {
      fullname: aplData?.customer?.name,
      dob: formatDate(aplData?.customer?.demographic.dob || ''),
      gender: formatGenderInfo(aplData?.customer?.gender, 'display'),
      idNumber: aplData?.customer?.nric,
      doi: formatDate(aplData?.customer?.nricDate || ''),
      nationality: formatNationalityInfo(
        aplData?.customer?.demographic.nationality || '',
      ),
      oldIdNumber: aplData?.customer?.oldNric,
      origin: aplData?.customer?.demographic.placeOfOrigin,
      marriedStatus: aplData?.customer?.demographic.maritalStatus,
    };
  }, [aplData]);

  useEffect(() => {
    onHandleGetCifData();
    onHandleGetAplData();
  }, []);

  useEffect(() => {
    console.log('cifData', cifData);
    console.log('aplData', aplData);
  }, [cifData, aplData]);

  const listTab: {name: string; icon: IconKeys; data: {} | undefined}[] = [
    {name: 'Personal Information', icon: 'profile-icon', data: displayData},
    {name: 'Occupation', icon: 'occupation-icon', data: displayData},
    {name: 'Residence', icon: 'residence-icon', data: displayData},
    {
      name: 'Referral contact',
      icon: 'referral-contact-icon',
      data: displayData,
    },
    {name: 'Beneficiary', icon: 'beneficiary-icon', data: displayData},
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

        <View style={tw.style('flex-1')}>
          <CustomButton
            onPress={() =>
              appNavigate(ScreenParamEnum.InputAdditionalInformation)
            }
            color="red">
            {t('CifAndAplInformation.addMoreInfo')}
          </CustomButton>
        </View>
      </View>
    </View>
  );
};

export default CifAndAplInformation;
