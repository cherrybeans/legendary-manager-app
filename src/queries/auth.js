import gql from 'graphql-tag';

export const SIGN_UP = gql`
  mutation SignUp($input: SignupInput!) {
    signup(input: $input) {
      token
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($input: LoginInput!) {
    login(input: $input) {
      token
    }
  }
`;
