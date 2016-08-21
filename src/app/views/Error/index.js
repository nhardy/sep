import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';

import DefaultLayout from 'app/layouts/Default';


export default class HomeView extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    route: PropTypes.shape({
      status: PropTypes.number,
    }),
  };

  render() {
    const { status } = this.props.route;

    const message = status === 404
      ? 'The requested page could not be found'
      : 'An unexpected error ocurred. Please try again later';

    return (
      <DefaultLayout>
        <Helmet title={`HTTP ${status} Error | Example Application`} />
        <h1>HTTP {status} Error</h1>
        <p>{message}</p>
      </DefaultLayout>
    );
  }
}
