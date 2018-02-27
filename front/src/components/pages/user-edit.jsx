
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, lifecycle, withProps } from 'recompose';
import { Paper } from 'material-ui';
import { get, find } from 'lodash';

import { updateUserPromise, getUser } from 'redux/actions/users';
import { UserForm } from 'components/forms';

import './users.css';

const enhance = compose(
  connect(({
    users,
    awaits,
  }) => ({
    users: users.users,
    status: get(awaits, 'statuses.user', ''),
  }), {
    updateUserPromise,
    getUser,
  }),
  withHandlers({
    handleSubmit: props => data => (
      props.updateUserPromise({ id: props.params.id - 0, ...data }).then(() => {
        props.router.push('/users');
      })
    ),
  }),
  withProps(props => ({
    initialValues: find(props.users, { id: props.params.id - 0 }),
  })),
  lifecycle({
    componentWillMount() {
      if (this.props.users.length === 0) {
        this.props.getUser({
          id: this.props.params.id - 0,
        });
      }
    },
  }),
);

export default enhance(({
  handleSubmit,
  status,
  initialValues,
}) => (
  <div id="page-user-edit">
    <Paper className="paper" zDepth={1}>
      <h2>Edit User</h2>
      { !initialValues && status !== 'success' &&
        <div>Cannot find a user</div>
      }
      { initialValues &&
        <UserForm
          onSubmit={handleSubmit}
          initialValues={initialValues}
        />
      }
    </Paper>
  </div>
));
