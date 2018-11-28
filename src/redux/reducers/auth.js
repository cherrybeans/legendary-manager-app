import { AUTH_SET_TOKEN, AUTH_DISCARD_TOKEN } from '../actionTypes';

export const auth = (state = {}, action) => {
  switch (action.type) {
    // saves the token into the state
    case AUTH_SET_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    // discards the current token (logout)
    case AUTH_DISCARD_TOKEN:
      return {};
    // as always, on default do nothing
    default:
      return state;
  }
};
