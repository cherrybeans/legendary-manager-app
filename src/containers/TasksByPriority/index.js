import React from 'react';
import { View, Dimensions, ActivityIndicator, Text } from 'react-native';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

import TaskItem from 'containers/TaskItemContainer';
import { GET_TASKS } from 'queries/tasks';
import { FONTS, USER_TOKEN } from 'constants';

const TasksByPriority = ({ priority, token }) => {
  return (
    <Query
      query={GET_TASKS}
      variables={{
        priority,
      }}
      notifyOnNetworkStatusChange={true}
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
              Could not fetch your tasks at this moment :( Please try again
              later.
            </Text>
          );

        return (
          <View style={{ padding: 20 }}>
            {data.todos.map(
              ({ id, description, completed, reminder, dueDate }, i) => (
                <TaskItem
                  key={i}
                  id={id}
                  description={description}
                  completed={completed}
                  reminder={reminder}
                  dueDate={dueDate}
                />
              ),
            )}
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

export default connect(mapStateToProps)(TasksByPriority);
