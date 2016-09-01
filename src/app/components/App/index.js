import React, { Component, PropTypes } from 'react';
import { deepOrange500 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import * as appPropTypes from 'app/components/propTypes';


import 'app/assets/stylus/reset.styl';
import 'app/assets/stylus/fonts.styl';
import 'font-awesome/css/font-awesome.min.css';
import styles from './styles.styl';


const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
}, { userAgent: 'all' });

export default class App extends Component {

  static propTypes = {
    children: PropTypes.node,
    location: appPropTypes.location,
  };

  static childContextTypes = {
    location: appPropTypes.location,
  };

  getChildContext() {
    return {
      location: this.props.location,
    };
  }

  render() {
    return (
      <div className={styles.root}>
        <MuiThemeProvider muiTheme={muiTheme}>
          {this.props.children}
        </MuiThemeProvider>
      </div>
    );
  }
}
