
import { AWAIT_MARKER } from 'redux-await';
import { SubmissionError } from 'redux-form';
import { get } from 'lodash';

import apiClient from 'helpers/api-client';
import * as cx from './constants';

export function getUsers(payload) {
  return {
    type: cx.GET_USERS,
    AWAIT_MARKER,
    payload: {
      users: apiClient().get('/api/users', { params: { page: payload.page, filter: payload.filter } }),
    },
  };
}

export function getUser(payload) {
  return {
    type: cx.GET_USER,
    AWAIT_MARKER,
    payload: {
      user: apiClient().get(`/api/users/${payload.id}`),
    },
  };
}

export const createUserPromise = payload => dispatch => (
  apiClient().post('/api/users', payload)
    .then((res) => {
      dispatch({
        type: cx.CREATE_USER,
        payload: { user: res },
      });
    }).catch((err) => {
      if (err.response.status === 401) {
        throw new SubmissionError({
          _error: get(err, 'response.data.errors[0].message', 'Unauthorized'),
        });
      } else {
        throw new SubmissionError(
          get(err, 'response.data.errors', { _error: 'Error! Try again later' }),
        );
      }
    })
);

export const updateUserPromise = payload => dispatch => (
  apiClient().patch(`/api/users/${payload.id}`, payload)
    .then((res) => {
      dispatch({
        type: cx.UPDATE_USER,
        payload: { user: res },
      });
    }).catch((err) => {
      if (err.response.status === 401) {
        throw new SubmissionError({
          _error: get(err, 'response.data.errors[0].message', 'Unauthorized'),
        });
      } else {
        throw new SubmissionError(
          get(err, 'response.data.errors', { _error: 'Error! Try again later' }),
        );
      }
    })
);

export const deleteUserPromise = payload => dispatch => (
  apiClient().delete(`/api/users/${payload.id}`)
    .then((res) => {
      dispatch({
        type: cx.DELETE_USER,
        payload: { user: res },
      });
    }).catch((err) => {
      console.log(err);
    })
);
