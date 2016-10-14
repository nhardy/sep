import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import { upvote, downvote } from 'app/actions/votes';
import Button from 'app/components/Button';
import FontAwesome from 'app/components/FontAwesome';

import styles from './styles.styl';


@connect(null, { upvote, downvote })
export default class PostControls extends Component {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    hot: PropTypes.number.isRequired,
    upvote: PropTypes.func.isRequired,
    downvote: PropTypes.func.isRequired,
    showCommentsBtn: PropTypes.bool,
  };
  defaultProps = {
    showCommentsBtn: false,
  };

  upvote = () => this.props.upvote(this.props.id);

  downvote = () => this.props.downvote(this.props.id);

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
          <Button className={cx(styles.button, styles.positive)} role="button" onClick={this.upvote}>
            <FontAwesome className="fa-arrow-circle-up" />
          </Button>
          <Button className={cx(styles.button, styles.negative)} role="button" onClick={this.downvote}>
            <FontAwesome className="fa-arrow-circle-down" />
          </Button>
        </div>
      </div>
    );
  }
}
