import React from 'react';
import {FieldConfig, FieldType, FormProps} from '../../types/formTypes';
import {Controller, useForm} from 'react-hook-form';
import {TextInput, TextInputSearch} from '../common';
import {View} from 'react-native';
import tw from 'twrnc';

export const useCustomForm = ({fields, defaultValues}: FormProps) => {
  const {control, watch, formState, getValues, setValue, ...formReturn} =
    useForm({
      defaultValues,
    });
  const {errors} = formState;

  const renderField = (field: FieldConfig, isRow: boolean) => {
    switch (field.type) {
      case FieldType.TextInput:
        return (
          <Controller
            key={field.label}
            {...field.controlProps}
            control={control}
            defaultValue=""
            render={({field: {onChange, onBlur, value, ref}}) => {
              return (
                <TextInput
                  keyboardType={field.keyboardType}
                  onChangeText={onChange}
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
      case FieldType.TextInputSearch:
        return (
          <Controller
            key={field.label}
            {...field.controlProps}
            control={control}
            defaultValue=""
            render={({field: {onChange, onBlur, value, ref}}) => {
              return (
                <TextInputSearch
                  keyboardType={field.keyboardType}
                  onChangeText={onChange}
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
