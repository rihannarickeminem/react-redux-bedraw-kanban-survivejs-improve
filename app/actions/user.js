import uuid from 'node-uuid';
import request from 'axios';

const log = console.log;

function makeUserRequest(method, data, api = '/') {
    return request[method](`http://108.168.180.148/userconfig/${api}`, data);
}

export const BEGIN_GET_USER = 'BEGIN_GET_USER';
export function beginFetch() {
	return { type: BEGIN_GET_USER };
}

export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export function successFetch(data) {
  log('successFetch ', data);
		return {
			type: GET_USER_SUCCESS,
			data: data,
      message: {status: 'SUCCESS'}
		};
}

export const GET_USER_ERROR = 'GET_USER_ERROR';
export function fetchUserError(err) {
		return {
			type: GET_USER_ERROR,
			message: {
        text: err,
        status: 'ERROR'
      }
		};
}

export const GET_USER = 'GET_USER';
export function fetchUser(data) {
  return dispatch => {
    let id = data.id
    dispatch(beginFetch());

    return makeUserRequest('get', {}, `${id}`)
      .then(response => {
        if (response.status === 200) {
          dispatch(successFetch(response.data));
        } else {
          dispatch(fetchUserError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(fetchUserError(err.response.data.error));
      });
  };
};

export const UPDATE_USER = 'UPDATE_USER';
// export function updateNote(updatedNote) {
//   return {
//     type: UPDATE_NOTE,
//     ...updatedNote
//   };
// };

export const DELETE_USER = 'DELETE_USER';
// export function deleteNote(id) {
//   return {
//     type: DELETE_NOTE,
//     id
//   };
// };
