
import React from 'react';
import { connect } from 'react-redux';
import { compose, withState, lifecycle, pure } from 'recompose';
import { Link } from 'react-router';
import { AppBar, IconButton, FlatButton, Drawer, MenuItem } from 'material-ui';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import { get } from 'lodash';
import { doLogout } from 'redux/actions/session';
import ShowFor from 'components/show-for';

import './layout.css';

const enhance = compose(
  withState('sidebarOpen', 'setSidebarOpen', false),
  connect(({
    session,
  }) => ({
    user: session.data,
  }), {
    doLogout,
  }),
  lifecycle({
    componentWillMount() {
      if (!this.props.user.id) {
        this.props.router.push('/login');
      }
    },
    componentWillReceiveProps(nextProps) {
      if (!nextProps.user.id) {
        this.props.router.push('/login');
      }
    },
    componentDidUpdate(prevProps) {
      if (get(prevProps, 'location.pathname', '') !== get(this.props, 'location.pathname', '')) {
        this.props.setSidebarOpen(false);
      }
    },
  }),
  pure,
);

export default enhance(({
  sidebarOpen,
  setSidebarOpen,
  user,
  children,
  ...props
}) => (
  <div id="layout">
    <AppBar
      title="Timezone Management System"
      onTitleTouchTap={() => { }}
      iconElementLeft={
        <IconButton onClick={() => setSidebarOpen(true)}>
          <NavigationMenu />
        </IconButton>
      }
      iconElementRight={
        <FlatButton onClick={() => props.doLogout()}>
          Logout <small>({ get(user, 'email', '') })</small>
        </FlatButton>
      }
    />
    <Drawer
      docked={false}
      width={200}
      open={sidebarOpen}
      onRequestChange={open => setSidebarOpen(open)}
    >
      <Link to="/">
        <MenuItem>Dashboard</MenuItem>
      </Link>
      <Link to="/timezones">
        <MenuItem>Timezones</MenuItem>
      </Link>
      <ShowFor roles={['admin', 'manager']}>
        <Link to="/users">
          <MenuItem>Users</MenuItem>
        </Link>
      </ShowFor>
      <Link to="/account">
        <MenuItem>Account Setting</MenuItem>
      </Link>
    </Drawer>
    <div className="content-wrapper">
      { children }
    </div>
  </div>
));
