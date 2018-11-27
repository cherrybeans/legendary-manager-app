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
  value,
  error,
  hideInput,
  placeholder,
}) => {
  return (
    <View>
      <FormLabel>{label}</FormLabel>
      <FormInput
        secureTextEntry={hideInput}
        onChangeText={onChangeText}
        value={value}
        label={label}
        placeholder={placeholder}
      />
      {error && (
        <FormValidationMessage id={`feedback ${name}`}>
          {error}
        </FormValidationMessage>
      )}
    </View>
  );
};

export default TextField;
