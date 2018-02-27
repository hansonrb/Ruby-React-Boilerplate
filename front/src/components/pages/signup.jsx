
import React from 'react';
import { connect } from 'react-redux';
import { pure, compose, withHandlers, lifecycle } from 'recompose';

import Paper from 'material-ui/Paper';
import { SignupForm } from 'components/forms';
import { doSignupPromise } from 'redux/actions/session';

import './login.css';

const enhance = compose(
  connect(({
    session,
  }) => ({
    user: session.data,
  }), {
    doSignupPromise,
  }),
  withHandlers({
    handleSubmit: props => data => props.doSignupPromise(data),
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
  <div id="signup">
    <Paper className="paper" zDepth={1}>
      <h2>Register</h2>
      <SignupForm onSubmit={handleSubmit} />
    </Paper>
  </div>
));
