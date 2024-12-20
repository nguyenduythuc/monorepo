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
      case ESignForSaleDocType.CARD:
        return cccdInfo;
      case ESignForSaleDocType.SELFIE:
        return avatarInfo;
      case ESignForSaleDocType.DEGREE:
        return degreeInfo;
      case ESignForSaleDocType.ADDRESS:
        return addressInfo;
      case ESignForSaleDocType.RESUME:
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
