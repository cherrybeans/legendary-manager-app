import React from 'react';
import { StatusBar, StyleSheet, View, Button } from 'react-native';

class LandingScreen extends React.Component {
  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="default" />
        <Button
          backgroundColor="#03A9F4"
          title="Sign Up"
          onPress={() => this.props.navigation.navigate('SignUp')}
        />
        <Button
          backgroundColor="#03A9F4"
          title="Log In"
          onPress={() => this.props.navigation.navigate('SignIn')}
        />
      </View>
    );
  }
}

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
