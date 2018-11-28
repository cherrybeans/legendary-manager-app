import { AUTH_SET_TOKEN, AUTH_DISCARD_TOKEN } from '../actionTypes';

export const saveTokenAction = payload => ({
  type: AUTH_SET_TOKEN,
  payload: payload,
});

export const clearTokenAction = () => ({
  type: AUTH_DISCARD_TOKEN,
});
