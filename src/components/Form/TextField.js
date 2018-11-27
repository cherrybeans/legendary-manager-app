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
