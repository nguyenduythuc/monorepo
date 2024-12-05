import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  AnswerType,
  InputAdditionalInfo,
  StepProps,
} from '@lfvn-customer/shared/types/models/stepModel';
import {Control, FieldValues, useWatch} from 'react-hook-form';
import eventEmitter, {
  EventEmitterEnum,
} from '@lfvn-customer/shared/utils/eventEmitter';
import {residentSameAsID} from '@lfvn-customer/shared/data/data';
import {useGetBankListDataMutation} from '../redux/slices/apiSlices';

const idDocType = [
  {
    name: 'CCCD',
    code: '01',
  },
  {
    name: 'CMND',
    code: '02',
  },
];

const occupationList = [
  {
    name: 'Employee',
    code: '01',
  },
  {
    name: 'Self-employed',
    code: '02',
  },
  {
    name: 'Lawyer',
    code: '03',
  },
  {
    name: 'Officer',
    code: '04',
  },
  {
    name: 'Freelance',
    code: '05',
  },
];
const relationshipList = [
  {
    name: 'Colleague',
    code: '01',
  },
  {
    name: 'Friend',
    code: '02',
  },
  {
    name: 'Family member',
    code: '03',
  },
];
const useHandleInputAdditionalInfo = ({
  control,
  stepNumber,
}: {
  control: Control<FieldValues>;
  stepNumber: number;
}) => {
  const [listBank] = useGetBankListDataMutation();
  const [listBankOption, setListBankOption] = useState<
    {
      code: string;
      name: string;
    }[]
  >();

  const getBankList = async () => {
    const result = await listBank({
      queryInput: {},
      limit: 100,
      skip: 0,
      sort: [],
    });

    if (result.data) {
      const options: {code: string; name: string}[] = [];
      result.data.data.map(item => {
        if (item.code) {
          options.push({
            name: item.bankName,
            code: item.code,
          });
        }
      });
      setListBankOption(options);
    } else {
      console.log('error', result.error);
    }
  };

  const descriptionDefault = 'JobInformation.desc';

  useEffect(() => {
    if (stepNumber === 1) {
      getBankList();
    }
  }, [stepNumber]);

  const infoIdDocType = useWatch({
    control,
    name: InputAdditionalInfo.OtherIdDoc,
  });

  const infoHouseholdBookAddress = useWatch({
    control,
    name: InputAdditionalInfo.HouseholdBookAddressType,
  });

  const infoJobInformation = useWatch({
    control,
    name: InputAdditionalInfo.JobInformation,
  });

  const infoCompanyType = useWatch({
    control,
    name: InputAdditionalInfo.CompanyType,
  });

  const infoCompanyInfoName = useWatch({
    control,
    name: InputAdditionalInfo.CompanyName,
  });

  const infoCompanyInfoWorkingDuration = useWatch({
    control,
    name: InputAdditionalInfo.CompanyWorkingTime,
  });

  const infoCompanyInfoAddress = useWatch({
    control,
    name: InputAdditionalInfo.CompanyAddress,
  });

  const infoReferralName = useWatch({
    control,
    name: InputAdditionalInfo.ReferralContactName,
  });

  const infoReferralPhoneNumber = useWatch({
    control,
    name: InputAdditionalInfo.ReferralContactPhoneNumber,
  });

  const infoReferralRelationship = useWatch({
    control,
    name: InputAdditionalInfo.ReferralRelationship,
  });

  const selectAddressType = useMemo(() => {
    return infoHouseholdBookAddress !== residentSameAsID[1].code;
  }, [infoHouseholdBookAddress]);

  useEffect(() => {
    let isDisabled = true;
    switch (stepNumber) {
      case 1:
        isDisabled = !infoIdDocType;
        break;
      case 2:
        isDisabled = !infoHouseholdBookAddress;
        break;
      case 3:
        isDisabled = !infoJobInformation;
        break;
      case 4:
        isDisabled = !(
          infoCompanyType &&
          infoCompanyInfoName &&
          infoCompanyInfoWorkingDuration
        );
        break;
      case 5:
        isDisabled = !infoCompanyInfoAddress;
        break;
      case 6:
        isDisabled = !(infoReferralName && infoReferralPhoneNumber);
        break;
      case 7:
        isDisabled = !infoReferralRelationship;
        break;

      case 8:
    }
    eventEmitter.emit(EventEmitterEnum.WatchFormData, {stepNumber, isDisabled});
  }, [
    infoIdDocType,
    infoHouseholdBookAddress,
    infoJobInformation,
    infoCompanyType,
    infoCompanyInfoName,
    infoCompanyInfoWorkingDuration,
    infoCompanyInfoAddress,
    infoReferralName,
    infoReferralPhoneNumber,
    infoReferralRelationship,
    stepNumber,
  ]);

  const getStep = useCallback(
    ({stepNumber}: {stepNumber: number}): StepProps => {
      switch (stepNumber) {
        case 8:
          return {
            id: 8,
            name: 'AddOtherIdDoc.title',
            description: 'AddOtherIdDoc.desc',
            questions: [
              {
                title: '',
                answers: [
                  {
                    name: InputAdditionalInfo.OtherIdType,
                    type: AnswerType.DropdownOption,
                    title: 'AddOtherIdDoc.idDocType',
                    options: idDocType,
                  },
                  {
                    name: InputAdditionalInfo.OtherIdDoc,
                    type: AnswerType.Input,
                    title: '',
                    value: '',
                    keyboardType: 'numeric',
                  },
                ],
              },
            ],
          };
        case 2:
          return {
            id: 2,
            name: 'HouseHoldBookAddress.title',
            description: 'HouseHoldBookAddress.desc',
            questions: [
              {
                title: '',
                answers: !selectAddressType
                  ? [
                      {
                        name: InputAdditionalInfo.HouseholdBookAddressType,
                        type: AnswerType.RadioButton,
                        title: '',
                        flexStyle: 'row',
                        options: residentSameAsID ?? [],
                      },
                      {
                        name: InputAdditionalInfo.HouseholdBookAddress,
                        type: AnswerType.AddressInputModal,
                        title: 'ResidentStatus.address',
                        value: '',
                      },
                      {
                        name: InputAdditionalInfo.HouseholdBookAddressDuration,
                        type: AnswerType.CalenderDatePicker,
                        title: 'ResidentStatus.livingSince',
                        value: '',
                        keyboardType: 'numeric',
                      },
                    ]
                  : [
                      {
                        name: InputAdditionalInfo.HouseholdBookAddressType,
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
            description: descriptionDefault,
            questions: [
              {
                title: '',
                answers: [
                  {
                    name: InputAdditionalInfo.JobInformation,
                    type: AnswerType.RadioButton,
                    title: descriptionDefault,
                    options: occupationList ?? [],
                  },
                ],
              },
            ],
          };
        case 4:
          return {
            id: 4,
            name: 'WorkingCompanyInformation.title',
            description: descriptionDefault,
            questions: [
              {
                title: '',
                answers: [
                  {
                    name: InputAdditionalInfo.CompanyType,
                    type: AnswerType.DropdownOption,
                    title: 'WorkingCompanyInformation.company',
                    options: idDocType ?? [],
                  },
                  {
                    name: InputAdditionalInfo.CompanyName,
                    type: AnswerType.Input,
                    title: 'WorkingCompanyInformation.companyName',
                    value: '',
                    keyboardType: 'numeric',
                  },
                  {
                    name: InputAdditionalInfo.CompanyWorkingTime,
                    type: AnswerType.CalenderDatePicker,
                    title: 'WorkingCompanyInformation.workingDuration',
                    value: '',
                    keyboardType: 'numeric',
                  },
                ],
              },
            ],
          };
        case 5:
          return {
            id: 5,
            name: 'WorkingCompanyAddress.title',
            description: descriptionDefault,
            questions: [
              {
                title: '',
                answers: [
                  {
                    name: InputAdditionalInfo.CompanyAddress,
                    type: AnswerType.AddressInputModal,
                    title: 'ResidentStatus.address',
                    value: '',
                  },
                ],
              },
            ],
          };
        case 6:
          return {
            id: 6,
            name: 'ReferralContactInfo.title',
            description: 'ReferralContactInfo.desc',
            questions: [
              {
                title: '',
                answers: [
                  {
                    name: InputAdditionalInfo.ReferralContactName,
                    type: AnswerType.Input,
                    title: 'ReferralContactInfo.fullName',
                    value: '',
                  },
                  {
                    name: InputAdditionalInfo.ReferralContactPhoneNumber,
                    type: AnswerType.Input,
                    title: 'ReferralContactInfo.phoneNumber',
                    value: '',
                    keyboardType: 'numeric',
                  },
                ],
              },
            ],
          };
        case 7:
          return {
            id: 7,
            name: 'ReferralRelationship.title',
            description: 'ReferralContactInfo.desc',
            questions: [
              {
                title: '',
                answers: [
                  {
                    name: InputAdditionalInfo.ReferralRelationship,
                    type: AnswerType.RadioButton,
                    title: 'ReferralRelationship.relationship',
                    options: relationshipList ?? [],
                  },
                ],
              },
            ],
          };
        case 1:
          return {
            id: 1,
            name: 'Beneficiary.title',
            description: 'Beneficiary.desc',
            questions: [
              {
                title: '',
                answers: [
                  {
                    name: InputAdditionalInfo.BeneficiaryBank,
                    type: AnswerType.DropdownOption,
                    title: 'Beneficiary.bank',
                    options: listBankOption,
                  },
                  {
                    name: InputAdditionalInfo.BeneficiaryFullName,
                    type: AnswerType.Input,
                    title: 'Beneficiary.account',
                    value: '',
                    keyboardType: 'numeric',
                  },
                  {
                    name: InputAdditionalInfo.BeneficiaryAccount,
                    type: AnswerType.Input,
                    title: 'Beneficiary.fullName',
                    value: '',
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
    [
      //   selectProductLoan,
      //   productSchemeListData,
      //   purposeData,
      //   loanProductOptions,
      listBankOption,
      selectAddressType,
    ],
  );

  return {getStep};
};

export default useHandleInputAdditionalInfo;
