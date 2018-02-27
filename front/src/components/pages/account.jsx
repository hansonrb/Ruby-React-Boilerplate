
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, withState } from 'recompose';
import { Paper, Snackbar } from 'material-ui';
import { get } from 'lodash';

import { doUpdateInfoPromise } from 'redux/actions/session';
import { UserForm } from 'components/forms';

import './users.css';

const enhance = compose(
  withState('notification', 'setNotification', ''),
  connect(({
    session,
    awaits,
  }) => ({
    currentUser: session.data,
    status: get(awaits, 'statuses.user', ''),
  }), {
    doUpdateInfoPromise,
  }),
  withHandlers({
    handleSubmit: props => data => (
      props.doUpdateInfoPromise({ id: props.params.id - 0, ...data }).then(() => {
        props.setNotification('User information updated successfully');
      })
    ),
  }),
);

export default enhance(({
  handleSubmit,
  currentUser,
  notification, setNotification,
}) => (
  <div id="page-account-account">
    <Paper className="paper" zDepth={1}>
      <h2>Account Setting</h2>
      <UserForm
        onSubmit={handleSubmit}
        initialValues={currentUser}
        noRole
      />
    </Paper>
    <Snackbar
      open={notification.length > 0}
      message={notification}
      autoHideDuration={4000}
      onRequestClose={() => setNotification('')}
    />
  </div>
));
