
import React from 'react';
import { connect } from 'react-redux';
import { pure, compose, withHandlers, lifecycle } from 'recompose';

import Paper from 'material-ui/Paper';
import { LoginForm } from 'components/forms';
import { doLoginPromise } from 'redux/actions/session';

import './login.css';

const enhance = compose(
  connect(({
    session,
  }) => ({
    user: session.data,
  }), {
    doLoginPromise,
  }),
  withHandlers({
    handleSubmit: props => data => props.doLoginPromise(data),
  }),
  lifecycle({
    componentWillMount() {
      if (this.props.user.id) {
        this.props.router.push('/');
      }
    },
  }),
  pure,
);

export default enhance(({
  handleSubmit,
}) => (
  <div id="login">
    <Paper className="paper" zDepth={1}>
      <h2>Log In</h2>
      <LoginForm onSubmit={handleSubmit} />
    </Paper>
  </div>
));
