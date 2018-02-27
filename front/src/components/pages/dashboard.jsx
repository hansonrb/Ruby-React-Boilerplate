
import React from 'react';
import { Link } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import './dashboard.css';

export default () => (
  <div id="page-dashboard">
    <h1>Dashboard</h1>
    <div className="requirements">
      <ul>
        <li>User must be able to create an account and log in.</li>
        <li>When logged in, a user can see, edit and delete timezones he entered.</li>
        <li>Implement at least three roles with different permission levels:
          <ul>
            <li>a regular user would only be able to CRUD on their owned records,</li>
            <li>a user manager would be able to CRUD users,</li>
            <li>and an admin would be able to CRUD all records and users.</li>
          </ul>
        </li>
        <li>When a timezone is entered, each entry has a Name,
          Name of the city in timezone, the difference to GMT time.</li>
        <li>When displayed, each entry also has current time.</li>
        <li>Filter by names.</li>
        <li>REST API. Make it possible to perform all user actions via the API,
          including authentication.</li>
        <li>In any case, you should be able to explain how a REST API works
          and demonstrate that by creating functional tests that use the REST Layer directly.
          Please be prepared to use REST clients like Postman, cURL, etc. for this purpose.</li>
        <li>All actions need to be done client side using AJAX,
          refreshing the page is not acceptable.</li>
        <li>Minimal UI/UX design is needed.
          You will not be marked on graphic design.
          However, do try to keep it as tidy as possible.</li>
      </ul>
    </div>
    <div>
      <Link to="/timezones">
        <RaisedButton primary label="Let's Get Started" />
      </Link>
    </div>
  </div>
);
