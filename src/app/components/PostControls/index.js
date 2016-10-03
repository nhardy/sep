import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import Button from 'app/components/Button';
import FontAwesome from 'app/components/FontAwesome';

import styles from './styles.styl';


@connect(null, {})
export default class PostControls extends Component {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    hot: PropTypes.number.isRequired,
    upVote: PropTypes.func.isRequired,
    downVote: PropTypes.func.isRequired,
  };

  upVote = () => this.props.upVote(this.props.id);

  downVote = () => this.props.downVote(this.props.id);

  render() {
    const { className, hot } = this.props;
    return (
      <div className={cx(styles.root, className)}>
        <span className={styles.hot}>{hot || 0}</span>
        <Button className={cx(styles.button, styles.positive)} role="button" onClick={this.upVote}>
          <FontAwesome className="fa-arrow-circle-up" />
        </Button>
        <Button className={cx(styles.button, styles.negative)} role="button" onClick={this.downVote}>
          <FontAwesome className="fa-arrow-circle-down" />
        </Button>
      </div>
    );
  }
}
