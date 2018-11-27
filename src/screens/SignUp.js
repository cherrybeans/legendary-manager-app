import React, { Component } from 'react';
import { View, Keyboard, Text, AsyncStorage } from 'react-native';
import { Mutation } from 'react-apollo';
import { Card, Button } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';

import TextField from 'components/Form/TextField';
import { COLORS, USER_TOKEN } from 'constants';
import { SIGN_UP } from 'queries/auth';

class SignUpForm extends Component {
  render() {
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card>
          <Formik
            validationSchema={validationSchema}
            onSubmit={values => {
              this.props.onSubmit(values);
            }}
          >
            {({ handleChange, handleSubmit, values, errors, isValid }) => {
              return (
                <View>
                  <TextField
                    name="name"
                    label="Name"
                    placeholder="e.g. Kari Nordmann "
                    onChangeText={handleChange('name')}
                    value={values.name}
                    error={errors.name}
                  />

                  <TextField
                    name="email"
                    label="E-mail"
                    placeholder="e.g. example@example.com"
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

                  <TextField
                    name="passwordConfirm"
                    label="Repeat password"
                    placeholder="Password ..."
                    onChangeText={handleChange('passwordConfirm')}
                    value={values.passwordConfirm}
                    error={errors.passwordConfirm}
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
                    title="Sign up"
                    disabled={!isValid}
                    onPress={handleSubmit}
                  />

                  <Button
                    backgroundColor="transparent"
                    color={COLORS.BLUE}
                    title="Already have a user? Log In"
                    onPress={() => this.props.navigation.navigate('SignIn')}
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
  name: Yup.string().required('What should we call you?'),
  email: Yup.string()
    .required('Please enter an email')
    .email("Well, that's not an email"),
  password: Yup.string()
    .required('Enter a password')
    .min(6, 'Definitely getting hacked ..'),
  passwordConfirm: Yup.string()
    .required('Enter a password')
    .min(6, 'Definitely getting hacked ..'),
});

class SignUp extends Component {
  state = { error: null };

  render() {
    return (
      <Mutation mutation={SIGN_UP}>
        {(signup, { loading, error, data }) => {
          return (
            <View>
              <SignUpForm
                loading={loading}
                error={this.state.error}
                navigation={this.props.navigation}
                onSubmit={async values => {
                  signup({
                    variables: {
                      input: {
                        name: values.name,
                        email: values.email,
                        password: values.password,
                      },
                    },
                  })
                    .then(async res => {
                      await AsyncStorage.setItem(
                        USER_TOKEN,
                        res.data.signup.token,
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

export default SignUp;
export { SignUp };
