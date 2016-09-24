import React from 'react';
import Helmet from 'react-helmet';

import DefaultLayout from 'app/layouts/Default';

import styles from './styles.styl';


export default function HomeView() {
  return (
    <DefaultLayout className={styles.root}>
      <Helmet title="Home | Example Application" />
      <h1>Test</h1>
      <p>This is an example paragraph</p>
    </DefaultLayout>
  );
}
