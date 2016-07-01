import React, { Component } from 'react';
import Helmet from 'react-helmet';

import DefaultLayout from 'app/layouts/Default';

import styles from './styles.styl';


export default class HomeView extends Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <DefaultLayout className={styles.root}>
        <Helmet title="Home | Example Application" />
        <h1>Test</h1>
        <p>This is an example paragraph</p>
      </DefaultLayout>
    );
  }
}
