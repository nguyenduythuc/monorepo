import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {Appbar, FormButton} from '@lfvn-customer/shared/components';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import StepTabView from '@lfvn-customer/shared/components/Steps/StepTabView';
import useLoanInformation from '@lfvn-customer/shared/hooks/useLoanInformation';
import {useForm} from 'react-hook-form';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';
import {useDispatch} from 'react-redux';
import {generateQuestionValidateStatusList} from '@lfvn-customer/shared/utils/commonFunction';
import {storage} from '../../utils/storage';
import AddOtherIdentificationDoc from '../../components/Questions/AddOtherIdentificationDoc';
import HouseholdBookAddress from '../../components/Questions/HouseholdBookAddress';
import {EventEmitterEnum} from '../../utils/eventEmitter';

const questionComponents = [
  AddOtherIdentificationDoc,
  HouseholdBookAddress,
  // AddOtherIdentificationDoc,
];

const questionFormValidate = generateQuestionValidateStatusList(
  questionComponents.length,
);

const InputAdditionalInformation = () => {
  const {cifMetadata, productSelected} = useAppSelector(state => state.product);
  const dispatch = useDispatch();

  const t = useTranslations();
  const forms = useForm();
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const {onPressGoBack} = useLoanInformation();

  const onGoBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      onPressGoBack();
    }
  };

  const goToNext = async () => {
    const {amount} = forms.getValues();

    if (currentQuestion + 1 < questionComponents.length) {
      setCurrentQuestion(currentQuestion + 1); // next question
    }

    if (currentQuestion + 1 === questionComponents.length) {
      // await onSubmit(metadata); // last question -> complete
      console.log('8671253476125');
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
      </View>
    </>
  );
};

export default InputAdditionalInformation;
