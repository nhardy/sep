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
    showCommentsBtn: PropTypes.bool,
  };
  defaultProps = {
    showCommentsBtn: false,
  };

  upVote = () => this.props.upVote(this.props.id);

  downVote = () => this.props.downVote(this.props.id);

  render() {
    const { className, hot, showCommentsBtn } = this.props;
    return (
      <div className={cx(styles.root, showCommentsBtn ? styles.withComment : styles.noComment, className)}>
        {showCommentsBtn && (
          <div className={styles.commentContainer}>
            <FontAwesome className="fa-comment-o" />
          </div>
        )}
        <div className={styles.end}>
          <span className={styles.hot}>{hot || 0}</span>
          <Button className={cx(styles.button, styles.positive)} role="button" onClick={this.upVote}>
            <FontAwesome className="fa-arrow-circle-up" />
          </Button>
          <Button className={cx(styles.button, styles.negative)} role="button" onClick={this.downVote}>
            <FontAwesome className="fa-arrow-circle-down" />
          </Button>
        </div>
      </div>
    );
  }
}
