import React from 'react';
import { withNavigation } from 'react-navigation';
import moment from 'moment';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';

import TaskItem from 'components/TaskItem';
import { TOGGLE_TODO_COMPLETED } from 'queries/tasks';

const TaskItemContainer = ({
  id,
  description,
  dueDate,
  reminder,
  completed,
  navigation,
  token,
}) => {
  return (
    <Mutation
      mutation={TOGGLE_TODO_COMPLETED}
      notifyOnNetworkStatusChange={true}
      context={{
        headers: {
          authorization: token,
        },
      }}
    >
      {(toggleToDoCompleted, { data }) => {
        return (
          <TaskItem
            onEdit={() => navigation.navigate('EditTask', { id: id })}
            toggleCompleted={() =>
              toggleToDoCompleted({ variables: { input: { id } } })
            }
            dueTime={dueDate && moment(dueDate).format('HH:mm')}
            dueDay={dueDate && moment(dueDate).format('D. MMM')}
            description={description}
            hasReminder={!!reminder}
            isCompleted={completed}
          />
        );
      }}
    </Mutation>
  );
};

const mapStateToProps = state => {
  return {
    token: state.auth.token,
  };
};

export default connect(mapStateToProps)(withNavigation(TaskItemContainer));
