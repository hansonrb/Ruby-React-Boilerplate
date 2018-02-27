import * as cx from 'redux/actions/constants';

const initialState = {
  users: [],
  meta: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case cx.GET_USERS:
      return Object.assign({}, state, action.payload.users.data);
    case cx.GET_USER:
      return Object.assign({}, state, {
        users: [action.payload.user.data],
      });
    default:
      return state;
  }
};
