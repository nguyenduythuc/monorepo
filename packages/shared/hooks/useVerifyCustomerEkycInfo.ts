import {useState} from 'react';
import useTranslations from './useTranslations';
import {useConfigRouting} from './routing';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import {
  convertDateToISO,
  formatGenderInfo,
  formatNationalityInfo,
  getVerifyAccountInfo,
} from '../utils/commonFunction';
import {VERIFY_ACCOUNT_ID} from '../utils/constants';
import {
  useLoginMutation,
  useUpdateAccountMutation,
} from '../redux/slices/apiSlices';
import {setAppToken} from '../redux/slices/apiSlices/config';
import useAuth from './useAuth';
import {useAppSelector} from '../redux/store';
import {ekycDataType} from '../types/services/verifyCustomerTypes';
import {UpdateAccountRequestProps} from '../types/services/authTypes';

const useVerifyCustomerEkycInfo = ({ekycData}: {ekycData: ekycDataType}) => {
  const t = useTranslations();
  const {appNavigate} = useConfigRouting();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [msgRequestError] = useState('');

  const [isModalInvalidInfo, setIsModalInvalidInfo] = useState(false);
  const [msgRequestInvalidInfoError, setMsgRequestInvalidInfoError] =
    useState('');
  const {onHandleLogout} = useAuth();

  const {user} = useAppSelector(state => state.auth);

  const onCustomerCancel = () => {
    appNavigate(ScreenParamEnum.Home);
  };

  const [login, {isLoading}] = useLoginMutation();

  const [updateAccount, {isLoading: updateAccountLoading}] =
    useUpdateAccountMutation();

  const onInvalidInfoConfirm = () => {
    setIsModalInvalidInfo(false);
    onHandleLogout();
    appNavigate(ScreenParamEnum.Home);
  };

  const onCustomerConfirm = async () => {
    setIsModalVisible(false);

    const updateBody: UpdateAccountRequestProps = {
      login: user?.login || '',
      identityNumber: ekycData?.idNumber,
      loginNew: ekycData?.idNumber,
      phoneNumber: user?.phoneNumber,
      email: user?.email,
      identityNumberOld: ekycData?.oldIdNumber || user?.identityNumberOld,
      identityIssue: convertDateToISO(ekycData?.doi || ''),
      birthDate: convertDateToISO(ekycData?.dob || ''),
      fullName: ekycData?.fullname,
      gender: formatGenderInfo(ekycData?.gender, 'update'),
      nationality: formatNationalityInfo(ekycData?.nationality || ''),
    };

    const updateResult = await updateAccount(updateBody);

    if (updateResult.error) {
      setIsModalInvalidInfo(true);
      setMsgRequestInvalidInfoError(t('VerifyCustomer.needSupport'));
    } else {
      onHandleLogout();
      appNavigate(ScreenParamEnum.SuccessAccountRegister, {
        phoneNumber: user?.phoneNumber,
        identityNumber: ekycData?.idNumber,
      });
    }
  };

  const recheckIdINfo = async ({
    accountData,
  }: {
    accountData: {idNum: string; phoneNum: string};
  }) => {
    const result = await login({
      username: accountData.idNum,
      password: accountData.phoneNum,
    });
    if (result.data?.id_token) {
      setAppToken(result.data?.id_token || '');
    }
    if (ekycData?.idNumber === accountData.idNum) {
      console.log('match');

      const updateAccountResult = await updateAccount({
        login: accountData.idNum,
        phoneNumber: accountData.phoneNum,
        birthDate: convertDateToISO(ekycData?.dob ?? ''),
        birthPlace: ekycData?.origin,
        fullName: ekycData?.fullname,
        gender: formatGenderInfo(ekycData?.gender, 'update'),
        nationality: 'VIETNAMESE',
        identityNumberOld: ekycData?.oldIdNumber,
        identityNumber: ekycData?.idNumber,
        identityIssue: convertDateToISO(ekycData?.doi ?? ''),
      });

      if (updateAccountResult) {
        onHandleLogout();
        appNavigate(ScreenParamEnum.SuccessAccountRegister, {
          phoneNumber: accountData.phoneNum,
          identityNumber: accountData.idNum,
        });
      }
    } else {
      setIsModalVisible(true);
    }
  };

  const handleSubmit = () => {
    const manualInputInfo = JSON.parse(
      getVerifyAccountInfo(VERIFY_ACCOUNT_ID) || '',
    );
    recheckIdINfo({accountData: manualInputInfo});
  };

  return {
    // isLoading,
    onCustomerCancel,
    onCustomerConfirm,
    setIsModalVisible,
    isModalVisible,
    msgRequestError,
    isLoading: isLoading || updateAccountLoading,
    handleSubmit,
    setIsModalInvalidInfo,
    isModalInvalidInfo,
    msgRequestInvalidInfoError,
    onInvalidInfoConfirm,
    recheckIdINfo,
  };
};

export default useVerifyCustomerEkycInfo;
