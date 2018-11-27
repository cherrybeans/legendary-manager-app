import React, { Component } from 'react';
import {
  View,
  Text,
  Keyboard,
  Alert,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import { Card, Button, FormLabel, FormInput } from 'react-native-elements';
import { SIGN_IN } from 'queries/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';

const renderEmailInput = ({ input: { onChange, ...restInput } }) => {
  return (
    <FormInput
      placeholder="Email address..."
      onChangeText={onChange}
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

class SignIn extends Component {
  static navigationOptions = {
    title: 'Please sign in',
  };

  render() {
    console.log(this.props);
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card>
          <Formik
            validationSchema={validationSchema}
            initialValues={{ firstName: '' }}
            onSubmit={values => {
              Alert.alert(JSON.stringify(values, null, 2));
              Keyboard.dismiss();
            }}
          >
            {({ handleChange, handleSubmit, values, errors }) => (
              <View>
                <FormInput
                  onChangeText={handleChange('firstName')}
                  value={values.firstName}
                  label="First name"
                  placeholder="I am ready!"
                />
                {errors.firstName && (
                  <Text id="feedback">{errors.firstName}</Text>
                )}

                <Button onPress={handleSubmit}>Submit</Button>
              </View>
            )}
          </Formik>
        </Card>
      </View>
    );
  }

  _signInAsync = async values => {
    console.log('submitting form', values);

    // await AsyncStorage.setItem('userToken', 'abc');
    // this.props.navigation.navigate('App');
  };
}

{
  /* <FormLabel>Email</FormLabel>
<Field name="email" component={renderEmailInput} type="text" />

<FormLabel>Password</FormLabel>
<Field name="password" component={renderPasswordInput} type="text" />

<Button
  buttonStyle={{ marginTop: 20 }}
  backgroundColor="#03A9F4"
  title="Sign in"
  onPress={this.props.handleSubmit(this._signInAsync)}
/> */
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('please! email?')
    .email("well that's not an email"),
});

export default SignIn;
