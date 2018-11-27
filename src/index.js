import React from 'react';
import AppContainer from 'navigation/AppNavigator';

//Imports for Redux
import { Provider } from 'react-redux';
import { store } from './redux/store';

// Imports for using graphql through Apollo
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  // 10.0.2.2 due to the android emulator though Android Studio!
  uri: 'http://10.0.2.2:4000/graphql',
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <AppContainer />
        </Provider>
      </ApolloProvider>
    );
  }
}
