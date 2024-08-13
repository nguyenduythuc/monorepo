import React from 'react';
import {
  FieldConfig,
  FieldType,
  FormProps,
} from '@lfvn-customer/shared/types/formTypes';
import {Controller, useForm} from 'react-hook-form';
import {
  Checkbox,
  DropDownSelect,
  Icon,
  SliderWithTextInput,
  TextInput,
  TextInputSearch,
} from '@lfvn-customer/shared/components/common';
import {View} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';

export const useCustomForm = ({fields, defaultValues}: FormProps) => {
  const {
    control,
    watch,
    formState,
    getValues,
    setValue,
    register,
    ...formReturn
  } = useForm({
    defaultValues,
  });
  const {errors} = formState;

  const renderField = (field: FieldConfig, isRow: boolean) => {
    switch (field.type) {
      case FieldType.TextInput:
        return (
          <Controller
            key={field.controlProps.name}
            {...field.controlProps}
            control={control}
            defaultValue=""
            render={({field: {onChange, onBlur, value, ref}}) => {
              return (
                <TextInput
                  keyboardType={field.keyboardType}
                  onChangeValue={onChange}
                  value={value}
                  watch={watch}
                  onBlur={onBlur}
                  disabled={field.disabled}
                  label={field.label}
                  ref={ref}
                  errorMessage={
                    errors[field.controlProps.name]?.message?.toString() || ''
                  }
                  required={!!field.controlProps.rules?.required}
                  placeholder={field.placeholder}
                  containerStyle={field.containerStyle}
                  secureTextEntry={field.secureTextEntry}
                  leftComponent={field.leftComponent}
                  textInputStyle={field.textInputStyle}
                />
              );
            }}
          />
        );
      case FieldType.TextInputSearch:
        return (
          <Controller
            key={field.controlProps.name}
            {...field.controlProps}
            control={control}
            defaultValue=""
            render={({field: {onChange, onBlur, value, ref}}) => {
              return (
                <TextInputSearch
                  keyboardType={field.keyboardType}
                  onChangeValue={onChange}
                  value={value}
                  watch={watch}
                  onBlur={onBlur}
                  disabled={field.disabled}
                  label={field.label}
                  ref={ref}
                  errorMessage={
                    errors[field.controlProps.name]?.message?.toString() || ''
                  }
                  required={!!field.controlProps.rules?.required}
                  placeholder={field.placeholder}
                  containerStyle={field.containerStyle}
                />
              );
            }}
          />
        );

      case FieldType.SliderWithTextInput:
        return (
          <Controller
            key={field.label}
            {...field.controlProps}
            control={control}
            defaultValue={field.defaultValue}
            render={({field: {onChange, onBlur, value, ref}}) => {
              return (
                <SliderWithTextInput
                  color="red"
                  onChange={onChange}
                  onChangeSlider={onChange}
                  value={value}
                  max_value={field.maxValue || 10}
                  min_value={field.minValue || 1}
                  step={field.step || 1}
                  unit={field.unit || 'unit'}
                  label={field.label}
                  defaultValue={field.defaultValue || ''}
                />
              );
            }}
          />
        );

      case FieldType.SelectDropdown:
        return (
          <Controller
            key={field.label}
            {...field.controlProps}
            control={control}
            defaultValue={''}
            render={({field: {onChange, onBlur, value, ref}}) => {
              return (
                <DropDownSelect
                  value={value}
                  required={!!field.controlProps.rules?.required}
                  label={field.label}
                  options={field.options || []}
                  onChange={onChange}
                  placeholder="Choose Loan Purpose"
                />
              );
            }}
          />
        );

      case FieldType.CheckboxWithIcon:
        return (
          <Controller
            key={field.label}
            {...field.controlProps}
            control={control}
            defaultValue={false}
            render={({field: {onChange, onBlur, value, ref}}) => {
              return (
                <View
                  style={tw`flex flex-row justify-between items-start mt-6`}>
                  <Checkbox
                    label={field.label || ''}
                    description={field.description}
                    isChecked={value}
                    onChange={onChange}
                    color={field.checkboxColor}
                  />
                  <Icon
                    size={20}
                    color={field.iconColor || '#999999'}
                    name={field.iconName || 'info-icon'}
                  />
                </View>
              );
            }}
          />
        );
      default:
        return null;
    }
  };

  const renderFrom = () => (
    <View style={tw.style('my-4')}>
      {fields.map(field => {
        return renderField(field, false);
      })}
    </View>
  );

  return {
    renderFrom,
    watch,
    formState,
    control,
    getValues,
    setValue,
    ...formReturn,
  };
};
