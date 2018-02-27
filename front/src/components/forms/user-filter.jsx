
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'recompose';

import { RaisedButton } from 'material-ui';
import { TextField } from 'redux-form-material-ui';

import './login.css';

const enhance = compose(
  reduxForm({
    form: 'userFilterForm',
  }),
);

export default enhance(({
  handleSubmit,
  onSubmit,
}) => (
  <form
    name="user-filter-form"
    onSubmit={handleSubmit(onSubmit)}
  >
    <Field
      name="filter"
      component={TextField}
      floatingLabelText="Name Or Email"
      hintText="Name or Email"
    />
    <RaisedButton
      label="Filter"
      primary
      className="action-btn-user-filter"
      onClick={handleSubmit(onSubmit)}
    />
  </form>
));
