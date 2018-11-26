import React from 'react';
import { Platform, StatusBar } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';
import { FontAwesome } from 'react-native-vector-icons';

import SignUp from 'screens/SignUp';
import SignIn from 'screens/SignIn';
import Home from 'screens/Home';
import Profile from 'screens/Profile';
import AuthLoadingScreen from 'screens/AuthLoadingScreen';

const headerStyle = {
  marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
};

export const AuthStack = createStackNavigator({
  SignUp: {
    screen: SignUp,
    navigationOptions: {
      title: 'Sign Up',
      headerStyle,
    },
  },
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: 'Sign In',
      headerStyle,
    },
  },
});

export const AppStack = createBottomTabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="home" size={30} color={tintColor} />
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="user" size={30} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
      },
    },
  },
);

const AppNav = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

export default AppNav;
