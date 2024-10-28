import React, {use, useEffect, useRef, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {CustomButton} from '../Button';
import {BaseProcess} from '../Process/Process';
import {AutoComplete} from '../AutoComplete';
import {TextInputBase} from '../TextInput/TextInputBase';
import useTranslations from '@lfvn-customer/shared/hooks/useTranslations';
import useAddAddress from '@lfvn-customer/shared/hooks/useAddAddress';
import {SubmitType} from './AddAutoAddress';
import {useDispatch} from 'react-redux';
import {
  setAplAddressData,
  clearAplAddressData,
} from '../../../redux/slices/LoanAplSlices';
type ManualAddressModalProps = {
  value?: string;
  manualSubmit: (type: SubmitType, value?: string) => void;
};

export const AddManualAddress: React.FC<ManualAddressModalProps> = ({
  value,
  manualSubmit,
}) => {
  const t = useTranslations();
  const dispatch = useDispatch();

  const [completeAddress, setCompleteAddress] = useState(value);
  const {listCityData, listDistrictData, listWardData, onSelectGetData} =
    useAddAddress();

  const [detailAddress, setDetailAddress] = useState('');
  const [chooseStep, setChooseStep] = useState({
    step: 1,
    name: t('AddAddress.city'),
    data: listCityData,
  });

  const defaultLoanStep = [
    {title: t('AddAddress.chooseCity')},
    {title: t('AddAddress.chooseDistrict')},
    {title: t('AddAddress.chooseWard')},
    {title: t('AddAddress.noteStreet')},
  ];

  const defaultAddressCode = [
    {code: t('AddAddress.chooseCity')},
    {code: t('AddAddress.chooseDistrict')},
    {code: t('AddAddress.chooseWard')},
    {code: t('AddAddress.noteStreet')},
  ];
  const [loanStep, setLoanStep] = useState(defaultLoanStep);

  const [addressCode, setAddressCode] = useState(defaultAddressCode);

  useEffect(() => {
    if (completeAddress?.includes(',')) {
      reverseMergedLocation(completeAddress);
    }
  }, [completeAddress]);

  useEffect(() => {
    setUpChoose(chooseStep.step);
  }, [listCityData, listDistrictData, listWardData]);

  const updateLoanStepTitle = (
    index: number,
    newTitle: string,
    code?: string,
  ) => {
    setLoanStep(prevSteps => {
      const updatedSteps = [...prevSteps]; // Create a copy of the array
      updatedSteps[index] = {...updatedSteps[index], title: newTitle}; // Update the title at the given index
      return updatedSteps; // Return the updated array
    });

    setAddressCode(prevSteps => {
      const updatedSteps = [...prevSteps]; // Create a copy of the array
      updatedSteps[index] = {
        ...updatedSteps[index],
        code: code || detailAddress,
      }; // Update the title at the given index
      return updatedSteps; // Return the updated array
    });
  };

  const onUndo = () => {
    setDetailAddress('');
    if (completeAddress?.includes(',')) {
      setCompleteAddress('');
      manualSubmit(SubmitType.Reset);
      setLoanStep(defaultLoanStep);
      setAddressCode(defaultAddressCode);
      setChooseStep({step: 1, name: t('AddAddress.city'), data: listCityData});
    } else {
      setChooseStep(prevChooseStep => {
        switch (chooseStep.step - 1) {
          case 0:
            updateLoanStepTitle(0, t('AddAddress.chooseCity'));
          // return { ...prevChooseStep, step: 1, name: t('AddAddress.city'), data: cityData };
          case 1:
            updateLoanStepTitle(1, t('AddAddress.chooseDistrict'));
            return {
              ...prevChooseStep,
              step: 1,
              name: t('AddAddress.city'),
              data: listCityData,
            };
          case 2:
            updateLoanStepTitle(2, t('AddAddress.chooseWard'));
            return {
              ...prevChooseStep,
              step: 2,
              name: t('AddAddress.district'),
              data: listDistrictData,
            };
          case 3:
            updateLoanStepTitle(3, t('AddAddress.noteStreet'));
            return {
              ...prevChooseStep,
              step: 3,
              name: t('AddAddress.ward'),
              data: listWardData,
            };
          default:
            return prevChooseStep;
        }
      });
    }
  };

  const setUpChoose = (type: number) => {
    if (completeAddress?.includes(',')) {
      reverseMergedLocation(completeAddress);
    } else {
      switch (type) {
        case 1:
          // Add 'Choose City' to loanStep and update chooseStep for City selection
          setChooseStep({
            step: 1,
            name: t('AddAddress.city'),
            data: listCityData,
          });
          break;
        case 2:
          // Add 'Choose District' to loanStep and update chooseStep for District selection
          setChooseStep({
            step: 2,
            name: t('AddAddress.district'),
            data: listDistrictData,
          });
          break;
        case 3:
          // Add 'Choose Ward' to loanStep and update chooseStep for Ward selection
          setChooseStep({
            step: 3,
            name: t('AddAddress.ward'),
            data: listWardData,
          });
          break;
        case 4:
          // Add final note for address details
          setChooseStep({step: 4, name: '', data: []});
          break;
        default:
          break;
      }
    }
  };

  const chooseAddressOption = (id: number | string) => {
    const addressDetail = chooseStep.data.find(item => item._id === id);
    if (addressDetail) {
      console.log('addressDetail', addressDetail);
      onSelectGetData(addressDetail.code, chooseStep.step);
      updateLoanStepTitle(
        chooseStep.step - 1,
        addressDetail.name,
        addressDetail.code,
      );
      // Move to the next step
      onNext();
    }
  };

  const onNext = () => {
    setUpChoose(chooseStep.step + 1);
  };

  const onSubmit = () => {
    const locations = JSON.parse(JSON.stringify(loanStep.slice(0, -1)));

    const addressDataCode = {
      city: addressCode[0].code,
      district: addressCode[1].code,
      ward: addressCode[2].code,
      detailAddress: detailAddress,
    };

    console.log('addressDataCode', addressDataCode);
    dispatch(setAplAddressData(addressDataCode));
    const fullAddress =
      (detailAddress !== '' ? detailAddress + ', ' : detailAddress) +
      locations
        .map((location: {title: string}) => location.title) // Extract the title from each object
        .reverse() // Reverse the array to match the desired order
        .join(', ');

    manualSubmit(SubmitType.Submit, fullAddress);
  };

  const reverseMergedLocation = (mergedLocation: string) => {
    const cityToWardAddress = mergedLocation.split(',').reverse().splice(0, 3);
    const noteStreetAddress = mergedLocation
      .split(',')
      .reverse()
      .splice(3, mergedLocation.split(',').reverse().length - 1)
      .reverse()
      .join(',');

    // Split the merged string by commas, trim spaces, and map it back into objects
    let reverseAddress = cityToWardAddress.map(location => ({
      title: location.trim(),
    }));
    setLoanStep(reverseAddress);
    reverseAddress.push({title: t('AddAddress.noteStreet')});

    setDetailAddress(noteStreetAddress);

    setChooseStep({step: 4, name: '', data: []});
  };

  return (
    <View style={tw.style('flex-1 mx-4')}>
      <View style={tw`flex-row items-center justify-between `}>
        <Text style={tw`font-semibold text-base`}>
          {t('AddAddress.selectAddress')}
        </Text>
        <View style={tw.style('flex-row')}>
          <CustomButton
            disabled={chooseStep.step === 1}
            prefixIcon="undo-icon"
            variant="text"
            onPress={onUndo}>
            {t('AddAddress.undo')}
          </CustomButton>
        </View>
      </View>
      <ScrollView>
        <View style={tw.style('justify-start flex-1')}>
          <BaseProcess
            orientation="vertical"
            currentStep={chooseStep.step}
            steps={loanStep}
            color="red"
            verticalHeight={55}
            progressDot
            colorIcon="red"
          />
        </View>

        {chooseStep.step !== 4 ? (
          <ScrollView style={tw.style('flex-1 border-t pt-2 border-gray-200')}>
            <View style={tw.style('')}>
              <AutoComplete
                addressAuto={false}
                title={chooseStep.name}
                listResult={chooseStep.data}
                onSelect={chooseAddressOption}></AutoComplete>
            </View>
          </ScrollView>
        ) : (
          <View style={tw.style(' ml-5')}>
            <TextInputBase
              value={detailAddress}
              onChangeText={setDetailAddress}
            />
          </View>
        )}
      </ScrollView>
      {chooseStep.step === 4 && (
        <CustomButton onPress={onSubmit} color={'red'} buttonStyle={''}>
          {t('AddAddress.addressSubmit')}
        </CustomButton>
      )}
    </View>
  );
};
