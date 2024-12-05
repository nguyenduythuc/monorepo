import React, {forwardRef, useMemo, useState} from 'react';
import {ITextInputProps} from '@lfvn-customer/shared/types';
import {View, TextInput as NativeTextInput} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {TextInputBase} from './TextInputBase';
import {Icon} from '../Icon';
import dayjs from 'dayjs';
import {CalendarDatePicker} from '../Calendar';
import {DateType} from 'react-native-ui-datepicker';
// import DatePicker from 'react-native-date-picker';

export const TextInputDatePicker = forwardRef<NativeTextInput, ITextInputProps>(
  ({value, containerStyle, onChangeValue, ...props}, ref) => {
    const openCalendar = () => {
      setVisible(true);
    };

    const [visible, setVisible] = useState(false);

    const CalendarIconComponent = useMemo(
      () => <Icon name="calendar-icon" size={24} onPress={openCalendar} />,
      [],
    );

    const handleInputChange = (text: string) => {
      // Remove any non-digit characters from input
      const numericValue = text.replace(/\D/g, '');

      let formattedValue = numericValue;

      // Automatically format as MM/YYYY
      if (numericValue.length >= 3) {
        formattedValue = `${numericValue.slice(0, 2)}/${numericValue.slice(2, 6)}`;
      } else if (numericValue.length > 0) {
        formattedValue = numericValue;
      }

      // Call the onChangeValue function with the formatted value
      onChangeValue(formattedValue);
    };

    const handleDateChange = (selectedDate: DateType) => {
      // Format the date to MM/YYYY
      const formattedDate = dayjs(selectedDate).format('MM/YYYY');
      // Call the onChangeValue prop to update the value in the parent component
      onChangeValue(formattedDate);
      // Close the calendar
      console.log('formattedDate', formattedDate);
      setVisible(false);
    };

    return (
      <View>
        <CalendarDatePicker
          visible={visible}
          setVisible={setVisible}
          onChangeValue={handleDateChange}
        />
        <View style={tw.style(containerStyle)}>
          <TextInputBase
            {...props}
            ref={ref}
            value={value}
            onChangeText={handleInputChange}
            rightComponent={CalendarIconComponent}
          />
        </View>
      </View>
    );
  },
);
