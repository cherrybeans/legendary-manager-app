import React from 'react';
import { Platform, StatusBar } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';

import SignUp from 'screens/SignUp';
import SignIn from 'screens/SignIn';
import Home from 'screens/Home';
import Profile from 'screens/Profile';
import AuthLoadingScreen from 'screens/AuthLoadingScreen';
import LandingScreen from 'screens/LandingScreen';
import CreateTask from 'screens/CreateTask';
import EditTask from 'screens/EditTask';
import TabIcon from 'components/TabIcon';
import { COLORS } from 'constants';

const headerStyle = {
  marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
};

export const AuthStack = createStackNavigator({
  LandingScreen: {
    screen: LandingScreen,
    navigationOptions: {
      title: 'Welcome!',
      header: null,
    },
  },
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

export const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: ({ tintColor }) => (
        <TabIcon label="Home" icon="home" size={30} color={tintColor} />
      ),
      header: null,
    },
  },
  CreateTask: {
    screen: CreateTask,
    navigationOptions: {
      title: 'Create a new task',
      headerStyle,
    },
  },
  EditTask: {
    screen: EditTask,
    navigationOptions: {
      title: 'Edit a task',
      headerStyle,
    },
  },
});

export const MainTabBarNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <TabIcon label="Home" icon="home" size={30} color={tintColor} />
        ),
      },
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
          <TabIcon label="Profile" icon="user" size={30} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      style: {
        height: 60,
        alignItems: 'center',
      },
      showLabel: false,
      activeTintColor: COLORS.BLUE, // active icon color
    },
  },
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      Main: MainTabBarNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);

export default AppContainer;
