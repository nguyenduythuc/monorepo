import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {
  Appbar,
  ConfirmModal,
  CongratulationModal,
  FormButton,
} from '@lfvn-customer/shared/components';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import IncomePerMonth from '@lfvn-customer/shared/components/Questions/IncomePerMonth';
import LoanPurpose from '@lfvn-customer/shared/components/Questions/LoanPurpose';
import StepTabView from '@lfvn-customer/shared/components/Steps/StepTabView';
import useLoanInformation from '@lfvn-customer/shared/hooks/useLoanInformation';
import ProductInformation from '@lfvn-customer/shared/components/Questions/ProductInformation';
import {useForm} from 'react-hook-form';
import {RequestPendingStepEnum} from '@lfvn-customer/shared/types';
import useHandleRequestPending from '@lfvn-customer/shared/hooks/useHandleRequestPending';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';
import useHandleCreateAPL from '@lfvn-customer/shared/hooks/useHandleCreateAPL';
import {MetaDataRequestProps} from '@lfvn-customer/shared/types/services/loanTypes';
import {useDispatch} from 'react-redux';
import {setCifMetadata} from '@lfvn-customer/shared/redux/slices/productSlices';
import {generateQuestionValidateStatusList} from '@lfvn-customer/shared/utils/commonFunction';
import PreviousCompanyWorkingTime from '@lfvn-customer/shared/components/Questions/PreviousCompanyWorkingTime';
import InsuranceDuration from '@lfvn-customer/shared/components/Questions/InsuranceDuration';
import useShowToast from '@lfvn-customer/shared/hooks/useShowToast';
import {useConfigRouting} from '@lfvn-customer/shared/hooks';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import {EventEmitterEnum} from '@lfvn-customer/shared/utils/eventEmitter';

const questionComponents = [
  ProductInformation,
  IncomePerMonth,
  LoanPurpose,
  PreviousCompanyWorkingTime,
  InsuranceDuration,
];

const questionFormValidate = generateQuestionValidateStatusList(
  questionComponents.length,
);

const LoanInformationScreen = () => {
  const {cifMetadata, productSelected} = useAppSelector(state => state.product);
  const t = useTranslations();
  const dispatch = useDispatch();
  const {handleShowToast} = useShowToast();

  const {onPressGoBack} = useLoanInformation();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const {appNavigate} = useConfigRouting();

  const forms = useForm();

  const onGoBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onPressGoBack();
    }
  };

  const {onHandleSaveDaftAPL} = useHandleRequestPending();
  const {onHandleCreateAPL, onHandleSubmitSuggestTR} = useHandleCreateAPL();
  const {requestPendingMetadata} = useAppSelector(state => state.product);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalCongratulationVisible, setIsModalCongratulationVisible] =
    useState(false);
  const [contentModal, setContentModal] = useState('');

  useEffect(() => {
    if (requestPendingMetadata?.flowId) {
      appNavigate(ScreenParamEnum.RBPInformation);
    }
  }, [requestPendingMetadata]);

  const onSubmit = async (bodyCreateAPL: MetaDataRequestProps) => {
    await onHandleCreateAPL(bodyCreateAPL);
  };

  useEffect(() => {
    // get suggest loan success
    if (cifMetadata) {
      const {cifId, productCode, validTime} = cifMetadata;
      if (cifId && productCode) {
        if (validTime) {
          // TODO: Step 8: Pre-scoring
        } else {
          // TODO: Step 7: Input RBP's information
          setTimeout(() => {
            appNavigate(ScreenParamEnum.RBPInformation);
          }, 600);
        }
      } else if (cifId && !productCode) {
        if (validTime) {
          setIsModalCongratulationVisible(true);
        } else {
          // TODO: Step 7: Input RBP's information
          setTimeout(() => {
            appNavigate(ScreenParamEnum.RBPInformation);
          }, 600);
        }
      } else if (!cifId && !productCode) {
        // TODO: Step 7: Input RBP's information
        setTimeout(() => {
          appNavigate(ScreenParamEnum.RBPInformation);
        }, 600);
      } else {
        // !cifId && productCode
        handleShowToast({
          msg: t('ProductInformation.msgInvalidProduct'),
          type: 'error',
        });
        setCurrentQuestion(0);
      }
    }
  }, [cifMetadata]);

  const goToNext = async () => {
    const {
      amount,
      participateInLoanInsurance,
      loanTerm,
      schemeCode,
      loanPurpose,
      incomePerMonth,
      loanPreviousCompanyWorkingTime,
      loanInsuranceDuration,
    } = forms.getValues();
    console.log('forms.getValues()', forms.getValues());
    if (!participateInLoanInsurance) {
      setIsModalVisible(true);
      setContentModal(t('Simulate.alertTitleUncheckInsurance'));
    } else {
      setContentModal('');
      if (currentQuestion + 1 < questionComponents.length) {
        setCurrentQuestion(currentQuestion + 1); // next question
      }
      const metadata: MetaDataRequestProps = {
        ...requestPendingMetadata,
        identityEntryMethod: 'ocr', // todo
        amount: amount.toString() ?? requestPendingMetadata?.amount,
        participateInLoanInsurance:
          participateInLoanInsurance !== undefined
            ? participateInLoanInsurance
            : requestPendingMetadata?.participateInLoanInsurance,
        loanTerm: loanTerm.toString() ?? requestPendingMetadata?.loanTerm,
        schemeCode: schemeCode ?? requestPendingMetadata?.schemeCode,
        loanPreviousCompanyWorkingTime: loanPreviousCompanyWorkingTime,
        loanInsuranceDuration: loanInsuranceDuration,
        loanPurpose: loanPurpose ?? requestPendingMetadata?.loanPurpose,
        incomeMonthly: incomePerMonth ?? requestPendingMetadata?.incomeMonthly,
        business: productSelected?.business ?? requestPendingMetadata?.business,
        product: productSelected?.product ?? requestPendingMetadata?.product,
        subproduct:
          productSelected?.subproduct ?? requestPendingMetadata?.subproduct,
        process: productSelected?.process ?? requestPendingMetadata?.process,
        interest: productSelected?.interest ?? requestPendingMetadata?.interest,
      };
      const bodyRequestPending = {
        userId: requestPendingMetadata?.userId ?? '',
        currentStep: RequestPendingStepEnum.LOAN_INFORMATION,
        productCode: requestPendingMetadata?.schemeCode ?? '',
        metadata,
      };
      await onHandleSaveDaftAPL(bodyRequestPending);
      if (currentQuestion + 1 === questionComponents.length) {
        await onSubmit(metadata); // last question -> complete
      }
    }
  };

  const onPressAgreeLoanSuggestion = async () => {
    // TODO: next to step after agree
    if (cifMetadata) {
      setIsModalCongratulationVisible(false);
      onHandleSubmitSuggestTR({
        flowId: cifMetadata.flowId,
        action: 'approve',
        trUserConfirm: 'Agree',
      });
    }
  };

  const onPressDisagreeLoanSuggestion = async () => {
    // TODO: continue input customer information
    setIsModalCongratulationVisible(false);
    dispatch(setCifMetadata(null));
    if (cifMetadata) {
      setIsModalCongratulationVisible(false);
      onHandleSubmitSuggestTR({
        flowId: cifMetadata.flowId,
        action: 'approve',
        trUserConfirm: "Don't agree",
      });
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
          watchForm={EventEmitterEnum.WatchFormData}
          questionFormValidate={questionFormValidate}
          currentQuestion={currentQuestion}
          goToNext={goToNext}
        />
        <ConfirmModal
          visible={isModalVisible}
          setVisible={setIsModalVisible}
          content={contentModal}
          labelButtonRight={t('Simulate.confirm')}
          singleButton
        />
      </View>
      <CongratulationModal
        visible={isModalCongratulationVisible}
        setVisible={setIsModalCongratulationVisible}
        loanAmount={cifMetadata?.loanAmount}
        interestRate={cifMetadata?.interestRate}
        onButtonAgreePress={onPressAgreeLoanSuggestion}
        onButtonCancelPress={onPressDisagreeLoanSuggestion}
      />
    </>
  );
};

export default LoanInformationScreen;
