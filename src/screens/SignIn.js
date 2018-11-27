import React, { Component } from 'react';
import { View, Keyboard, Text, AsyncStorage } from 'react-native';
import { Mutation } from 'react-apollo';
import { Card, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as Yup from 'yup';

import TextField from 'components/Form/TextField';
import { COLORS, USER_TOKEN } from 'constants';
import { SIGN_IN } from 'queries/auth';

class SignInForm extends Component {
  render() {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={140}>
        <Card>
          <Formik
            validationSchema={validationSchema}
            initialValues={{}}
            onSubmit={values => {
              this.props.onSubmit(values);
            }}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              touched,
              isValid,
              setFieldTouched,
            }) => {
              return (
                <View>
                  <TextField
                    name="email"
                    label="E-mail"
                    placeholder="E-mail ..."
                    onChangeText={handleChange('email')}
                    value={values.email}
                    error={errors.email}
                    touched={touched.email}
                    onBlur={() => setFieldTouched('email')}
                  />

                  <TextField
                    name="password"
                    label="Password"
                    placeholder="Password ..."
                    onChangeText={handleChange('password')}
                    value={values.password}
                    error={errors.password}
                    touched={touched.password}
                    onBlur={() => setFieldTouched('password')}
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

                  <Button
                    backgroundColor="transparent"
                    color={COLORS.BLUE}
                    title="Don't have a user? Sign up instead"
                    onPress={() => this.props.navigation.navigate('SignUp')}
                  />
                </View>
              );
            }}
          </Formik>
        </Card>
      </KeyboardAwareScrollView>
    );
  }
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('Please enter an email')
    .email("Well, that's not an email"),
  password: Yup.string().required('Enter a password'),
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
                navigation={this.props.navigation}
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
