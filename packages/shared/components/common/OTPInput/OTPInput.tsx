import React from 'react';
import {CodeField} from 'react-native-confirmation-code-field';
import {View, Text, StyleSheet} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';
import useInputOTP from '@lfvn-customer/shared/hooks/useInputOTP';

export const OTPInput = ({authSeq, type}: {authSeq: string; type: string}) => {
  const {theme} = useGetTheme();
  const {textNegative500, borderDanger500} = theme;

  const {ref, props, value, setValue, getCellOnLayoutHandler, CELL_COUNT} =
    useInputOTP({
      authSeq,
      type,
    });

  return (
    <CodeField
      ref={ref}
      {...props}
      // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
      value={value}
      onChangeText={setValue}
      cellCount={CELL_COUNT}
      rootStyle={styles.codeFieldRoot}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      testID="my-code-input"
      renderCell={({index, symbol, isFocused}) => (
        <View
          key={index}
          style={tw.style(
            `${
              isFocused || index + 1 > value.length
                ? 'border-neutral-200'
                : borderDanger500
            }`,
            'items-center justify-center',
            styles.cell,
          )}
          onLayout={getCellOnLayoutHandler(index)}>
          <Text
            style={tw.style(
              `text-2xl text-center font-medium ${textNegative500}`,
            )}>
            {symbol}
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 20,
    marginHorizontal: 16,
  },
  cell: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000',
  },
});
