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
