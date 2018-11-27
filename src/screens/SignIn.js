import React, { Component } from 'react';
import {
  View,
  Keyboard,
  Alert,
  AsyncStorage,
  TouchableOpacity,
} from 'react-native';
import { Card, Button } from 'react-native-elements';
import { SIGN_IN } from 'queries/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { COLORS } from 'constants/colors';
import TextField from 'components/Form/TextField';

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
            initialValues={{ email: 'sig@gmail.com' }}
            onSubmit={values => {
              this._signInAsync();
              Alert.alert(JSON.stringify(values, null, 2));
              Keyboard.dismiss();
            }}
          >
            {({ handleChange, handleSubmit, values, errors, isValid }) => {
              console.log('isva', isValid);
              console.log('values', values);
              console.log('errors', errors);
              console.log();
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
                  <Button
                    buttonStyle={{
                      marginTop: 20,
                      backgroundColor: COLORS.BLUE,
                    }}
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

  _signInAsync = async values => {
    console.log('submitting form', values);

    // await AsyncStorage.setItem('userToken', 'abc');
    // this.props.navigation.navigate('App');
  };
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required('please! email?')
    .email("well that's not an email"),
});

export default SignIn;
