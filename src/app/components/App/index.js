import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import FontAwesome from 'app/components/FontAwesome';
import * as appPropTypes from 'app/components/propTypes';


import 'app/assets/stylus/reset.styl';
import 'app/assets/stylus/fonts.styl';
import 'font-awesome/css/font-awesome.min.css';
import 'gemini-scrollbar/gemini-scrollbar.css';
import styles from './styles.styl';


@connect((state) => ({
  loading: state.reduxAsyncConnect.loading,
}))
export default class App extends Component {
  static propTypes = {
    children: PropTypes.node,
    location: appPropTypes.location,
    loading: PropTypes.bool,
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
    const { loading } = this.props;
    return (
      <div className={styles.root}>
        {this.props.children}
        {loading && <div className={styles.spinnerWrapper}>
          <div className={styles.spinner}>
            <FontAwesome className={cx('fa-refresh', 'fa-spin')} />
          </div>
        </div>}
      </div>
    );
  }
}
