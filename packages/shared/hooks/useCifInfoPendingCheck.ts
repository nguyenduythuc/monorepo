import {useEffect} from 'react';
import {useConfigRouting} from './routing';
import {
  useCheckTRAndProductMutation,
  useLazyGetCifInfoQuery,
} from '../redux/slices/apiSlices';
import useShowToast from './useShowToast';
import useTranslations from './useTranslations';
import {useDispatch} from 'react-redux';
import {setCifMetadata} from '../redux/slices/productSlices';

const INTERVAL_TIME = 3000;

const useCifInfoPendingCheck = ({
  flowId,
  productCode,
}: {
  flowId: string;
  productCode: string;
}) => {
  const {goBack} = useConfigRouting();
  const {handleShowToast} = useShowToast();
  const dispatch = useDispatch();

  const t = useTranslations();

  const [getCifInfo] = useLazyGetCifInfoQuery();
  const [checkTRAndProduct] = useCheckTRAndProductMutation();

  useEffect(() => {
    const unsubcribe = setInterval(async () => {
      try {
        const responseCifInfo = await getCifInfo({flowId});
        if (responseCifInfo.data) {
          const cifInfo = responseCifInfo.data;
          if (cifInfo?.data.apl.status === 'open') {
            clearInterval(unsubcribe);
            const cifId = cifInfo?.data.apl.customer.cif;
            const responseCheckTRAndProduct = await checkTRAndProduct({
              cifId,
              productCode,
              aplCreatedAt: cifInfo?.data.apl.createdAt,
            });
            if (responseCheckTRAndProduct.data?.metadata) {
              dispatch(
                setCifMetadata({
                  ...responseCheckTRAndProduct.data?.metadata,
                  flowId,
                }),
              );
              goBack();
            }
          }
        }
      } catch {
        handleShowToast({
          msg: t('ErrorCommon.message'),
          type: 'error',
        });
      }
    }, INTERVAL_TIME);
    return () => {
      clearInterval(unsubcribe);
    };
  }, []);
};

export default useCifInfoPendingCheck;
