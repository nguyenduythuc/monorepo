import DateTimePicker, { DateType } from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { View } from 'react-native';
import React, { useRef, useState } from 'react';
import tw from '@lfvn-customer/shared/themes/tailwind';

import { BaseModal } from '../AppModal';
import { CustomButton } from '../Button';

type DatePickerProps = {
  visible: boolean;
  setVisible: (value: boolean) => void;
  onChangeValue: (value: DateType) => void;
};

export const CalendarDatePicker: React.FC<DatePickerProps> = ({
  visible,
  setVisible,
  onChangeValue
}) => {
  const [date, setDate] = useState<DateType>(dayjs());
  const dropDownRef = useRef<any>(null);
  const onOpen = () => dropDownRef.current?.open();
  const onClose = () => {
    setVisible && setVisible(false);
    dropDownRef.current?.close();
  };

  if (visible) {
    onOpen();
  } else {
    console.log('test')
    onClose();
  }

  const changeValue = (date: DateType) => {
    setDate(date)
    onChangeValue(date)
  }

  return (
    <BaseModal ref={dropDownRef} disabled>
      <View style={tw.style('flex items-center justify-center w-full h-full px-8')}>
        <View style={tw.style(
          'bg-white items-center rounded-2xl w-full py-5 px-5',
        )}>
          <DateTimePicker
            mode="single"
            date={date}
            maxDate={dayjs().endOf('day')}
            onChange={(value) => changeValue(value.date)}
            initialView='month'
            selectedTextStyle={{
              fontWeight: 'bold',
            }}
            selectedItemColor='#E7252B'
            height={250}
          />

        </View>

        <View style={tw.style('w-full mt-5')}>
          <CustomButton
            onPress={onClose}
            color="red">
            {'Close'}
          </CustomButton>
        </View>

      </View>
    </BaseModal>
  );
}

