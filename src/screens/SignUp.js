import React, { Component } from 'react';
import { View, Keyboard, Text } from 'react-native';
import { Mutation } from 'react-apollo';
import { Card, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { equalTo } from 'utils/validation';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveTokenAction } from 'actions/auth';

import TextField from 'components/Form/TextField';
import { COLORS } from 'constants';
import { SIGN_UP } from 'queries/auth';

class SignUpForm extends Component {
  render() {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true} extraHeight={140}>
        <Card>
          <Formik
            validationSchema={validationSchema}
            onSubmit={values => {
              this.props.onSubmit(values);
            }}
          >
            {({
              handleChange,
              handleSubmit,
              values,
              errors,
              isValid,
              touched,
              setFieldTouched,
            }) => {
              return (
                <View>
                  <TextField
                    name="name"
                    label="Name"
                    placeholder="e.g. Kari Nordmann "
                    onChangeText={handleChange('name')}
                    value={values.name}
                    error={errors.name}
                    touched={touched.name}
                    onBlur={() => setFieldTouched('name')}
                    onSubmitEditing={() => this.email.focus()}
                  />

                  <TextField
                    name="email"
                    label="E-mail"
                    placeholder="e.g. example@example.com"
                    onChangeText={handleChange('email')}
                    value={values.email}
                    error={errors.email}
                    touched={touched.email}
                    onBlur={() => setFieldTouched('email')}
                    inputRef={ref => (this.email = ref)}
                    onSubmitEditing={() => this.password.focus()}
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
                    inputRef={ref => (this.password = ref)}
                    onSubmitEditing={() => this.passwordConfirm.focus()}
                    hideInput
                  />
                  <TextField
                    name="passwordConfirm"
                    label="Repeat password"
                    placeholder="Password ..."
                    onChangeText={handleChange('passwordConfirm')}
                    value={values.passwordConfirm}
                    error={errors.passwordConfirm}
                    touched={touched.passwordConfirm}
                    onBlur={() => setFieldTouched('passwordConfirm')}
                    inputRef={ref => (this.passwordConfirm = ref)}
                    onSubmitEditing={() => Keyboard.dismiss()}
                    noNextInputField
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
      </KeyboardAwareScrollView>
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
    .equalTo(Yup.ref('password'), 'Passwords must match')
    .required('Required'),
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
                        email: values.email.toLowerCase(),
                        password: values.password,
                      },
                    },
                  })
                    .then(res => {
                      this.props.saveTokenAction(res.data.login.token);
                      this.props.navigation.navigate('Main');
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ saveTokenAction }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps,
)(SignUp);
