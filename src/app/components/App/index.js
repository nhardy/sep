import React, { Component, PropTypes } from 'react';
import { asyncConnect } from 'redux-connect';
import { connect } from 'react-redux';

import * as appPropTypes from 'app/components/propTypes';
import { setTime } from 'app/actions/time';
import { getMyVotes } from 'app/actions/votes';
import Geolocation from 'app/components/Geolocation';
import ErrorView from 'app/views/Error';

import 'app/assets/stylus/reset.styl';
import 'app/assets/stylus/fonts.styl';
import 'font-awesome/css/font-awesome.min.css';
import styles from './styles.styl';


@asyncConnect([
  {
    promise: ({ store: { dispatch } }) => {
      dispatch(setTime());
      return Promise.resolve();
    },
  },
])
@connect((state) => {
  return {
    routeError: state.routeError,
  };
}, { setTime, getMyVotes })
export default class App extends Component {
  static propTypes = {
    routeError: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    children: PropTypes.node,
    location: appPropTypes.location,
    setTime: PropTypes.func,
    getMyVotes: PropTypes.func,
  };

  static childContextTypes = {
    location: appPropTypes.location,
  };

  getChildContext() {
    return {
      location: this.props.location,
    };
  }

  componentDidMount() {
    this.props.getMyVotes();
    this._interval = window.setInterval(() => this.props.setTime(), 5 * 1000);
  }

  componentWillUnmount() {
    this._interval && window.clearInterval(this._interval);
  }

  render() {
    return (
      <div className={styles.root}>
        {this.props.routeError ? (
          <ErrorView {...this.props.routeError} />
        ) : (
          this.props.children
        )}
        <Geolocation />
      </div>
    );
  }
}
