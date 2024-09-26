import React, {useState} from 'react';
import {View} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {
  Appbar,
  ConfirmModal,
  CustomButton,
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

const LoanInformationScreen = () => {
  const t = useTranslations();

  const {onPressGoBack} = useLoanInformation();

  const questionComponents = [ProductInformation, IncomePerMonth, LoanPurpose];

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const forms = useForm();

  const onGoBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onPressGoBack();
    }
  };

  const {onHandleSaveDaftAPL} = useHandleRequestPending();
  const {onHandleCreateAPL} = useHandleCreateAPL();
  const {requestPendingMetadata} = useAppSelector(state => state.product);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contentModal, setContentModal] = useState('');

  const onSubmit = async (bodyCreateAPL: MetaDataRequestProps) => {
    await onHandleCreateAPL(bodyCreateAPL);
  };

  const goToNext = async () => {
    const {
      amount,
      participateInLoanInsurance,
      loanTerm,
      schemeCode,
      loanPurpose,
    } = forms.getValues();
    if (!participateInLoanInsurance) {
      setIsModalVisible(true);
      setContentModal(t('Simulate.alertTitleUntickInsurance'));
    } else {
      setContentModal('');
      setCurrentQuestion(currentQuestion + 1); // next question
      const metadata: MetaDataRequestProps = {
        ...requestPendingMetadata,
        amount: amount ?? requestPendingMetadata?.amount,
        participateInLoanInsurance:
          participateInLoanInsurance !== undefined
            ? participateInLoanInsurance
            : requestPendingMetadata?.participateInLoanInsurance,
        loanTerm: loanTerm ?? requestPendingMetadata?.loanTerm,
        schemeCode: schemeCode ?? requestPendingMetadata?.schemeCode,
        loanPurpose: loanPurpose ?? requestPendingMetadata?.loanPurpose,
      };
      const bodyRequestPending = {
        userId: requestPendingMetadata?.userId ?? '',
        currentStep: RequestPendingStepEnum.LOAN_INFORMATION,
        productCode: requestPendingMetadata?.schemeCode ?? '',
        metadata,
      };
      await onHandleSaveDaftAPL(bodyRequestPending);
      if (currentQuestion + 1 === questionComponents.length) {
        onSubmit(metadata); // last question -> complete
      }
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
        <CustomButton onPress={goToNext} color={'red'} buttonStyle={'m-4'}>
          {t('Step.continue')}
        </CustomButton>
        <ConfirmModal
          visible={isModalVisible}
          setVisible={setIsModalVisible}
          content={contentModal}
          labelButtonRight={t('Simulate.confirm')}
          singleButton
        />
      </View>
    </>
  );
};

export default LoanInformationScreen;
