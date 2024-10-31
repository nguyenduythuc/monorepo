import {useCallback, useEffect, useMemo} from 'react';
import {Control, FieldValues, useWatch} from 'react-hook-form';
import {
  AnswerType,
  LoanInformationAnswerName,
  StepProps,
} from '../types/models/stepModel';
import {marriedStatusOption, residentSameAsID} from '../data/data';
import eventEmitter, {
  EventEmitterEnum,
} from '@lfvn-customer/shared/utils/eventEmitter';
import {useAppSelector} from '../redux/store';

const useHandleRBPInformation = ({
  control,
  stepNumber,
}: {
  control: Control<FieldValues>;
  stepNumber: number;
}) => {
  const {occupations} = useAppSelector(state => state.product);

  const listOccupationOption = useMemo(() => {
    return occupations.map(item => {
      return {
        code: item.code,
        name: item.name,
      };
    });
  }, [occupations]);

  const aplLoanMarriedStatus = useWatch({
    control,
    name: LoanInformationAnswerName.LoanMarriedStatus,
  });
  const aplResidentAddressType = useWatch({
    control,
    name: LoanInformationAnswerName.LoanResidentAddressType,
  });
  const aplLoanResidentAddress = useWatch({
    control,
    name: LoanInformationAnswerName.LoanResidentAddress,
  });
  const aplLoanResidentAddressDuration = useWatch({
    control,
    name: LoanInformationAnswerName.LoanResidentAddressDuration,
  });
  const aplLoanCustomerOccupation = useWatch({
    control,
    name: LoanInformationAnswerName.LoanCustomerOccupation,
  });

  useEffect(() => {
    let isDisabled = true;
    switch (stepNumber) {
      case 1:
        isDisabled = !aplLoanMarriedStatus;
        break;
      case 2:
        let checkValidate = true;
        if (aplResidentAddressType === 'yes') {
          checkValidate = false;
        } else {
          if (aplLoanResidentAddress && aplLoanResidentAddressDuration) {
            checkValidate = false;
          }
        }
        isDisabled = checkValidate;
        break;
      case 3:
        isDisabled = !aplLoanCustomerOccupation;
        break;
    }
    eventEmitter.emit(EventEmitterEnum.RBPInformationQuestion, {
      stepNumber,
      isDisabled,
    });
  }, [
    aplLoanMarriedStatus,
    aplLoanResidentAddress,
    aplResidentAddressType,
    aplLoanResidentAddressDuration,
    aplLoanCustomerOccupation,
    stepNumber,
  ]);

  const selectAddressType = useMemo(() => {
    return aplResidentAddressType !== residentSameAsID[1].code;
  }, [aplResidentAddressType]);

  const getStep = useCallback(
    ({stepNumber}: {stepNumber: number}): StepProps => {
      switch (stepNumber) {
        case 1:
          return {
            id: 1,
            name: 'MarriedStatus.title',
            description: 'Step.addMoreInformation',
            questions: [
              {
                title: '',
                answers: [
                  {
                    name: LoanInformationAnswerName.LoanMarriedStatus,
                    type: AnswerType.RadioButton,
                    title: 'MarriedStatus.answer',
                    options: marriedStatusOption ?? [],
                  },
                ],
              },
            ],
          };
        case 2:
          return {
            id: 2,
            name: 'ResidentStatus.title',
            description: 'Step.addMoreInformation',
            questions: [
              {
                title: '',
                answers: !selectAddressType
                  ? [
                      {
                        name: LoanInformationAnswerName.LoanResidentAddressType,
                        type: AnswerType.RadioButton,
                        title: '',
                        flexStyle: 'row',
                        options: residentSameAsID ?? [],
                      },
                      {
                        name: LoanInformationAnswerName.LoanResidentAddress,
                        type: AnswerType.AddressInputModal,
                        title: 'ResidentStatus.address',
                        value: '',
                      },
                      {
                        name: LoanInformationAnswerName.LoanResidentAddressDuration,
                        type: AnswerType.CalenderDatePicker,
                        title: 'ResidentStatus.livingSince',
                        value: '',
                        keyboardType: 'numeric',
                      },
                    ]
                  : [
                      {
                        name: LoanInformationAnswerName.LoanResidentAddressType,
                        type: AnswerType.RadioButton,
                        title: '',
                        flexStyle: 'row',
                        options: residentSameAsID ?? [],
                      },
                    ],
              },
            ],
          };
        case 3:
          return {
            id: 3,
            name: 'JobInformation.title',
            description: 'JobInformation.desc',
            questions: [
              {
                title: '',
                answers: [
                  {
                    name: LoanInformationAnswerName.LoanCustomerOccupation,
                    type: AnswerType.RadioButton,
                    title: 'JobInformation.desc',
                    options: listOccupationOption ?? [],
                  },
                ],
              },
            ],
          };
        default:
          return {
            id: 0,
            name: 'Default',
            description: 'Default description',
          };
      }
    },
    [selectAddressType, listOccupationOption],
  );

  return {
    getStep,
    listOccupationOption,
  };
};

export default useHandleRBPInformation;
