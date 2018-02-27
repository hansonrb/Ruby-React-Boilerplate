
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
import { getUsers, deleteUserPromise } from 'redux/actions/users';

import { UserFilterForm } from 'components/forms';
import Paginator from 'components/paginator';
import './users.css';

const enhance = compose(
  withState('confirmDelete', 'setConfirmDelete', null),
  withState('notification', 'setNotification', ''),
  withState('filter', 'setFilter', ''),
  connect(({ users, awaits }) => ({
    users: users.users,
    page: users.meta,
    status: get(awaits, 'statuses.users', ''),
    error: get(awaits, 'errors.users.response.data.errors', 'Error occured.'),
  }), {
    getUsers, deleteUserPromise,
  }),
  withProps(({ page }) => ({
    currentPage: get(page, 'current', 0) - 0,
    totalPage: get(page, 'total_page', 0) - 0,
    totalCount: get(page, 'total', 0) - 0,
  })),
  withHandlers({
    handleDelete: props => (id) => {
      props.deleteUserPromise({ id })
        .then(() => {
          props.setNotification('User deleted');
          props.getUsers({
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
      this.props.getUsers({
        page: this.props.location.query.page || 1,
      });
    },
    componentWillReceiveProps(nextProps) {
      if (this.props.location !== nextProps.location) {
        this.props.getUsers({
          page: nextProps.location.query.page || 1,
          filter: nextProps.filter,
        });
      } else if (this.props.filter !== nextProps.filter) {
        this.props.getUsers({
          page: nextProps.currentPage,
          filter: nextProps.filter,
        });
      }
    },
  }),
);

export default enhance(({
  users,
  status, error,
  confirmDelete, setConfirmDelete,
  notification, setNotification,
  currentPage, totalPage,
  setFilter,
  handleDelete,
  ...props
}) => (
  <div id="page-users">
    <h2>Users</h2>
    <div className="meta-wrapper">
      <div>
        <UserFilterForm
          onSubmit={(data) => {
            setFilter(data.filter);
            props.router.push('/users'); // go back to first page when filtered
          }}
        />
      </div>
      <div className="main-action">
        <Link to="/users/new">
          <FloatingActionButton>
            <ContentAdd />
          </FloatingActionButton>
        </Link>
      </div>
    </div>
    <div className="text-center errors">&nbsp;
      { status === 'pending' && 'Loading...' }
      { status === 'failure' && error }
      { status === 'success' && (!users || users.length === 0) && 'No Data' }
    </div>
    { users && users.length > 0 &&
      <Table selectable={false}>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn style={{ width: '50px' }}>No</TableHeaderColumn>
            <TableHeaderColumn>Name</TableHeaderColumn>
            <TableHeaderColumn>Email</TableHeaderColumn>
            <TableHeaderColumn>Role</TableHeaderColumn>
            <TableHeaderColumn style={{ width: '100px' }}>Action</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} showRowHover>
          { users.map((u, k) => (
            <TableRow key={uniqueId()}>
              <TableRowColumn style={{ width: '50px' }}>{ (currentPage - 1) * 25 + k + 1}</TableRowColumn>
              <TableRowColumn>{u.name}</TableRowColumn>
              <TableRowColumn>{u.email}</TableRowColumn>
              <TableRowColumn>{u.role}</TableRowColumn>
              <TableRowColumn style={{ width: '100px' }}>
                <Link to={`/users/${u.id}`}>
                  <IconButton>
                    <SvgEdit />
                  </IconButton>
                </Link>
                <IconButton onClick={() => setConfirmDelete(u.id)}>
                  <SvgDeleteForever />
                </IconButton>
              </TableRowColumn>
            </TableRow>
          )) }
        </TableBody>
      </Table>
    }
    { totalPage > 1 &&
      <Paginator total={totalPage} current={currentPage} base="/users" />
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
    >Do you really want to delete this user?</Dialog>
    <Snackbar
      open={notification.length > 0}
      message={notification}
      autoHideDuration={4000}
      onRequestClose={() => setNotification('')}
    />
  </div>
));
