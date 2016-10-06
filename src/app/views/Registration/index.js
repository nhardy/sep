import React, { Component, PropTypes } from 'react';
import { first } from 'lodash-es';
import { withRouter } from 'react-router';
import { routerShape } from 'react-router/lib/PropTypes';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';

import config from 'app/config';
import DefaultLayout from 'app/layouts/Default';
import FontAwesome from 'app/components/FontAwesome';

import styles from './styles.styl';


//@asyncConnect()
@withRouter
export default class RegistrationView extends Component {
  static propTypes = {};

  state = {};

  readImage = () => {

  };

  submit = async () => {
    post && this.props.router.push(`/`);
  };

  render() {

    return (
      <DefaultLayout className={styles.root}>
        <Helmet title={`Register User | ${config.appName}`} />
        <form className={styles.form}>
          <h1 className={styles.heading}>Register User</h1>
          <div className={styles.container}>
          </div>
        </form>
      </DefaultLayout>
    );
  }
}
