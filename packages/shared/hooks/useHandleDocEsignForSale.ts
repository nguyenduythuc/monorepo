import {useMemo} from 'react';
import {ESignForSaleDocType} from '@lfvn-customer/shared/types/services/eSignForSaleTypes';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';

const useHandleDocEsignForSale = (docType?: ESignForSaleDocType) => {
  const {cccdInfo, bankInfo, addressInfo, resumeInfo, degreeInfo, avatarInfo} =
    useAppSelector(state => state.eSignForSale);

  const doc = useMemo(() => {
    if (!docType) {
      return undefined;
    }
    switch (docType) {
      case ESignForSaleDocType.DOC_CCCD:
        return cccdInfo;
      case ESignForSaleDocType.DOC_SELFIE:
        return avatarInfo;
      case ESignForSaleDocType.DOC_GTCT:
        return addressInfo;
      case ESignForSaleDocType.DOC_VB:
        return degreeInfo;
      case ESignForSaleDocType.DOC_SYLL:
        return resumeInfo;
      case ESignForSaleDocType.BANK_INFO:
        return bankInfo;
      default:
        return undefined;
    }
  }, [cccdInfo, bankInfo, addressInfo, resumeInfo, degreeInfo, avatarInfo]);

  return {
    doc,
  };
};
export default useHandleDocEsignForSale;
