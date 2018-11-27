import React, { Component } from 'react';
import {
  View,
  AsyncStorage,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Card, Button, Text } from 'react-native-elements';
import { Query } from 'react-apollo';
import Image from 'react-native-scalable-image';
import { GET_USER_PROFILE } from 'queries/user';

const { width, height } = Dimensions.get('window');

class Profile extends Component {
  state = {
    fetched: false,
    name: '',
    email: '',
    isAdmin: false,
  };

  render() {
    return (
      <Query query={GET_USER_PROFILE} notifyOnNetworkStatusChange={true}>
        {({ loading, error, data }) => {
          return (
            <View>
              <Image
                width={width}
                source={require('assets/images/snowymountain.jpg')}
              />

              {this.state.fetched && <Text h1>Your</Text>}
              {error && (
                <Text style={{ paddingTop: 20, textAlign: 'center' }}>
                  Could not fetch your user profile at this time :( Maybe
                  logging in again fixes it?
                </Text>
              )}
              <Button
                buttonStyle={{ marginTop: 20 }}
                backgroundColor="#03A9F4"
                title="SIGN OUT"
                onPress={this._signOutAsync}
              />
              {loading && <ActivityIndicator />}
            </View>
          );
        }}
      </Query>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

export default Profile;
export { Profile };
