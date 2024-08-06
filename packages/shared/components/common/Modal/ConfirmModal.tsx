import React from 'react';
import {IConfirmModalProps} from '@lfvn-customer/shared/types';
import {View, Text, TouchableOpacity} from 'react-native';
import tw from 'twrnc';
import {useGetTheme} from '@lfvn-customer/shared/hooks/useGetTheme';

export const ConfirmModal: React.FC<IConfirmModalProps> = ({
  visiable,
  setVisiable,
  title,
  content,
  labelButton1,
  labelButton2,
  onButton1Press,
  onButton2Press,
  onPressClose,
  ...props
}) => {
  const {theme} = useGetTheme();
  const {textNegative500, textNegative400, textUseful500, bgUseful500} = theme;
  return (
    <View>
      {/* <Modal
        {...props}
        ref={ref}
        isVisible={visiable}
        backdropOpacity={backdropOpacity}
        onBackdropPress={onPressClose}>
        <View style={tw.style('bg-white p-4', {borderRadius: 28})}>
          <Text
            style={tw.style(
              `font-semibold text-xl text-center ${textNegative500}`,
            )}>
            {title}
          </Text>
          <Text style={tw.style(`text-lg text-center mt-2 ${textNegative400}`)}>
            {content}
          </Text>
          {labelButton1 && (
            <TouchableOpacity
              style={tw.style(`${bgUseful500} p-2 my-4 rounded-10px`)}
              onPress={onButton1Press}>
              <Text
                style={tw.style(
                  'text-lg font-semibold text-center text-white',
                )}>
                {labelButton1}
              </Text>
            </TouchableOpacity>
          )}
          {labelButton2 && (
            <TouchableOpacity style={tw.style('my-1')} onPress={onButton2Press}>
              <Text
                style={tw.style(
                  `text-lg font-semibold text-center ${textUseful500}`,
                )}>
                {labelButton2}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </Modal> */}
    </View>
  );
};
