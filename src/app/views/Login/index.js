import React, { Component, PropTypes } from 'react';
import { withRouter, Link } from 'react-router';
import { routerShape } from 'react-router/lib/PropTypes';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import cx from 'classnames';
import { get } from 'lodash-es';

import config from 'app/config';
import * as appPropTypes from 'app/components/propTypes';
import NoHeaderFooter from 'app/layouts/NoHeaderFooter';
import FontAwesome from 'app/components/FontAwesome';
import Button from 'app/components/Button';
import { loginUser } from 'app/actions/users';
import { VALID_PASSWORD, VALID_USERNAME } from 'app/lib/validation';
import Image from 'app/components/Image';
import logo from 'app/assets/images/logo.png';

import styles from './styles.styl';


@connect(state => ({
  token: state.users.token,
}), { loginUser })
@withRouter
export default class LoginView extends Component {
  static propTypes = {
    router: routerShape,
    loginUser: PropTypes.func,
    token: PropTypes.string,
  };

  static contextTypes = {
    location: appPropTypes.location,
  };

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

  back = () => {
    this.props.router.push(this.getRedirect());
  }

  submit = async () => {
    const valid = this._form.checkValidity();
    if (!valid) return;

    const username = this._username.value;
    const password = this._password.value;

    await this.props.loginUser({
      username,
      password,
    });
  };

  render() {
    return (
      <NoHeaderFooter className={styles.root}>
        <Helmet title={`Login | ${config.appName}`} />
        <Button className={styles.back} onClick={this.back} />
        <Image src={logo} alt={'Stickies Logo'} />
        <form className={styles.form} ref={ref => (this._form = ref)} onSubmit={this.onSubmit} >
          <div className={styles.container}>
            <FontAwesome className={cx('fa fa-envelope-o', styles.inputIcon)} />
            <input className={cx(styles.textInput, styles.username)} placeholder="User Name" type="text" id="username" ref={ref => (this._username = ref)} pattern={VALID_USERNAME} required />
          </div>
          <div className={styles.container}>
            <FontAwesome className={cx('fa fa-lock', styles.inputIcon)} />
            <input className={styles.textInput} placeholder="Password" type="password" id="password" ref={ref => (this._password = ref)} pattern={VALID_PASSWORD} required />
          </div>
          <input className={styles.button} type="submit" onClick={this.submit} value="Sign In" />
        </form>
        <div className={styles.regContainer}>
          <span className={styles.regText}>{'Don\'t have an account? '}</span>
          <Link to={'/register'} className={styles.link}>{'Sign Up'}</Link>
        </div>
      </NoHeaderFooter>
    );
  }
}
