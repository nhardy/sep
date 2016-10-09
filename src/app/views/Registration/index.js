import React, { Component, PropTypes } from 'react';
import { first } from 'lodash-es';
import { withRouter } from 'react-router';
import { routerShape } from 'react-router/lib/PropTypes';
import { connect } from 'react-redux';
import { asyncConnect } from 'redux-connect';
import Helmet from 'react-helmet';
import cx from 'classnames';

import config from 'app/config';
import NoHeaderFooter from 'app/layouts/NoHeaderFooter';
import FontAwesome from 'app/components/FontAwesome';
import back from 'app/assets/images/back.png';
import { addUser } from 'app/actions/users';

import styles from './styles.styl';


@connect(state => ({
  username: state.username,
  password: state.password,
  mobile: state.mobile,
}), { addUser })
@withRouter
export default class RegistrationView extends Component {
  static propTypes = {
    router: routerShape,
    addUser: PropTypes.func,
  };

  state = {};

  confirmPassword = () => {
    const password = this._password.value;
    const confirm = this._confirmpw.value;

    this.setState({ userError: password !== confirm });
  };

  back = () => {
    this.props.router.push('/');
  }

  submit = async () => {
    const username = this._username.value;
    const password = this._password.value;
    const mobile = this._number.value;
    if (this.state.userError || (username == null || password == null || mobile == null)) return;

    await this.props.addUser({
      username,
      password,
      mobile,
    });

    this.props.router.push('/');
  };

  validateNumber = () => {
    const pattern = /(\+614|04)[0-9]{8}/;
    const number = this._number.value.replace(/ /g,'');
    this.setState({ userError: pattern.exec(number) == null });
  }

  render() {
    return (
      <NoHeaderFooter className={styles.root}>
        <Helmet title={`Sign Up | ${config.appName}`} />
        <img src={ back } className={styles.back} onClick={this.back} />
        <h1 className={styles.heading}>Sign Up</h1>
        <form className={styles.form}>
            <div className={styles.container}>
              <FontAwesome className={cx('fa fa-envelope-o', styles.inputIcon)} />
              <input className={styles.textinput} placeholder="User Name" type="text" id="username" ref={ref => (this._username = ref)} />
            </div>
            <div className={styles.container}>
              <FontAwesome className={cx('fa fa-phone', styles.inputIcon)} />
              <input className={styles.textinput} placeholder="Mobile Number" type="tel" id="number" ref={ref => (this._number = ref)} onChange={this.validateNumber} />
            </div>
            <div className={styles.container}>
              <FontAwesome className={cx('fa fa-lock', styles.inputIcon)} />
              <input className={styles.textinput} placeholder="Password" type="password" id="password" ref={ref => (this._password = ref)} />
            </div>
            <div className={styles.container}>
              <FontAwesome className={cx('fa fa-lock', styles.inputIcon)} />
              <input className={styles.textinput} placeholder="Confirm" type="password" id="confirmpw" ref={ref => (this._confirmpw = ref)} onChange={this.confirmPassword} />
            </div>
            {this.state.userError && (
              <div className={styles.error}>
                {( this._password.value !== this._confirmpw.value ) ? 'Passwords do not match' : 'Invalid mobile'}
              </div>
            )}
            <input className={styles.button} type="button" onClick={this.submit} value="Join" />
        </form>
      </NoHeaderFooter>
    );
  }
}
