import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { App, Layout } from './components/containers';
import {
  SignIn,
  SignUp,
  FourOhFour,
  Dashboard,
  Account,
  Timezones,
  TimezoneNew,
  TimezoneEdit,
  Users,
  UserNew,
  UserEdit,
} from './components/pages';

const routes = (
  <Route path="/" component={App}>
    <Route component={Layout}>
      <IndexRoute component={Dashboard} />
      <Route path="account" component={Account} />
      <Route path="timezones" component={Timezones} />
      <Route path="timezones/new" component={TimezoneNew} />
      <Route path="timezones/:id" component={TimezoneEdit} />
      <Route path="users" component={Users} />
      <Route path="users/new" component={UserNew} />
      <Route path="users/:id" component={UserEdit} />
    </Route>
    <Route path="login" component={SignIn} />
    <Route path="signup" component={SignUp} />
    <Route path="*" component={FourOhFour} />
  </Route>
);

export default routes;
