
import React from 'react';
import { Link } from 'react-router';

import './404.css';

export default () => (
  <div id="page-404">
    <h2>Page Not Found</h2>
    <p>Click <Link to="/">here</Link> to go back home.</p>
  </div>
);
