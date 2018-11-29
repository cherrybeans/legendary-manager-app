import React, { Component } from 'react';
import {
  View,
  Dimensions,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

import TaskItem from 'containers/TaskItemContainer';
import { GET_TASKS } from 'queries/tasks';
import { FONTS, USER_TOKEN } from 'constants';

class TasksByPriority extends Component {
  state = {
    showCompleted: false,
  };

  toggleShowCompleted = () => {
    this.setState(state => ({ showCompleted: !state.showCompleted }));
  };

  render() {
    const { priority, token } = this.props;

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
            <View style={{ padding: 10 }}>
              {data.todos
                .filter(({ completed }) => !completed)
                .map(({ id, description, completed, reminder, dueDate }, i) => (
                  <TaskItem
                    key={i}
                    id={id}
                    description={description}
                    completed={completed}
                    reminder={reminder}
                    dueDate={dueDate}
                  />
                ))}
              <TouchableOpacity
                onPress={this.toggleShowCompleted}
                activeOpacity={0.6}
                style={{ alignItems: 'center', marginVertical: 5 }}
              >
                <Text style={{ color: 'gray' }}>
                  {this.state.showCompleted ? 'Hide' : 'Show'} completed tasks
                </Text>
              </TouchableOpacity>
              {this.state.showCompleted &&
                data.todos
                  .filter(({ completed }) => completed)
                  .map(
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
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(TasksByPriority);
