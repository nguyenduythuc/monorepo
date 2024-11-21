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
  TextInputDisplayValidation,
  TextInputDatePicker,
} from '@lfvn-customer/shared/components/common';
import {View} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';
import { dropdownOptionProduct } from '../../types/components/dropdown';

export const useCustomForm = ({fields, defaultValues}: FormProps) => {
  const {control, watch, formState, getValues, setValue, ...formReturn} =
    useForm({
      defaultValues,
    });
  const {errors} = formState;

  const renderField = (field: FieldConfig) => {
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
                    errors[field.controlProps.name]?.message?.toString() ?? ''
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
                    errors[field.controlProps.name]?.message?.toString() ?? ''
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
            render={({field: {onChange, value}}) => {
              return (
                <SliderWithTextInput
                  color="red"
                  onChangeText={onChange}
                  onChangeSlider={onChange}
                  value={value}
                  maxValue={field.maxValue ?? 10}
                  minValue={field.minValue ?? 1}
                  step={field.step ?? 1}
                  unit={field.unit ?? 'unit'}
                  label={field.label}
                  defaultValue={field.defaultValue ?? ''}
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
            render={({field: {onChange, value}}) => {
              const listOption: dropdownOptionProduct[] = field.options && 'data' in field.options ? field.options.data as dropdownOptionProduct[] : field.options || [];
              return (
                <DropDownSelect
                  disabled={field.disabled}
                  defaultValue={
                    listOption.length > 0
                      ? listOption[0].productCode || listOption[0].code
                      : []
                  }
                  value={value}
                  required={!!field.controlProps.rules?.required}
                  label={field.label}
                  options={field.options ?? []}
                  onChange={onChange}
                  errorMessage={
                    errors[field.controlProps.name]?.message?.toString() ?? ''
                  }
                  placeholder={field.placeholder}
                  leftComponent={field.leftComponent}
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
            render={({field: {onChange, value}}) => {
              return (
                <View
                  style={tw`flex flex-row justify-between items-start mt-6 mr-4`}>
                  <Checkbox
                    label={field.label ?? ''}
                    description={field.description}
                    isChecked={value}
                    onChange={onChange}
                    color={field.checkboxColor}
                    required={!!field.controlProps.rules?.required}
                    errorMessage={
                      errors[field.controlProps.name]?.message?.toString() ?? ''
                    }
                  />
                  <Icon
                    size={20}
                    color={field.iconColor ?? '#999999'}
                    name={field.iconName ?? 'info-icon'}
                  />
                </View>
              );
            }}
          />
        );
      case FieldType.TextInputDisplayValidation:
        return (
          <Controller
            key={field.controlProps.name}
            {...field.controlProps}
            control={control}
            defaultValue=""
            render={({field: {onChange, onBlur, value, ref}}) => {
              return (
                <TextInputDisplayValidation
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
                  colorIcon={field.colorIcon}
                  validations={field.validations}
                />
              );
            }}
          />
        );

      case FieldType.TextInputDatePicker:
        return (
          <Controller
            key={field.label}
            {...field.controlProps}
            control={control}
            defaultValue={field.defaultValue}
            render={({field: {onChange, value}}) => {
              return (
                <TextInputDatePicker
                  keyboardType={field.keyboardType}
                  value={value}
                  onChangeValue={onChange}
                  label={field.label}
                  defaultValue={field.defaultValue ?? ''}
                />
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
        return renderField(field);
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
