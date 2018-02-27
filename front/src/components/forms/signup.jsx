
import React from 'react';
import { Link } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'recompose';

import { RaisedButton } from 'material-ui';
import { TextField } from 'redux-form-material-ui';
import * as validators from 'helpers/form-validators';

import './login.css';

const enhance = compose(
  reduxForm({
    form: 'signupForm',
    validate(values) {
      const errors = {};
      if (values.password !== values.confirm_password) {
        errors.confirm_password = 'Please check your confirmation password';
      }
      return errors;
    },
  }),
);

export default enhance(({
  handleSubmit,
  onSubmit,
  submitting,
  error,
}) => (
  <form
    name="signup-form"
    onSubmit={handleSubmit(onSubmit)}
  >
    <Field
      name="email"
      component={TextField}
      floatingLabelText="Email"
      hintText="test@mail.com"
      validate={[validators.required, validators.email]}
      fullWidth
    />
    <Field
      name="password"
      type="password"
      component={TextField}
      floatingLabelText="Password"
      hintText="Password"
      validate={[validators.required]}
      fullWidth
    />
    <Field
      name="confirm_password"
      type="password"
      component={TextField}
      floatingLabelText="Confirm Password"
      hintText="Confirm Password"
      validate={[validators.required]}
      fullWidth
    />
    <div className='errors'>
      { typeof error === 'object' &&
        error.map((e, k) =>
          <div key={k}>
            { e }
          </div>
        )
      }
      { typeof error === 'string' &&
        <div>{ error }</div>
      }
    </div>
    <div className="actions-wrapper">
      <RaisedButton
        label="Sign Up"
        primary
        className="action-btn-signup"
        onClick={handleSubmit(onSubmit)}
        disabled={submitting}
      />
      <Link to="/login">
        <RaisedButton label="Back to login" secondary className="action-btn-login" />
      </Link>
    </div>
  </form>
));
