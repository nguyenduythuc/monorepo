import React, {useState, useEffect} from 'react';
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
import useHandleRequestPending from '@lfvn-customer/shared/hooks/useHandleRequestPending';
import {RequestPendingStepEnum} from '@lfvn-customer/shared/types';
import {useGetOccupationListDataMutation} from '@lfvn-customer/shared/redux/slices/apiSlices';
import useShowToast from '../../hooks/useShowToast';
import {useDispatch} from 'react-redux';
import {
  setLoanOfferResult,
  setOccupations,
} from '../../redux/slices/productSlices';
import {ScreenParamEnum} from '../../types/paramtypes';
import {useConfigRouting} from '../../hooks';

const questionComponents = [MarriedStatus, ResidentAddress, MarriedStatus];

const questionFormValidate = generateQuestionValidateStatusList(
  questionComponents.length,
);

const RBPInformationScreen = () => {
  const t = useTranslations();
  const forms = useForm();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const {onPressGoBack} = useLoanInformation();

  const {requestPendingMetadata, loanOfferResult} = useAppSelector(
    state => state.product,
  );
  const {aplAddressCode} = useAppSelector(state => state.loanApl);

  const dispatch = useDispatch();
  const {showCommonErrorToast} = useShowToast();
  const {appNavigate} = useConfigRouting();

  const {onHandleSaveDaftAPL} = useHandleRequestPending();
  const {onHandleSubmitRbpInfo} = useHandleCreateAPL();
  const [listOccupation] = useGetOccupationListDataMutation();

  useEffect(() => {
    (async () => {
      try {
        const result = await listOccupation({
          queryInput: {},
          limit: 100,
          skip: 0,
          sort: [],
        });
        if (result?.data?.data) {
          dispatch(setOccupations(result.data.data));
        } else {
          showCommonErrorToast();
        }
      } catch {
        showCommonErrorToast();
      }
    })();
  }, []);

  useEffect(() => {
    if (loanOfferResult) {
      // (async () => {
      // const metadata: MetaDataRequestProps = {
      //   ...requestPendingMetadata,
      //   loanOfferResult,
      // };
      // const bodyRequestPending = {
      //   userId: requestPendingMetadata?.userId ?? '',
      //   currentStep: RequestPendingStepEnum.VERIFY_INFORMATION,
      //   productCode: requestPendingMetadata?.schemeCode ?? '',
      //   metadata,
      // };
      // await onHandleSaveDaftAPL(bodyRequestPending);
      // })();
      dispatch(setLoanOfferResult(undefined)); // remove data when save to draft apl
      setTimeout(() => {
        console.log('loanOfferResult222222222');
        appNavigate(ScreenParamEnum.ReviewLoanOffer);
      }, 600);
    }
  }, [loanOfferResult]);

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

    const bodyRequestPending = {
      userId: requestPendingMetadata?.userId ?? '',
      currentStep: RequestPendingStepEnum.LOAN_INFORMATION,
      productCode: requestPendingMetadata?.schemeCode ?? '',
      metadata,
    };
    await onHandleSaveDaftAPL(bodyRequestPending);

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
