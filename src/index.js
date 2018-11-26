import React from 'react';
import AppContainer from 'navigation/AppNavigator';

// Imports for using graphql through Apollo
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <AppContainer />
      </ApolloProvider>
    );
  }
}
