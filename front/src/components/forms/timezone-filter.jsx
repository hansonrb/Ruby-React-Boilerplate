
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'recompose';

import { RaisedButton } from 'material-ui';
import { TextField } from 'redux-form-material-ui';

import './login.css';

const enhance = compose(
  reduxForm({
    form: 'timezoneFilterForm',
  }),
);

export default enhance(({
  handleSubmit,
  onSubmit,
}) => (
  <form
    name="timezone-filter-form"
    onSubmit={handleSubmit(onSubmit)}
  >
    <Field
      name="filter"
      component={TextField}
      floatingLabelText="Name Or City"
      hintText="Name or City"
    />
    <RaisedButton
      label="Filter"
      primary
      className="action-btn-timezone-filter"
      onClick={handleSubmit(onSubmit)}
    />
  </form>
));
