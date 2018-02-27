import * as cx from 'redux/actions/constants';

const initialState = {
  timezones: [],
  meta: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case cx.GET_TIMEZONES:
      return Object.assign({}, state, action.payload.timezones.data);
    case cx.GET_TIMEZONE:
      return Object.assign({}, state, {
        timezones: [action.payload.timezone.data],
      });
    default:
      return state;
  }
};
