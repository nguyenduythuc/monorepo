import {useEffect} from 'react';
import {
  ESignForSaleDocType,
  UploadESignForSaleFile,
} from '@lfvn-customer/shared/types/services/eSignForSaleTypes';
import useTranslations from './useTranslations';
import {useConfigRouting} from './routing';
import {ScreenParamEnum} from '@lfvn-customer/shared/types/paramtypes';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';
import {useDispatch} from 'react-redux';
import {
  setAddressInfo,
  setAvatarInfo,
  setBankInfo,
  setCccdInfo,
  setDegreeInfo,
  setResumeInfo,
} from '@lfvn-customer/shared/redux/slices/eSignForSaleSlice';
import useShowToast from './useShowToast';

const useUploadDocsESignForSale = () => {
  const t = useTranslations();
  const {cccdInfo, avatarInfo, addressInfo, degreeInfo, resumeInfo, bankInfo} =
    useAppSelector(state => state.eSignForSale);

  const {appNavigate} = useConfigRouting();

  const dispatch = useDispatch();

  const {handleShowToast} = useShowToast();

  useEffect(() => {
    if (!cccdInfo) {
      dispatch(
        setCccdInfo({
          title: t('UploadDocsESignForSale.cccd'),
          type: ESignForSaleDocType.CARD,
          links: [],
        }),
      );
    }
    if (!avatarInfo) {
      dispatch(
        setAvatarInfo({
          title: t('UploadDocsESignForSale.avatar'),
          type: ESignForSaleDocType.SELFIE,
          links: [],
        }),
      );
    }
    if (!addressInfo) {
      dispatch(
        setAddressInfo({
          title: t('UploadDocsESignForSale.address'),
          type: ESignForSaleDocType.ADDRESS,
          links: [],
        }),
      );
    }
    if (!degreeInfo) {
      dispatch(
        setDegreeInfo({
          title: t('UploadDocsESignForSale.degree'),
          type: ESignForSaleDocType.DEGREE,
          links: [],
        }),
      );
    }
    if (!resumeInfo) {
      dispatch(
        setResumeInfo({
          title: t('UploadDocsESignForSale.resume'),
          type: ESignForSaleDocType.RESUME,
          links: [],
        }),
      );
    }
    if (!bankInfo) {
      dispatch(
        setBankInfo({
          title: t('UploadDocsESignForSale.bankInfo'),
          type: ESignForSaleDocType.BANK_INFO,
          links: [],
        }),
      );
    }
  }, [cccdInfo, avatarInfo, addressInfo, degreeInfo, resumeInfo, bankInfo]);

  const onPressSubmit = () => {
    if (
      !cccdInfo?.links?.id ||
      !avatarInfo?.links?.id ||
      !addressInfo?.links?.id ||
      !degreeInfo?.links?.id ||
      !resumeInfo?.links?.id ||
      !bankInfo?.links?.id
    ) {
      handleShowToast({
        msg: t('UploadDocsESignForSale.missingFile'),
        type: 'error',
      });
    } else {
      appNavigate(ScreenParamEnum.CheckNapas);
    }
  };

  const handleOpenFolder = (doc?: UploadESignForSaleFile) => {
    if (!doc) {
      return;
    }
    appNavigate(ScreenParamEnum.DetailFolderESignForSale, {
      docType: doc.type,
    });
  };

  return {
    onPressSubmit,
    handleOpenFolder,
    cccdInfo,
    avatarInfo,
    addressInfo,
    degreeInfo,
    resumeInfo,
    bankInfo,
    setAddressInfo,
    setAvatarInfo,
    setBankInfo,
    setCccdInfo,
    setDegreeInfo,
    setResumeInfo,
  };
};
export default useUploadDocsESignForSale;
