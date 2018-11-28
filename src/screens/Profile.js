import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { Query } from 'react-apollo';
import Image from 'react-native-scalable-image';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearTokenAction } from 'actions/auth';

import User from 'containers/User';
import { FONTS } from 'constants';
const width = Dimensions.get('window').width;

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
          onPress={this._signOut}
        />
      </View>
    );
  }

  _signOut = () => {
    this.props.clearTokenAction();
    this.props.navigation.navigate('Auth');
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ clearTokenAction }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps,
)(Profile);
