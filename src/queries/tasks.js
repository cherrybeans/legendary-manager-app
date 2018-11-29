import gql from 'graphql-tag';

export const GET_TASKS = gql`
  query Todos($priority: Priority) {
    todos(priority: $priority) {
      id
      description
      completed
      reminder
      dueDate
    }
  }
`;

export const TOGGLE_TODO_COMPLETED = gql`
  mutation ToggleToDoCompleted($input: ToggleToDoCompletedInput!) {
    toggleToDoCompleted(input: $input) {
      todo {
        id
        completed
      }
    }
  }
`;
