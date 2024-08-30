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
} from '@lfvn-customer/shared/components/common';
import {View} from 'react-native';
import tw from '@lfvn-customer/shared/themes/tailwind';

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
                  max_value={field.maxValue ?? 10}
                  min_value={field.minValue ?? 1}
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
              return (
                <DropDownSelect
                  disabled={field.disabled}
                  defaultValue={
                    field.options && field.options.length > 0
                      ? field.options[0].productCode || field.options[0].code
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
                  style={tw`flex flex-row justify-between items-start mt-6`}>
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
