import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {CustomButton} from './BaseButton';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import eventEmitter from '@lfvn-customer/shared/utils/eventEmitter';

export const FormButton = ({
  currentQuestion,
  goToNext,
  questionFormValidate,
  watchForm,
}: {
  currentQuestion: number;
  goToNext: () => void;
  questionFormValidate: {[key: number]: boolean};
  watchForm: string;
}) => {
  const t = useTranslations();

  const [disabledButton, setDisableButton] = useState(true);
  const currentStep = useRef(currentQuestion);

  useEffect(() => {
    if (currentStep.current !== currentQuestion) {
      currentStep.current = currentQuestion;
      setDisableButton(questionFormValidate[currentQuestion]);
    }
  }, [currentQuestion]);

  useEffect(() => {
    eventEmitter.on(watchForm, result => {
      questionFormValidate[result.stepNumber - 1] = result.isDisabled;
      if (currentStep.current + 1 === result.stepNumber) {
        setDisableButton(result.isDisabled);
      }
    });
  }, []);

  return (
    <CustomButton
      disabled={disabledButton}
      onPress={goToNext}
      color={'red'}
      buttonStyle={'m-4'}>
      {t('Step.continue')}
    </CustomButton>
  );
};
