import { combineReducers } from 'redux';
import * as types from '../actions/user';

const userInitialState = {
  userId: 'default',
  message: {
    text: undefined,
    status: undefined
  },
  info: undefined,
};

export default function user(state = userInitialState, action) {

  switch (action.type) {
    case types.BEGIN_GET_USER:
      return state

    case types.GET_USER:
      return {
        'userId': action.id,
        'message': {}
      }

    case types.GET_USER_SUCCESS:
      return {
        'userId': action.data.userId ,
        'message': {
          text: 'Request user info success',
          status: action.message.status
        }
      }

    case types.GET_USER_ERROR:
      return {
        message: action.message
      }

    default:
      return state;
  }
}
