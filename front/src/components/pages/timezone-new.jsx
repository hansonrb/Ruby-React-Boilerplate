
import React from 'react';
import { connect } from 'react-redux';
import { compose, withHandlers } from 'recompose';

import { Paper } from 'material-ui';
import { createTimezonePromise } from 'redux/actions/timezones';
import { TimezoneForm } from 'components/forms';
import formatTimeDifference from 'helpers/formatter';

import './timezones.css';

const enhance = compose(
  connect(null, {
    createTimezonePromise,
  }),
  withHandlers({
    handleSubmit: props => data => (
      props.createTimezonePromise(data).then(() => {
        props.router.push('/timezones');
      })
    ),
  }),
);

export default enhance(({
  handleSubmit,
}) => (
  <div id="page-timezone-new">
    <Paper className="paper" zDepth={1}>
      <h2>New Timezone</h2>
      <p>Your computer is different { formatTimeDifference(
        (new Date()).getTimezoneOffset() / 60) } from UTC.</p>
      <TimezoneForm
        onSubmit={handleSubmit}
        isNew
      />
    </Paper>
  </div>
));
