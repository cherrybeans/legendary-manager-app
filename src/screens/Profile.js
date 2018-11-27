import React, { Component } from 'react';
import { View, AsyncStorage } from 'react-native';
import { Card, Button, Text } from 'react-native-elements';

class Profile extends Component {
  static navigationOptions = {
    title: 'Profile',
  };

  render() {
    return (
      <View style={{ paddingVertical: 20 }}>
        <Card title="John Doe">
          <View
            style={{
              backgroundColor: '#bcbec1',
              alignItems: 'center',
              justifyContent: 'center',
              width: 80,
              height: 80,
              borderRadius: 40,
              alignSelf: 'center',
              marginBottom: 20,
            }}
          >
            <Text style={{ color: 'white', fontSize: 28 }}>JD</Text>
          </View>
          <Button
            backgroundColor="#03A9F4"
            title="SIGN OUT"
            onPress={this._signOutAsync}
          />
        </Card>
      </View>
    );
  }

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
}

export default Profile;
export { Profile };
