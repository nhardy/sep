import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

import styles from './styles.styl';


export default class HomeView extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.root}>
        <Helmet title="Home | Example Application" />
        <h1>Test</h1>
      </div>
    );
  }
}
