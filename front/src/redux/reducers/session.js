import * as cx from 'redux/actions/constants';

const initialState = {
  data: {},
  headers: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case cx.SIGNUP: {
      const newState = Object.assign({}, state, {
        data: action.payload.user.data.data,
        headers: action.payload.user.headers,
      });
      localStorage.setItem('tmz_session', JSON.stringify(newState));
      return newState;
    }
    case cx.LOGIN: {
      const newState = Object.assign({}, state, {
        data: action.payload.user.data.data,
        headers: action.payload.user.headers,
      });
      localStorage.setItem('tmz_session', JSON.stringify(newState));
      return newState;
    }
    case cx.LOGOUT: {
      localStorage.removeItem('tmz_session');
      return Object.assign({}, state, initialState);
    }
    default:
      return state;
  }
};
