
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers, lifecycle, withProps } from 'recompose';
import { Paper } from 'material-ui';
import { get, find } from 'lodash';

import { updateTimezonePromise, getTimezone } from 'redux/actions/timezones';
import { TimezoneForm } from 'components/forms';
import formatTimeDifference from 'helpers/formatter';

import './timezones.css';

const enhance = compose(
  connect(({
    timezones,
    awaits,
  }) => ({
    timezones: timezones.timezones,
    status: get(awaits, 'statuses.timezone', ''),
  }), {
    updateTimezonePromise,
    getTimezone,
  }),
  withHandlers({
    handleSubmit: props => data => (
      props.updateTimezonePromise({ id: props.params.id - 0, ...data }).then(() => {
        props.router.push('/timezones');
      })
    ),
  }),
  withProps(props => ({
    initialValues: find(props.timezones, { id: props.params.id - 0 }),
  })),
  lifecycle({
    componentWillMount() {
      if (this.props.timezones.length === 0) {
        this.props.getTimezone({
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
  <div id="page-timezone-edit">
    <Paper className="paper" zDepth={1}>
      <h2>Edit Timezone</h2>
      <p>Your computer is different { formatTimeDifference(
        (new Date()).getTimezoneOffset() / 60) } from UTC.</p>
      { !initialValues && status !== 'success' &&
        <div className="error">Cannot find a timezone</div>
      }
      { initialValues &&
        <TimezoneForm
          onSubmit={handleSubmit}
          initialValues={initialValues}
        />
      }
    </Paper>
  </div>
));
