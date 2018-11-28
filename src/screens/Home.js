import React, { Component } from 'react';
import {
  View,
  AsyncStorage,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Card, Button, Text } from 'react-native-elements';
import { Query } from 'react-apollo';
import Image from 'react-native-scalable-image';
import { GET_TASKS } from 'queries/user';
import { FONTS, CATEGORY_COLORS, USER_TOKEN } from 'constants';
const { width, height } = Dimensions.get('window');

class Home extends Component {
  async componentDidMount() {
    console.log('home tooken now', await AsyncStorage.getItem(USER_TOKEN));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Tasks</Text>

        <Text style={{ color: CATEGORY_COLORS.default['IMPORTANTURGENT'] }}>
          Important & Urgent
        </Text>
        <TasksByPriority priority="IMPORTANTURGENT" />

        <Text style={{ color: CATEGORY_COLORS.default['NOTIMPORTANTURGENT'] }}>
          Not Important & Urgent
        </Text>
        <TasksByPriority priority="NOTIMPORTANTURGENT" />

        <Text style={{ color: CATEGORY_COLORS.default['IMPORTANTNOTURGENT'] }}>
          Important & Not Urgent
        </Text>
        <TasksByPriority priority="IMPORTANTNOTURGENT" />

        <Text
          style={{ color: CATEGORY_COLORS.default['NOTIMPORTANTNOTURGENT'] }}
        >
          Not Important & Not Urgent
        </Text>
        <TasksByPriority priority="NOTIMPORTANTNOTURGENT" />
      </View>
    );
  }
}

export default Home;
export { Home };

const TasksByPriority = ({ priority }) => {
  return (
    <Query
      query={GET_TASKS}
      variables={{
        priority,
      }}
      notifyOnNetworkStatusChange={true}
    >
      {({ loading, error, data }) => {
        if (loading) return <ActivityIndicator />;

        if (error)
          return (
            <Text style={{ paddingTop: 20, textAlign: 'center' }}>
              Could not fetch your tasks at this moment :( Please try again
              later.
            </Text>
          );

        return (
          <View style={{ padding: 20 }}>
            {data.todos.map(({ description, id }, i) => (
              <Text key={i} style={{ fontFamily: FONTS.BODY }}>
                {description} id: {id}
              </Text>
            ))}
          </View>
        );
      }}
    </Query>
  );
};
