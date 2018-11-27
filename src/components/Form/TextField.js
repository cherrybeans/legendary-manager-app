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
  console.log(error);
  return (
    <View style={{ paddingVertical: 20 }}>
      <FormLabel>{label}</FormLabel>
      <FormInput
        secureTextEntry={hideInput}
        onChangeText={onChangeText}
        value={value}
        label={label}
        placeholder={placeholder}
      />
      {error && (
        <FormValidationMessage id="feedback">{error}</FormValidationMessage>
      )}
    </View>
  );
};

export default TextField;
