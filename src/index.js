import React from 'react';
import AppContainer from 'navigation/AppNavigator';
import { AppLoading } from 'expo';
import cacheAssetsAsync from 'utils/cacheAssetsAsync';

//Imports for Redux
import { Provider } from 'react-redux';
import { store, persistor } from './redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react';

// Imports for using graphql through Apollo
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { USER_TOKEN } from 'constants';

const client = new ApolloClient({
  // 10.0.2.2 due to the android emulator though Android Studio!
  uri: 'http://10.0.2.2:4000/graphql',
});

export default class App extends React.Component {
  state = {
    appIsReady: false,
  };

  async componentDidMount() {
    this._loadAssetsAsync();
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
            'libre-baskerville-bold': require('assets/fonts/LibreBaskerville-Bold.ttf'),
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
    if (this.state.appIsReady) {
      return (
        <ApolloProvider client={client}>
          <Provider store={store}>
            <PersistGate loading={<AppLoading />} persistor={persistor}>
              <AppContainer />
            </PersistGate>
          </Provider>
        </ApolloProvider>
      );
    } else {
      return <AppLoading />;
    }
  }
}
