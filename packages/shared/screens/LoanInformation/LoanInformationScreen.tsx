import React, {useState} from 'react';
import {View} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {Appbar} from '@lfvn-customer/shared/components';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import IncomePerMonth from '@lfvn-customer/shared/components/Questions/IncomePerMonth';
import LoanPurpose from '@lfvn-customer/shared/components/Questions/LoanPurpose';
import StepTabView from '@lfvn-customer/shared/components/Steps/StepTabView';
import {useConfigRouting} from '@lfvn-customer/shared/hooks';

const LoanInformationScreen = () => {
  const t = useTranslations();
  const {goBack} = useConfigRouting();

  const questionComponents = [IncomePerMonth, LoanPurpose];

  const [currentStep, setCurrentStep] = useState(0);

  const onGoBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      goBack();
    }
  };

  return (
    <>
      <Appbar
        labelContent={t('Step.title', {
          currentStep: currentStep + 1,
          totalStep: questionComponents.length,
        })}
        handleGoBack={onGoBack}
      />
      <View style={tw.style('flex-1')}>
        <StepTabView
          questionComponents={questionComponents}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          onComplete={() => {
            console.log('completed');
          }}
        />
      </View>
    </>
  );
};

export default LoanInformationScreen;
