import {useEffect, useState} from 'react';
import {useLazyGetBankListNapasDataQuery} from '@lfvn-customer/shared/redux/slices/apiSlices';
import {useAppSelector} from '@lfvn-customer/shared/redux/store';
import {useConfigRouting} from '.';
import {useDispatch} from 'react-redux';
import {
  clearLoadingScreen,
  setLoadingScreen,
} from '@lfvn-customer/shared/redux/slices/loadingSlices';
import useShowToast from './useShowToast';
import {NapasBankProps} from '@lfvn-customer/shared/types/services/eSignForSaleTypes';
import {setBankNapas} from '../redux/slices/napasBankSlices';

const useListNapasBank = () => {
  const [listBank] = useLazyGetBankListNapasDataQuery();

  const dispatch = useDispatch();

  const {goBack} = useConfigRouting();
  const {showCommonErrorToast} = useShowToast();

  const {bankSelected} = useAppSelector(state => state.napasBank);

  const [searchQuery, setSearchQuery] = useState('');
  const [newBank, setNewBank] = useState<NapasBankProps>(bankSelected);
  const [listBankOption, setListBankOption] = useState<NapasBankProps[]>([]);
  const [filterBanks, setFilterBanks] = useState<NapasBankProps[]>([]);

  // Handle the value change in TextInputSearch
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const getBankList = async () => {
    try {
      dispatch(setLoadingScreen());
      const result = await listBank();
      if (result.data) {
        const options: {code: string; name: string}[] = [];
        const uniqueBanks = new Set();
        result.data.forEach(item => {
          if (item.code && !uniqueBanks.has(item.code)) {
            uniqueBanks.add(item.code);
            options.push({
              name: item.name,
              code: item.bankCode,
            });
          }
        });
        setListBankOption(options);
      } else {
        showCommonErrorToast();
      }
    } catch {
      showCommonErrorToast();
    } finally {
      dispatch(clearLoadingScreen());
    }
  };

  useEffect(() => {
    getBankList();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = listBankOption.filter(
        bank =>
          bank.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bank.code.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilterBanks(filtered);
    } else {
      setFilterBanks(listBankOption);
    }
  }, [searchQuery, listBankOption]);

  const onPressSubmit = async () => {
    dispatch(setBankNapas(newBank));
    goBack();
  };

  const onPressSelectBank = (newBank: NapasBankProps) => {
    setNewBank(newBank);
  };

  return {
    onPressSubmit,
    filterBanks,
    searchQuery,
    handleSearchChange,
    bankSelected,
    onPressSelectBank,
    newBank,
  };
};

export default useListNapasBank;
