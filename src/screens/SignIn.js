import React, { Component } from 'react';
import { View, Keyboard, Text, AsyncStorage } from 'react-native';
import { Mutation } from 'react-apollo';
import { Card, Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';

import TextField from 'components/Form/TextField';
import { COLORS } from 'constants/colors';
import { USER_TOKEN } from 'constants/storage';
import { SIGN_IN } from 'queries/auth';

class SignInForm extends Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card>
          <Formik
            validationSchema={validationSchema}
            initialValues={{
              email: 'hea@horse.com',
              password: 'hesterbest123',
            }}
            onSubmit={values => {
              this.props.onSubmit(values);
            }}
          >
            {({ handleChange, handleSubmit, values, errors, isValid }) => {
              return (
                <View>
                  <TextField
                    name="email"
                    label="E-mail"
                    placeholder="E-mail ..."
                    onChangeText={handleChange('email')}
                    value={values.email}
                    error={errors.email}
                  />

                  <TextField
                    name="password"
                    label="Password"
                    placeholder="Password ..."
                    onChangeText={handleChange('password')}
                    value={values.password}
                    error={errors.password}
                    hideInput
                  />

                  {this.props.error && <Text>{this.props.error}</Text>}

                  <Button
                    buttonStyle={{
                      marginTop: 20,
                      backgroundColor: COLORS.BLUE,
                    }}
                    loading={this.props.loading}
                    disabledStyle={{ backgroundColor: 'gray' }}
                    title="Sign in"
                    disabled={!isValid}
                    onPress={handleSubmit}
                  />
                </View>
              );
            }}
          </Formik>
        </Card>
      </View>
    );
  }
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter an email')
    .email("Well, that's not an email"),
  password: Yup.string()
    .required('Enter a password')
    .min(6, 'Definitely getting hacked ..'),
});

class SignIn extends Component {
  state = { error: null };

  render() {
    return (
      <Mutation mutation={SIGN_IN}>
        {(login, { loading, error, data }) => {
          return (
            <View>
              <SignInForm
                loading={loading}
                error={this.state.error}
                onSubmit={async values => {
                  login({
                    variables: {
                      input: { email: values.email, password: values.password },
                    },
                  })
                    .then(async res => {
                      await AsyncStorage.setItem(
                        USER_TOKEN,
                        res.data.login.token,
                      );
                      this.props.navigation.navigate('App');
                    })
                    .catch(res => {
                      const errors = res.graphQLErrors.map(
                        error => error.message,
                      );
                      this.setState({ error: errors[0] });
                    });
                  Keyboard.dismiss();
                }}
              />
            </View>
          );
        }}
      </Mutation>
    );
  }
}

export default SignIn;
export { SignIn };
