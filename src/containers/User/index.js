import React from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

import { GET_USER_PROFILE } from 'queries/user';
import { FONTS } from 'constants';

const User = ({ token }) => {
  return (
    <Query
      query={GET_USER_PROFILE}
      notifyOnNetworkStatusChange={true}
      pollInterval={1000}
      context={{
        headers: {
          authorization: token,
        },
      }}
    >
      {({ loading, error, data }) => {
        if (loading) return <ActivityIndicator />;

        if (error)
          return (
            <Text style={{ paddingTop: 20, textAlign: 'center' }}>
              Could not fetch your user profile at this time :( Maybe logging in
              again fixes it?
            </Text>
          );

        return (
          <View style={{ padding: 20 }}>
            <Text style={{ fontFamily: FONTS.BOLD }}>Your information</Text>
            <Text
              style={{
                fontFamily: FONTS.LIBRE,
                fontSize: 30,
                marginVertical: 10,
              }}
            >
              {data.me.name}
            </Text>
            <Text style={{ fontFamily: FONTS.BODY }}>{data.me.email}</Text>
            <Text style={{ marginTop: 10, fontFamily: FONTS.BODY }}>
              You have {data.me.countTodos} todos in total
            </Text>
          </View>
        );
      }}
    </Query>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(User);
