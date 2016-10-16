import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import { routerShape } from 'react-router/lib/PropTypes';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import cx from 'classnames';
import { get } from 'lodash-es';

import config from 'app/config';
import NoHeaderFooter from 'app/layouts/NoHeaderFooter';
import FontAwesome from 'app/components/FontAwesome';
import Button from 'app/components/Button';
import { registerAndLoginUser } from 'app/actions/users';
import { VALID_MOBILE, VALID_PASSWORD, VALID_USERNAME } from 'app/lib/validation';

import styles from './styles.styl';


@connect(null, { registerAndLoginUser })
@withRouter
export default class RegistrationView extends Component {
  static propTypes = {
    router: routerShape,
    registerAndLoginUser: PropTypes.func,
  };

  state = {};

  componentWillReceiveProps(nextProps) {
    if (!nextProps.token) return;
    this.props.router.replace(this.getRedirect());
  }

  onSubmit = (e) => {
    e.preventDefault();
  }

  getRedirect = () => {
    return get(this.context.location, 'query.redirect', '/');
  };

  confirmPassword = () => {
    const password = this._password.value;
    const confirm = this._confirm.value;
    this.setState({ userError: password !== confirm });
  };

  back = () => {
    this.props.router.push('/');
  }

  submit = async () => {
    const valid = this._form.checkValidity();
    if (!valid) return;

    const username = this._username.value;
    const password = this._password.value;
    const mobile = this._number.value;

    await this.props.registerAndLoginUser({
      username,
      password,
      mobile,
    });
  };

  render() {
    return (
      <NoHeaderFooter className={styles.root}>
        <Helmet title={`Sign Up | ${config.appName}`} />
        <Button className={styles.back} onClick={this.back} />
        <h1 className={styles.heading}>Sign Up</h1>
        <form className={styles.form} ref={ref => (this._form = ref)} onSubmit={this.onSubmit} >
          <div className={styles.container}>
            <FontAwesome className={cx('fa fa-envelope-o', styles.inputIcon)} />
            <input className={cx(styles.textInput, styles.username)} placeholder="User Name" type="text" id="username" ref={ref => (this._username = ref)} pattern={VALID_USERNAME} required />
          </div>
          <div className={styles.container}>
            <FontAwesome className={cx('fa fa-phone', styles.inputIcon)} />
            <input className={styles.textInput} placeholder="Mobile Number" type="tel" id="number" ref={ref => (this._number = ref)} pattern={VALID_MOBILE} required />
          </div>
          <div className={styles.container}>
            <FontAwesome className={cx('fa fa-lock', styles.inputIcon)} />
            <input className={styles.textInput} placeholder="Password" type="password" id="password" ref={ref => (this._password = ref)} pattern={VALID_PASSWORD} required />
          </div>
          <div className={styles.container}>
            <FontAwesome className={cx('fa fa-lock', styles.inputIcon)} />
            <input className={styles.textInput} placeholder="Confirm" type="password" id="confirm" ref={ref => (this._confirm = ref)} onChange={this.confirmPassword} />
          </div>
          {this.state.userError && (
            <div className={styles.error}>
              {'Passwords do not match'}
            </div>
          )}
          <input className={styles.button} type="submit" onClick={this.submit} value="Join" />
        </form>
      </NoHeaderFooter>
    );
  }
}
