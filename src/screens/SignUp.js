import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import { Field, reduxForm } from 'redux-form';

import { SIGN_UP } from 'queries/auth';

class SignUp extends Component {
  static navigationOptions = {
    title: 'Please sign up',
  };

  render() {
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card>
          <FormLabel>Email</FormLabel>
          <Field name="email" component={renderEmailInput} />

          <FormLabel>Password</FormLabel>
          <Field name="password" component={renderPasswordInput} />

          <FormLabel>Confirm Password</FormLabel>
          <Field name="password" component={renderPasswordInput} />

          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="#03A9F4"
            title="SIGN UP"
            onPress={this._signUpAsync}
          />
          <Button
            buttonStyle={{ marginTop: 20 }}
            backgroundColor="transparent"
            textStyle={{ color: '#bcbec1' }}
            title="Sign In"
            onPress={() => this.props.navigation.navigate('SignIn')}
          />
        </Card>
      </View>
    );
  }

  _signUpAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

const renderEmailInput = ({ input: { onChange, ...restInput } }) => {
  console.log('email', restInput);
  return (
    <FormInput
      placeholder="Email address..."
      onChangeText={onChange}
      keyboardType="email-address"
      {...restInput}
    />
  );
};

const renderPasswordInput = ({ input: { onChange, ...restInput } }) => {
  return (
    <FormInput
      secureTextEntry
      placeholder="Password..."
      onChangeText={onChange}
      {...restInput}
    />
  );
};

export default reduxForm({
  form: 'signup',
})(SignUp);
