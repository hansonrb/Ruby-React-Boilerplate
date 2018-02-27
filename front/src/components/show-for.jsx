
import React from 'react';
import { connect } from 'react-redux';
import { compose, pure } from 'recompose';

const enhance = compose(
  connect(({
    session: { data },
  }) => ({
    isLoggedIn: !!data.id,
    role: data.role,
  })),
  pure,
);

export default enhance(({
  isLoggedIn,
  role,
  roles,
  dispatch,
  children,
  ...props
}) => {
  if (isLoggedIn && role && roles && roles.indexOf(role) > -1) {
    return React.cloneElement(children, { ...props });
  }
  return null;
});
