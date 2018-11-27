import React from 'react';
import { View } from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements';

const TextField = ({
  name,
  label,
  onChangeText,
  onBlur,
  value,
  error,
  touched,
  hideInput,
  placeholder,
  noNextInputField,
  inputRef,
  onSubmitEditing,
  returnKeyType = 'done',
}) => {
  return (
    <View>
      <FormLabel>{label}</FormLabel>
      <FormInput
        secureTextEntry={hideInput}
        onChangeText={onChangeText}
        onBlur={onBlur}
        value={value}
        label={label}
        placeholder={placeholder}
        returnKeyType={noNextInputField ? returnKeyType : 'next'}
        ref={inputRef}
        onSubmitEditing={onSubmitEditing}
        blurOnSubmit={false}
      />
      {error && touched && (
        <FormValidationMessage id={`feedback ${name}`}>
          {error}
        </FormValidationMessage>
      )}
    </View>
  );
};

export default TextField;
