
import { SubmissionError } from 'redux-form';
import { get } from 'lodash';
import { browserHistory } from 'react-router';

import apiClient from 'helpers/api-client';
import * as cx from './constants';

export const doLoginPromise = payload => dispatch => (
  apiClient().post('/api/auth/sign_in', payload)
    .then((res) => {
      dispatch({
        type: cx.LOGIN,
        payload: { user: res },
      });
      browserHistory.push('/');
    }).catch((err) => {
      throw new SubmissionError({
        _error: get(err, 'response.data.errors', 'Error! Try again later'),
      });
    })
);

export const doSignupPromise = payload => dispatch => (
  apiClient().post('/api/auth', payload)
    .then((res) => {
      dispatch({
        type: cx.SIGNUP,
        payload: { user: res },
      });
      browserHistory.push('/');
    }).catch((err) => {
      throw new SubmissionError(
        get(err, 'response.data.errors', { _error: 'Error! Try again later' }),
      );
    })
);

export const doLogout = () => dispatch => (
  apiClient().delete('/api/auth/sign_out')
    .then(() => {
      dispatch({ type: cx.LOGOUT });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: cx.LOGOUT });
    })
);

export const doUpdateInfoPromise = payload => dispatch => (
  apiClient().patch('/api/auth', payload)
    .then(() => {
      dispatch({
        type: cx.UPDATE_INFO,
      });
    }).catch((err) => {
      throw new SubmissionError(
        get(err, 'response.data.errors', { _error: 'Error! Try again later' }),
      );
    })
);
