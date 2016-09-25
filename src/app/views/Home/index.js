import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router';

import DefaultLayout from 'app/layouts/Default';

import styles from './styles.styl';


export default function HomeView() {
  throw new Error('woops');
  return (
    <DefaultLayout className={styles.root}>
      <Helmet title="Home | Example Application" />
      <h1>Test</h1>
      <p>This is an example paragraph</p>
      <p><Link to="/test">Test Error</Link></p>
    </DefaultLayout>
  );
}
