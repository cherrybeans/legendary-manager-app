import { SAVE_TOKEN } from 'actions/actionTypes';

export const saveTokenAction = payload => ({
  type: SAVE_TOKEN,
  payload: payload,
});
