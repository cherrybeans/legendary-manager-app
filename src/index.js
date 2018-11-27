import React from 'react';
import AppContainer from 'navigation/AppNavigator';
import { AppLoading } from 'expo';
import cacheAssetsAsync from 'utils/cacheAssetsAsync';
import { AsyncStorage } from 'react-native';

//Imports for Redux
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Imports for using graphql through Apollo
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { USER_TOKEN } from 'constants';
import { loadDataAsync } from 'utils/AsyncStorage';

export default class App extends React.Component {
  state = {
    appIsReady: false,
    client: null,
    clientIsReady: false,
  };

  async componentDidMount() {
    this._loadAssetsAsync();

    const token = await AsyncStorage.getItem(USER_TOKEN);
    console.log('token', token);

    this.setState(
      {
        client: new ApolloClient({
          // 10.0.2.2 due to the android emulator though Android Studio!
          uri: 'http://10.0.2.2:4000/graphql',
          headers: {
            authorization: token,
          },
        }),
      },
      this.setState({ clientIsReady: true }),
    );
  }

  async _loadAssetsAsync() {
    try {
      await cacheAssetsAsync({
        fonts: [
          {
            'open-sans': require('assets/fonts/OpenSans-Regular.ttf'),
            'open-sans-bold': require('assets/fonts/OpenSans-Bold.ttf'),
            'open-sans-italic': require('assets/fonts/OpenSans-Italic.ttf'),
            'libre-baskerville': require('assets/fonts/LibreBaskerville-Regular.ttf'),
          },
        ],
      });
    } catch (e) {
      console.warn(
        'There was an error caching assets (see: main.js), perhaps due to a ' +
          'network timeout, so we skipped caching. Reload the app to try again.',
      );
      console.log(e.message);
    } finally {
      this.setState({ appIsReady: true });
    }
  }

  render() {
    if (this.state.appIsReady && this.state.clientIsReady) {
      return (
        <ApolloProvider client={this.state.client}>
          <Provider store={store}>
            <AppContainer />
          </Provider>
        </ApolloProvider>
      );
    } else {
      return <AppLoading />;
    }
  }
}
