import {useState} from 'react';
import useTranslations from './useTranslations';
import {useConfigRouting} from './routing';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import {getVerifyAccountInfo} from '../utils/commonFunction';
import {VERIFY_ACCOUNT_ID} from '../utils/constants';
import {
  useLoginMutation,
  useUpdateAccountMutation,
  useUpdateOCRIdentityNumberMutation,
} from '../redux/slices/apiSlices';
import {setAppToken} from '../redux/slices/apiSlices/config';
import useAuth from './useAuth';
import {useAppSelector} from '../redux/store';
import {ekycDataType} from '../types/services/verifyCustomerTypes';
import {UpdateAccountRequestProps} from '../types/services/authTypes';

const useVerifyCustomerEkycInfo = ({ekycData}: {ekycData: ekycDataType}) => {
  const t = useTranslations();
  const {appNavigate, goBack} = useConfigRouting();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [msgRequestError, setMsgRequestError] = useState('');

  const [isModalInvalidInfo, setIsModalInvalidInfo] = useState(false);
  const [msgRequestInvalidInfoError, setMsgRequestInvalidInfoError] =
    useState('');
  const {onHandleGetUserProfile, onHandleLogout} = useAuth();

  const {user} = useAppSelector(state => state.auth);

  const onCustomerCancel = () => {
    appNavigate(ScreenParamEnum.Home);
  };

  const [login, {isError, isLoading}] = useLoginMutation();
  const [
    updateOCRIdentityNumber,
    {
      isError: updateOCRIdentityNumberError,
      isLoading: updateOCRIdentityLoading,
    },
  ] = useUpdateOCRIdentityNumberMutation();

  const [
    updateAccount,
    {isError: updateAccountError, isLoading: updateAccountLoading},
  ] = useUpdateAccountMutation();

  const onInvalidInfoConfirm = () => {
    setIsModalInvalidInfo(false);
    onHandleLogout();
    appNavigate(ScreenParamEnum.Home);
  };

  const onCustomerConfirm = async () => {
    setIsModalVisible(false);

    const updateBody: UpdateAccountRequestProps = {
      login: user?.login || '',
      identityNumber: ekycData.cardNumber,
      phoneNumber: user?.phoneNumber,
      email: user?.email,
      birthPlace: ekycData.placeOfBirth,
      fullName: ekycData.name,
      gender: ekycData.gender === 'Nam' ? 'MALE' : 'FEMALE',
      nationality: ekycData.nationality === 'Việt Nam' ? 'VIETNAMESE' : 'OTHER',
    };
    const updateResult = await updateAccount(updateBody);
    console.log('updateResult', updateResult);
    if (updateResult.error) {
      setIsModalInvalidInfo(true);
      setMsgRequestInvalidInfoError(t('VerifyCustomer.needSupport'));
    } else {
      // const updateAccountResult = await updateAccount({
      //   login: user?.login,
      //   phoneNumber: user?.phoneNumber,
      //   email: user?.email,
      //   birthPlace: ekycData.placeOfBirth,
      //   fullName: ekycData.name,
      //   gender: ekycData.gender === 'Nam' ? 'MALE' : 'FEMALE',
      //   nationality:
      //     ekycData.nationality === 'Việt Nam' ? 'VIETNAMESE' : 'OTHER',
      // });
      // if (!updateAccountResult.error) {
      appNavigate(ScreenParamEnum.SuccessAccountRegister);
      // }
    }
    if (updateOCRIdentityNumberError) {
      console.log('error');
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
      onHandleGetUserProfile();
    }
    if (ekycData.cardNumber === accountData.idNum) {
      console.log('match');

      const updateAccountResult = await updateAccount({
        login: user?.login,
        phoneNumber: user?.phoneNumber,
        email: user?.email,
        birthPlace: ekycData.placeOfBirth,
        fullName: ekycData.name,
        gender: ekycData.gender === 'Nam' ? 'MALE' : 'FEMALE',
        nationality:
          ekycData.nationality === 'Việt Nam' ? 'VIETNAMESE' : 'OTHER',
        // identityNumberOld: ekycData.identityNumberOld,
      });

      if (updateAccountResult) {
        appNavigate(ScreenParamEnum.SuccessAccountRegister);
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
    isLoading: isLoading || updateAccountLoading || updateOCRIdentityLoading,
    handleSubmit,
    setIsModalInvalidInfo,
    isModalInvalidInfo,
    msgRequestInvalidInfoError,
    onInvalidInfoConfirm,
    recheckIdINfo,
  };
};

export default useVerifyCustomerEkycInfo;
