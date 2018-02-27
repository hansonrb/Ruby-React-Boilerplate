
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { compose, withProps, withHandlers, lifecycle, withState } from 'recompose';
import { uniqueId, get } from 'lodash';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import {
  Dialog,
  FloatingActionButton,
  FlatButton,
  IconButton,
  Snackbar,
} from 'material-ui';
import ContentAdd from 'material-ui/svg-icons/content/add';
import SvgEdit from 'material-ui/svg-icons/editor/border-color';
import SvgDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import { getTimezones, deleteTimezonePromise } from 'redux/actions/timezones';

import { TimezoneFilterForm } from 'components/forms';
import Paginator from 'components/paginator';
import ShowFor from 'components/show-for';
import './timezones.css';

const enhance = compose(
  withState('confirmDelete', 'setConfirmDelete', null),
  withState('notification', 'setNotification', ''),
  withState('filter', 'setFilter', ''),
  connect(({ timezones, awaits }) => ({
    timezones: timezones.timezones,
    page: timezones.meta,
    status: get(awaits, 'statuses.timezones', ''),
    error: get(awaits, 'errors.timezones.response.data.errors', 'Error occured.'),
  }), {
    getTimezones, deleteTimezonePromise,
  }),
  withProps(({ page }) => ({
    currentPage: get(page, 'current', 0) - 0,
    totalPage: get(page, 'total_page', 0) - 0,
    totalCount: get(page, 'total', 0) - 0,
  })),
  withHandlers({
    handleDelete: props => (id) => {
      props.deleteTimezonePromise({ id })
        .then(() => {
          props.setNotification('Timezone deleted');
          props.getTimezones({
            page: props.currentPage,
            filter: props.filter,
          });
        })
        .catch(() => {
          props.setNotification('Error occured while deleting. Try again');
        });
    },
  }),
  lifecycle({
    componentWillMount() {
      this.props.getTimezones({
        page: this.props.location.query.page || 1,
      });
    },
    componentWillReceiveProps(nextProps) {
      if (this.props.location !== nextProps.location) {
        this.props.getTimezones({
          page: nextProps.location.query.page || 1,
          filter: nextProps.filter,
        });
      } else if (this.props.filter !== nextProps.filter) {
        this.props.getTimezones({
          page: nextProps.currentPage,
          filter: nextProps.filter,
        });
      }
    },
  }),
);

export default enhance(({
  timezones,
  status, error,
  confirmDelete, setConfirmDelete,
  notification, setNotification,
  currentPage, totalPage,
  setFilter,
  handleDelete,
  ...props
}) => (
  <div id="page-timezones">
    <h2>Timezones</h2>
    <div className="meta-wrapper">
      <div>
        <TimezoneFilterForm
          onSubmit={(data) => {
            setFilter(data.filter);
            props.router.push('/timezones'); // go back to first page when filtered
          }}
        />
      </div>
      <div className="main-action">
        <Link to="/timezones/new">
          <FloatingActionButton>
            <ContentAdd />
          </FloatingActionButton>
        </Link>
      </div>
    </div>
    <div className="text-center errors">&nbsp;
      { status === 'pending' && 'Loading...' }
      { status === 'failure' && error }
      { status === 'success' && (!timezones || timezones.length === 0) && 'No Data' }
    </div>
    { timezones && timezones.length > 0 &&
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn style={{ width: '50px' }}>No</TableHeaderColumn>
            <ShowFor roles={['admin']}>
              <TableHeaderColumn>User Name</TableHeaderColumn>
            </ShowFor>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>City</TableHeaderColumn>
            <TableHeaderColumn>Current Local Time</TableHeaderColumn>
            <TableHeaderColumn>Difference</TableHeaderColumn>
            <TableHeaderColumn style={{ width: '100px' }}>Action</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} showRowHover>
          { timezones.map((t, k) => (
            <TableRow key={uniqueId()}>
              <TableRowColumn style={{ width: '50px' }}>{ (currentPage - 1) * 25 + k + 1}</TableRowColumn>
              <ShowFor roles={['admin']}>
                <TableRowColumn>{t.user_name}</TableRowColumn>
              </ShowFor>
              <TableRowColumn>{t.name}</TableRowColumn>
              <TableRowColumn>{t.city}</TableRowColumn>
              <TableRowColumn>{t.current_time}</TableRowColumn>
              <TableRowColumn>{t.formatted_difference}</TableRowColumn>
              <TableRowColumn style={{ width: '100px' }}>
                <Link to={`/timezones/${t.id}`}>
                  <IconButton>
                    <SvgEdit />
                  </IconButton>
                </Link>
                <IconButton onClick={() => setConfirmDelete(t.id)}>
                  <SvgDeleteForever />
                </IconButton>
              </TableRowColumn>
            </TableRow>
          )) }
        </TableBody>
      </Table>
    }
    { totalPage > 1 &&
      <Paginator total={totalPage} current={currentPage} base="/timezones" />
    }
    <Dialog
      title="Are you sure?"
      actions={[
        <FlatButton
          label="No"
          primary
          onClick={() => setConfirmDelete(null)}
        />,
        <FlatButton
          label="Yes"
          primary
          keyboardFocused
          onClick={() => {
            handleDelete(confirmDelete);
            setConfirmDelete(null);
          }}
        />,
      ]}
      modal={false}
      open={!!confirmDelete}
      onRequestClose={() => setConfirmDelete(null)}
    >Do you really want to delete this timezone?</Dialog>
    <Snackbar
      open={notification.length > 0}
      message={notification}
      autoHideDuration={4000}
      onRequestClose={() => setNotification('')}
    />
  </div>
));
