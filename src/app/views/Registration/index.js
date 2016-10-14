import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { routerShape } from 'react-router/lib/PropTypes';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import cx from 'classnames';

import config from 'app/config';
import NoHeaderFooter from 'app/layouts/NoHeaderFooter';
import FontAwesome from 'app/components/FontAwesome';
import Button from 'app/components/Button';
import { registerAndLoginUser } from 'app/actions/users';
import validation from 'app/lib/validation';

import styles from './styles.styl';


@connect(null,
 { registerAndLoginUser })
@withRouter
export default class RegistrationView extends Component {
  static propTypes = {
    router: routerShape,
    registerAndLoginUser: PropTypes.func,
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
    if (this.state.userError || (username === '' || password === '' || mobile === '')) return;

    await this.props.registerAndLoginUser({
      username,
      password,
      mobile,
    });

    this.props.router.push('/');
  };

  validateInfo = (REGEX, inputElement) => {
    const value = inputElement.value.replace(/ /g, '');
    this.setState({ userError: REGEX.exec(value) == null });
  }

  validateNumber = () => { this.validateInfo(validation.VALID_MOBILE, this._number); }
  validatePassword = () => { this.validateInfo(validation.VALID_PASSWORD, this._password); }
  validateUsername = () => { this.validateInfo(validation.VALID_USERNAME, this._username); }

  render() {
    return (
      <NoHeaderFooter className={styles.root}>
        <Helmet title={`Sign Up | ${config.appName}`} />
        <Button className={styles.back} onClick={this.back} />
        <h1 className={styles.heading}>Sign Up</h1>
        <form className={styles.form}>
          <div className={styles.container}>
            <FontAwesome className={cx('fa fa-envelope-o', styles.inputIcon)} />
            <input className={styles.textInput} placeholder="User Name" type="text" id="username" ref={ref => (this._username = ref)} onChange={this.validateUsername} />
          </div>
          <div className={styles.container}>
            <FontAwesome className={cx('fa fa-phone', styles.inputIcon)} />
            <input className={styles.textInput} placeholder="Mobile Number" type="tel" id="number" ref={ref => (this._number = ref)} onChange={this.validateNumber} />
          </div>
          <div className={styles.container}>
            <FontAwesome className={cx('fa fa-lock', styles.inputIcon)} />
            <input className={styles.textInput} placeholder="Password" type="password" id="password" ref={ref => (this._password = ref)} onChange={this.validatePassword} />
          </div>
          <div className={styles.container}>
            <FontAwesome className={cx('fa fa-lock', styles.inputIcon)} />
            <input className={styles.textInput} placeholder="Confirm" type="password" id="confirmpw" ref={ref => (this._confirmpw = ref)} onChange={this.confirmPassword} />
          </div>
          {this.state.userError &&/* TODO ADD DATA VALIDATION USER OUTPUT */ (
            <div className={styles.error}>
              {(this._password.value !== this._confirmpw.value) ? 'Passwords do not match' : 'Invalid mobile'}
            </div>
          )}
          <input className={styles.button} type="button" onClick={this.submit} value="Join" />
        </form>
      </NoHeaderFooter>
    );
  }
}
