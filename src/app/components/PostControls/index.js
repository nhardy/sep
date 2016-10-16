import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { get } from 'lodash-es';
import cx from 'classnames';

import { getVotes, upvote, downvote, unvote } from 'app/actions/votes';
import Button from 'app/components/Button';
import FontAwesome from 'app/components/FontAwesome';

import styles from './styles.styl';


@connect((state, { id, score }) => {
  const updated = get(state.votes.posts[id], 'score');
  const value = get(state.votes.posts[id], 'value');
  return {
    score: updated === 0 ? updated : updated || score,
    value,
  };
}, { getVotes, upvote, downvote, unvote })
export default class PostControls extends Component {
  static propTypes = {
    className: PropTypes.string,
    id: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    value: PropTypes.number,
    getVotes: PropTypes.func.isRequired,
    upvote: PropTypes.func.isRequired,
    downvote: PropTypes.func.isRequired,
    unvote: PropTypes.func.isRequired,
    showCommentsBtn: PropTypes.bool,
  };

  defaultProps = {
    showCommentsBtn: false,
  };

  componentDidMount() {
    this.props.getVotes(this.props.id);
  }

  upvote = () => {
    const { id, value } = this.props;
    value !== 1
      ? this.props.upvote(id)
      : this.props.unvote(id);
  };

  downvote = () => {
    const { id, value } = this.props;
    value !== -1
      ? this.props.downvote(id)
      : this.props.unvote(id);
  };

  render() {
    const { className, score, value, showCommentsBtn } = this.props;
    return (
      <div className={cx(styles.root, showCommentsBtn ? styles.withComment : styles.noComment, className)}>
        {showCommentsBtn && (
          <div className={styles.commentContainer}>
            <FontAwesome className="fa-comment-o" />
          </div>
        )}
        <div className={styles.end}>
          <span className={styles.score}>{score}</span>
          <Button className={cx(styles.button, styles.positive, { [styles.selected]: value === 1 })} onClick={this.upvote}>
            <FontAwesome className="fa-arrow-circle-up" />
          </Button>
          <Button className={cx(styles.button, styles.negative, { [styles.selected]: value === -1 })} onClick={this.downvote}>
            <FontAwesome className="fa-arrow-circle-down" />
          </Button>
        </div>
      </div>
    );
  }
}
