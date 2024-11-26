import {useEffect} from 'react';
import {
  ESignForSaleDocType,
  UploadESignForSaleFile,
} from '@lfvn-customer/shared/types/services/eSignForSaleTypes';
import useTranslations from './useTranslations';
import useHandlePDF from './useHandlePDF';
import {useSaleImportDocsUploadWebMutation} from '../redux/slices/apiSlices';
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
import {
  clearLoadingScreen,
  setLoadingScreen,
} from '@lfvn-customer/shared/redux/slices/loadingSlices';

const useUploadDocsESignForSale = () => {
  const t = useTranslations();
  const {
    cccdInfo,
    avatarInfo,
    addressInfo,
    degreeInfo,
    resumeInfo,
    bankInfo,
    dataSaleInfo,
  } = useAppSelector(state => state.eSignForSale);

  const {createPdfFromImages} = useHandlePDF();
  const {appNavigate} = useConfigRouting();

  const dispatch = useDispatch();

  const {showCommonErrorToast, handleShowToast} = useShowToast();

  const [uploadDocs] = useSaleImportDocsUploadWebMutation();

  useEffect(() => {
    if (!cccdInfo) {
      dispatch(
        setCccdInfo({
          title: t('VerifyESignForSale.cccd'),
          type: ESignForSaleDocType.CARD,
          links: [],
        }),
      );
    }
    if (!avatarInfo) {
      dispatch(
        setAvatarInfo({
          title: t('VerifyESignForSale.avatar'),
          type: ESignForSaleDocType.SELFIE,
          links: [],
        }),
      );
    }
    if (!addressInfo) {
      dispatch(
        setAddressInfo({
          title: t('VerifyESignForSale.address'),
          type: ESignForSaleDocType.ADDRESS,
          links: [],
        }),
      );
    }
    if (!degreeInfo) {
      dispatch(
        setDegreeInfo({
          title: t('VerifyESignForSale.degree'),
          type: ESignForSaleDocType.DEGREE,
          links: [],
        }),
      );
    }
    if (!resumeInfo) {
      dispatch(
        setResumeInfo({
          title: t('VerifyESignForSale.resume'),
          type: ESignForSaleDocType.RESUME,
          links: [],
        }),
      );
    }
    if (!bankInfo) {
      dispatch(
        setBankInfo({
          title: t('VerifyESignForSale.bankInfo'),
          type: ESignForSaleDocType.BANK_INFO,
          links: [],
        }),
      );
    }
  }, [cccdInfo, avatarInfo, addressInfo, degreeInfo, resumeInfo, bankInfo]);

  const onPressSubmit = () => {
    try {
      if (
        !!cccdInfo &&
        !!avatarInfo &&
        !!addressInfo &&
        !!degreeInfo &&
        !!resumeInfo &&
        !!bankInfo
      ) {
        dispatch(setLoadingScreen());
        const files = [
          cccdInfo,
          avatarInfo,
          addressInfo,
          degreeInfo,
          resumeInfo,
          bankInfo,
        ];
        const pdfs = files.map(file => createPdfFromImages(file));
        Promise.all(pdfs).then(async pdfFiles => {
          // Upload pdfFiles to server
          const res = await uploadDocs({
            saleImportId: dataSaleInfo?.saleImportId ?? '',
            idCardNumber: dataSaleInfo?.idCardNumber ?? '',
            docIdCard: pdfFiles[0],
            docSelfie: pdfFiles[1],
            docGtct: pdfFiles[2],
            docVb: pdfFiles[3],
            docSyll: pdfFiles[4],
            docBank: pdfFiles[5],
            tokenEsign: dataSaleInfo?.tokenEsign ?? '',
          });
          if (res.data) {
            // navigate to check NAPAS
            appNavigate(ScreenParamEnum.CheckNapas);
          } else {
            showCommonErrorToast();
          }
        });
      } else {
        handleShowToast({
          msg: t('VerifyESignForSale.missingFile'),
          type: 'error',
        });
      }
    } catch {
      showCommonErrorToast();
    } finally {
      dispatch(clearLoadingScreen());
    }
  };

  const handleOpenFolder = (doc: UploadESignForSaleFile) => {
    const encodedData = encodeURIComponent(JSON.stringify(doc));
    appNavigate(ScreenParamEnum.DetailFolder, {
      folderEncoded: encodedData,
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
