import {useCallback, useEffect, useMemo, useState} from 'react';
import {
  AnswerType,
  InputAdditionalInfo,
  LoanInformationAnswerName,
  StepProps,
} from '@lfvn-customer/shared/types/models/stepModel';
import {Control, FieldValues, useWatch} from 'react-hook-form';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';
import {ProductScheme} from '../types/services/productTypes';
import useSimulateScreen from './useSimulateScreen';
import eventEmitter, {
  EventEmitterEnum,
} from '@lfvn-customer/shared/utils/eventEmitter';
import {
  marriedStatusOption,
  residentSameAsID,
  lifeInsuranceDuration,
  defaultSelectProductInfo,
} from '@lfvn-customer/shared/data/data';
import {getVerifyAccountInfo} from '../utils/commonFunction';
import {DEVICE_INFO} from '../utils/constants';
import {useDispatch} from 'react-redux';
import {setProductSelected} from '@lfvn-customer/shared/redux/slices/productSlices';
import {
  useCheckBeneficiaryAccountMutation,
  useGetBankListDataMutation,
} from '../redux/slices/apiSlices';
import useCifAndAplInformation from './useCifAndAplInformation';

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
  const dispatch = useDispatch();
  const {requestPendingMetadata} = useAppSelector(state => state.product);

  const [listBank] = useGetBankListDataMutation();
  const [listBankOption, setListOption] = useState<
    {
      code: string;
      name: string;
    }[]
  >();

  const {verifyBankAccountData, cifData, backAccount} = useCifAndAplInformation(
    {
      flowId: requestPendingMetadata?.flowId || '',
    },
  );

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
      setListOption(options);
    } else {
      console.log('error', result.error);
    }
  };

  useEffect(() => {
    if (stepNumber === 8) {
      getBankList();
    }
  }, [stepNumber]);

  useEffect(() => {
    console.log('cifData', cifData);
  }, [cifData]);

  const infoIdDocType = useWatch({
    control,
    name: InputAdditionalInfo.OtherIdDoc,
  });

  const infoHouseholdBookAddress = useWatch({
    control,
    name: InputAdditionalInfo.HouseholdBookAddressType,
    defaultValue: cifData?.Adr_home.city,
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
    defaultValue: cifData?.Adr_work.city,
  });

  const infoReferralName = useWatch({
    control,
    name: InputAdditionalInfo.ReferralContactName,
    defaultValue: cifData?.Reference1.name1,
  });

  const infoReferralPhoneNumber = useWatch({
    control,
    name: InputAdditionalInfo.ReferralContactPhoneNumber,
    defaultValue: cifData?.Reference1.phone1,
  });

  const infoReferralRelationship = useWatch({
    control,
    name: InputAdditionalInfo.ReferralRelationship,
    defaultValue: cifData?.Reference1.relate1,
  });

  const infoBeneficiaryAccount = useWatch({
    control,
    name: InputAdditionalInfo.BeneficiaryAccount,
  });

  const infoBeneficiaryBank = useWatch({
    control,
    name: InputAdditionalInfo.BeneficiaryBank,
  });

  const infoBeneficiaryFullName = useWatch({
    control,
    name: InputAdditionalInfo.BeneficiaryFullName,
  });

  const selectAddressType = useMemo(() => {
    if (infoHouseholdBookAddress === residentSameAsID[1].code) {
      return false;
    }
    return true;
  }, [infoHouseholdBookAddress]);

  useEffect(() => {
    console.log(
      'infoBeneficiaryAccount',
      infoBeneficiaryAccount,
      infoBeneficiaryBank,
    );

    if (infoBeneficiaryAccount && infoBeneficiaryBank) {
      const timeoutId = setTimeout(() => {
        verifyBankAccountData({
          bank: infoBeneficiaryBank,
          accountNumber: infoBeneficiaryAccount,
        });
      }, 500); // 300ms debounce delay

      // Clean up the timeout if the query changes before the timeout completes
      return () => clearTimeout(timeoutId);
    }
  }, [infoBeneficiaryAccount, infoBeneficiaryBank]);

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
        isDisabled = !(
          infoBeneficiaryBank &&
          infoBeneficiaryAccount &&
          infoBeneficiaryFullName
        );
        break;
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
    infoBeneficiaryFullName,
    infoBeneficiaryBank,
    infoBeneficiaryAccount,
    stepNumber,
  ]);

  const getStep = useCallback(
    ({stepNumber}: {stepNumber: number}): StepProps => {
      switch (stepNumber) {
        case 1:
          return {
            id: 1,
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
                        value: cifData?.Adr_home.city,
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
            description: 'JobInformation.desc',
            questions: [
              {
                title: '',
                answers: [
                  {
                    name: InputAdditionalInfo.JobInformation,
                    type: AnswerType.RadioButton,
                    title: 'JobInformation.desc',
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
            description: 'JobInformation.desc',
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
            description: 'JobInformation.desc',
            questions: [
              {
                title: '',
                answers: [
                  {
                    name: InputAdditionalInfo.CompanyAddress,
                    type: AnswerType.AddressInputModal,
                    title: 'ResidentStatus.address',
                    value: cifData?.Adr_work.city,
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
                    value: cifData?.Reference1.name1,
                  },
                  {
                    name: InputAdditionalInfo.ReferralContactPhoneNumber,
                    type: AnswerType.Input,
                    title: 'ReferralContactInfo.phoneNumber',
                    value: cifData?.Reference1.phone1,
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
                    value: cifData?.Reference1.relate1,
                  },
                ],
              },
            ],
          };
        case 8:
          return {
            id: 8,
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
                    value: listBankOption && listBankOption[0].code,
                  },
                  {
                    name: InputAdditionalInfo.BeneficiaryAccount,
                    type: AnswerType.Input,
                    title: 'Beneficiary.account',
                    keyboardType: 'numeric',
                  },
                  {
                    name: InputAdditionalInfo.BeneficiaryFullName,
                    type: AnswerType.Input,
                    title: 'Beneficiary.fullName',
                    value: backAccount,
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
      cifData,
      occupationList,
      backAccount,
      listBankOption,
      selectAddressType,
    ],
  );

  return {getStep};
};

export default useHandleInputAdditionalInfo;
