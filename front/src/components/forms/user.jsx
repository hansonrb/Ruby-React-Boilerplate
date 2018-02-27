
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'recompose';
import { uniqueId } from 'lodash';

import { RaisedButton, MenuItem } from 'material-ui';
import { TextField, SelectField } from 'redux-form-material-ui';
import * as validators from 'helpers/form-validators';

import './login.css';

const enhance = compose(
  reduxForm({
    form: 'userForm',
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
  noRole,
  isNew,
}) => (
  <form
    name="user-form"
    onSubmit={handleSubmit(onSubmit)}
  >
    <Field
      name="name"
      component={TextField}
      floatingLabelText="Name"
      hintText="YOUR NAME"
      fullWidth
    />
    <Field
      name="email"
      component={TextField}
      floatingLabelText="Email"
      hintText="test@mail.com"
      validate={[validators.required, validators.email]}
      fullWidth
    />
    { !noRole && <Field
      name="role"
      component={SelectField}
      floatingLabelText="Role"
      hintText="Default: Regular"
      fullWidth
    >
      <MenuItem value="regular" primaryText="Regular" />
      <MenuItem value="manager" primaryText="Manager" />
      <MenuItem value="admin" primaryText="Administrator" />
    </Field> }
    <div style={{ marginTop: '15px' }}>
      { !isNew && <small>Leave following fields empty not to change password</small> }
      <Field
        name="password"
        type="password"
        component={TextField}
        floatingLabelText="Password"
        hintText="Password"
        fullWidth
      />
      <Field
        name="confirm_password"
        type="password"
        component={TextField}
        floatingLabelText="Confirm Password"
        hintText="Confirm Password"
        fullWidth
      />
    </div>
    <div className="errors">
      { typeof error === 'object' &&
        error.map(e => (
          <div key={uniqueId()}>
            { e }
          </div>
        ))
      }
      { typeof error === 'string' &&
        <div>{ error }</div>
      }
    </div>
    <div className="actions-wrapper">
      <RaisedButton
        label="Save"
        primary
        className="action-btn-user"
        onClick={handleSubmit(onSubmit)}
        disabled={submitting}
      />
    </div>
  </form>
));
