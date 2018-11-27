import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Text,
} from 'react-native';
import { LinearGradient } from 'expo';
import { FONTS } from 'constants';
const height = Dimensions.get('window').height;

class LandingScreen extends React.Component {
  // Render any loading content that you like here
  render() {
    return (
      <ImageBackground
        source={require('assets/images/christmas-dog.jpg')}
        style={{ width: '100%', height: '100%' }}
      >
        <LinearGradient
          colors={['rgba(0, 20, 65, 0.4)', 'transparent']}
          start={[1, 1]}
          end={[0, 0]}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height,
          }}
        />
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.title}>The Legendary Manager</Text>
            <Text style={styles.subtitle}>Sign up or login to get started</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              title="Sign Up"
              style={{ marginRight: 20 }}
              onPress={() => this.props.navigation.navigate('SignUp')}
            />
            <Button
              title="Log In"
              onPress={() => this.props.navigation.navigate('SignIn')}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}

export default LandingScreen;

const Button = ({ title, onPress, style }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 50,
  },
  header: { paddingTop: 320, paddingHorizontal: 20 },
  buttonsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  title: {
    fontFamily: FONTS.LIBRE,
    fontSize: 40,
    color: 'white',
  },
  subtitle: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 17,
    color: 'white',
    fontFamily: FONTS.BODY,
  },
  button: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 40,
    width: 130,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontFamily: FONTS.BODY,
  },
});
