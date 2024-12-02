import React from 'react';
import OtpInput from 'react-otp-input';
import tw from '@lfvn-customer/shared/themes/tailwind';
import useInputOTP from '@lfvn-customer/shared/hooks/useInputOTP';
import {OTPTypesEnum} from '@lfvn-customer/shared/types';

export const OTPInput = ({
  authSeq,
  type,
  newPassword,
  currentPassword,
}: {
  authSeq: string;
  type: OTPTypesEnum;
  newPassword?: string;
  currentPassword?: string;
}) => {
  const {value, setValue, CELL_COUNT} = useInputOTP({
    authSeq,
    type,
    newPassword,
    currentPassword,
  });

  return (
    <OtpInput
      value={value}
      onChange={setValue}
      numInputs={CELL_COUNT}
      containerStyle={tw.style('justify-around mt-8')}
      inputStyle={tw.style('border-red-500 border rounded-10px w-50px h-50px')}
      renderInput={props => <input {...props} />}
      inputType="number"
    />
  );
};
