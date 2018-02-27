
import React from 'react';
import { pure } from 'recompose';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

export default pure(props => (
  <MuiThemeProvider>
    <div id="app-container">
      { props.children }
    </div>
  </MuiThemeProvider>
));
