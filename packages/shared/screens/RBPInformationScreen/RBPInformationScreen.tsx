import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {Appbar, FormButton} from '@lfvn-customer/shared/components';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import StepTabView from '@lfvn-customer/shared/components/Steps/StepTabView';
import useLoanInformation from '@lfvn-customer/shared/hooks/useLoanInformation';
import {useForm} from 'react-hook-form';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';
import {generateQuestionValidateStatusList} from '@lfvn-customer/shared/utils/commonFunction';
import MarriedStatus from '@lfvn-customer/shared/components/Questions/MarriedStatus';
import ResidentAddress from '@lfvn-customer/shared/components/Questions/ResidentAddress';
import {MetaDataRequestProps} from '@lfvn-customer/shared/types/services/loanTypes';
import {EventEmitterEnum} from '@lfvn-customer/shared/utils/eventEmitter';
import useHandleCreateAPL from '@lfvn-customer/shared/hooks/useHandleCreateAPL';

const questionComponents = [MarriedStatus, ResidentAddress, MarriedStatus];

const questionFormValidate = generateQuestionValidateStatusList(
  questionComponents.length,
);

const RBPInformationScreen = () => {
  const t = useTranslations();
  const forms = useForm();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const {onPressGoBack} = useLoanInformation();

  const {requestPendingMetadata} = useAppSelector(state => state.product);
  const {aplAddressCode} = useAppSelector(state => state.loanApl);

  const {onHandleSubmitRbpInfo} = useHandleCreateAPL();

  // const {cifData, aplData, onHandleGetAplData, onHandleGetCifData} =
  //   useCifAndAplInformation({
  //     flowId: requestPendingMetadata?.flowId || '',
  //   });

  const onGoBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onPressGoBack();
    }
  };

  const goToNext = async () => {
    const {
      loanMarriedStatus,
      loanResidentAddressType,
      loanResidentAddress,
      loanOccupation,
    } = forms.getValues();

    console.log(
      'getValue',
      loanResidentAddressType,
      loanResidentAddress,
      loanOccupation,
    );

    if (currentQuestion + 1 < questionComponents.length) {
      setCurrentQuestion(currentQuestion + 1); // next question
    }

    const metadata: MetaDataRequestProps =
      loanResidentAddressType === 'no' && aplAddressCode
        ? {
            ...requestPendingMetadata,
            loanMarriedStatus: loanMarriedStatus,
            loanResidentAddress: loanResidentAddress,
            loanOccupation: loanOccupation,
            customerProvince: aplAddressCode.city,
            customerDistrict: aplAddressCode.district,
            customerWard: aplAddressCode.ward,
            customerAddress: aplAddressCode.detailAddress,
          }
        : {
            ...requestPendingMetadata,
            loanMarriedStatus: loanMarriedStatus,
            loanResidentAddress: loanResidentAddress,
            loanOccupation: loanOccupation,
          };

    console.log('metadata', metadata);

    if (currentQuestion + 1 === questionComponents.length) {
      await onHandleSubmitRbpInfo(metadata); // last question -> complete
    }
  };
  return (
    <>
      <Appbar
        labelContent={t('Step.title', {
          currentStep: currentQuestion + 1,
          totalStep: questionComponents.length,
        })}
        handleGoBack={onGoBack}
      />
      <View style={tw.style('flex-1 bg-white')}>
        <StepTabView
          questionComponents={questionComponents}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          {...forms}
        />
        <FormButton
          watchForm={EventEmitterEnum.RBPInformationQuestion}
          questionFormValidate={questionFormValidate}
          currentQuestion={currentQuestion}
          goToNext={goToNext}
        />
      </View>
    </>
  );
};

export default RBPInformationScreen;
