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
import { FONTS, USER_TOKEN } from 'constants';
const { width, height } = Dimensions.get('window');

class Profile extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View>
          <Image
            width={width}
            source={require('assets/images/snowymountain.jpg')}
          />
          <User />
        </View>

        <Button
          buttonStyle={{ marginVertical: 20 }}
          backgroundColor="#03A9F4"
          textStyle={{ fontFamily: FONTS.BODY }}
          title="Sign out"
          onPress={this._signOutAsync}
        />
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    console.log(
      'token after clearing ',
      await AsyncStorage.getItem(USER_TOKEN),
    );

    this.props.navigation.navigate('Auth');
  };
}

export default Profile;
export { Profile };

const User = () => {
  return (
    <Query
      query={GET_USER_PROFILE}
      notifyOnNetworkStatusChange={true}
      pollInterval={1000}
    >
      {({ loading, error, data }) => {
        if (loading) return <ActivityIndicator />;

        if (error)
          return (
            <Text style={{ paddingTop: 20, textAlign: 'center' }}>
              Could not fetch your user profile at this time :( Maybe logging in
              again fixes it?
            </Text>
          );

        return (
          <View style={{ padding: 20 }}>
            <Text style={{ fontFamily: FONTS.BOLD }}>Your information</Text>
            <Text
              style={{
                fontFamily: FONTS.LIBRE,
                fontSize: 30,
                marginVertical: 10,
              }}
            >
              {data.me.name}
            </Text>
            <Text style={{ fontFamily: FONTS.BODY }}>{data.me.email}</Text>
            <Text style={{ marginTop: 10, fontFamily: FONTS.BODY }}>
              You have {data.me.countTodos} todos in total
            </Text>
          </View>
        );
      }}
    </Query>
  );
};
