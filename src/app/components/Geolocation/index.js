import { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { getLocation } from 'app/actions/location';


const GEOLOCATION_INTERVAL = 30 * 1000; // 30 seconds

@connect(null, { getLocation })
export default class AddPostView extends Component {
  static propTypes = {
    getLocation: PropTypes.func,
  };

  componentDidMount() {
    this.props.getLocation();
    this.interval = window.setInterval(() => this.props.getLocation(), GEOLOCATION_INTERVAL);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  render() { // eslint-disable-line class-methods-use-this
    // This is a component with no UI
    return null;
  }
}
