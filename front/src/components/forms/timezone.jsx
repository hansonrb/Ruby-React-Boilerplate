
import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'recompose';
import { map, range, uniqueId } from 'lodash';

import { RaisedButton, MenuItem } from 'material-ui';
import { TextField, SelectField } from 'redux-form-material-ui';

import * as validators from 'helpers/form-validators';
import formatTimeDifference from 'helpers/formatter';
import ShowFor from 'components/show-for';
import AsyncMuiAutoComplete from 'components/async-mui-autocomplete';

import './login.css';

const enhance = compose(
  reduxForm({
    form: 'timezoneForm',
  }),
);

export default enhance(({
  handleSubmit,
  onSubmit,
  submitting,
  error,
  ...props
}) => (
  <form
    name="timezone-form"
    onSubmit={handleSubmit(onSubmit)}
  >
    <Field
      name="name"
      component={TextField}
      floatingLabelText="Name"
      hintText="Name of Timezone"
      validate={[validators.required]}
      fullWidth
    />
    <Field
      name="city"
      component={TextField}
      floatingLabelText="City"
      hintText="Name of City"
      validate={[validators.required]}
      fullWidth
    />
    <Field
      name="difference"
      component={SelectField}
      floatingLabelText="Time Difference with UTC"
      hintText="default: 0"
      fullWidth
    >
      { map(
        range(-11.5, 14.5, 0.5),
        tz => (
          <MenuItem key={uniqueId()} value={tz} primaryText={formatTimeDifference(tz)} />
        ),
      ) }
    </Field>
    <ShowFor roles={['admin']}>
      <Field
        name="user_id"
        component={AsyncMuiAutoComplete}
        floatingLabelText="User"
        fullWidth
        validate={[validators.required]}
        hintText="Start typing username"
        initialList={props.initialValues ? [{
          value: props.initialValues.user_id,
          text: props.initialValues.user_name,
        }] : []}
      />
    </ShowFor>
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
        className="action-btn-timezone"
        onClick={handleSubmit(onSubmit)}
        disabled={submitting}
      />
    </div>
  </form>
));
