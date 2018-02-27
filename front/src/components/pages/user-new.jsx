
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

import { Paper } from 'material-ui';
import { createUserPromise } from 'redux/actions/users';
import { UserForm } from 'components/forms';

import './users.css';

const enhance = compose(
  connect(null, {
    createUserPromise,
  }),
  withHandlers({
    handleSubmit: props => data => (
      props.createUserPromise(data).then(() => {
        props.router.push('/users');
      })
    ),
  }),
);

export default enhance(({
  handleSubmit,
}) => (
  <div id="page-user-new">
    <Paper className="paper" zDepth={1}>
      <h2>New User</h2>
      <UserForm
        onSubmit={handleSubmit}
        isNew
      />
    </Paper>
  </div>
));
