
import { AWAIT_MARKER } from 'redux-await';
import { SubmissionError } from 'redux-form';
import { get } from 'lodash';

import apiClient from 'helpers/api-client';
import * as cx from './constants';

export function getTimezones(payload) {
  return {
    type: cx.GET_TIMEZONES,
    AWAIT_MARKER,
    payload: {
      timezones: apiClient().get('/api/timezones', { params: { page: payload.page, filter: payload.filter } }),
    },
  };
}

export function getTimezone(payload) {
  return {
    type: cx.GET_TIMEZONE,
    AWAIT_MARKER,
    payload: {
      timezone: apiClient().get(`/api/timezones/${payload.id}`),
    },
  };
}

export const createTimezonePromise = payload => dispatch => (
  apiClient().post('/api/timezones', payload)
    .then((res) => {
      dispatch({
        type: cx.CREATE_TIMEZONE,
        payload: { timezone: res },
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

export const updateTimezonePromise = payload => dispatch => (
  apiClient().patch(`/api/timezones/${payload.id}`, payload)
    .then((res) => {
      dispatch({
        type: cx.UPDATE_TIMEZONE,
        payload: { timezone: res },
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

export const deleteTimezonePromise = payload => dispatch => (
  apiClient().delete(`/api/timezones/${payload.id}`)
    .then((res) => {
      dispatch({
        type: cx.DELETE_TIMEZONE,
        payload: { timezone: res },
      });
    }).catch((err) => {
      console.log(err);
    })
);
