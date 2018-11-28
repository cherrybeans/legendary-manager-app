import gql from 'graphql-tag';

export const GET_USER_PROFILE = gql`
  query UserProfile {
    me {
      name
      email
      isAdmin
      countTodos
    }
  }
`;

export const GET_TASKS = gql`
  query TODOS($priority: Priority) {
    todos(priority: $priority) {
      id
      description
      completed
      reminder
      dueDate
    }
  }
`;
