import React, { Component } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import { formatTimestamp } from 'app/lib/moment';
import * as appPropTypes from 'app/components/propTypes';
import Image from 'app/components/Image';
import Button from 'app/components/Button';
import FontAwesome from 'app/components/FontAwesome';
import PostControls from 'app/components/PostControls';

import styles from './styles.styl';


@connect(state => ({
  now: state.time.timestamp,
}))
export default class PostDetail extends Component {
  static propTypes = {
    now: appPropTypes.timestamp,
    post: appPropTypes.post,
  };

  state = {
    expanded: false,
  };

  toggle = () => this.setState({ expanded: !this.state.expanded });

  render() {
    const { now, post: { id, username, timestamp, text, score, image } } = this.props;
    const { expanded } = this.state;
    return (
      <div className={styles.root}>
        <div className={styles.info}>
          <span>{username} {`(${formatTimestamp(timestamp, now)})`}</span>
        </div>
        {image && (
          <div className={cx(styles.imageWrapper, { [styles.expanded]: expanded })}>
            <Image src={image} alt="Post" />
            <Button className={styles.expand} onClick={this.toggle}>
              <FontAwesome className="fa-arrows-alt" />
            </Button>
          </div>
        )}
        <div className={styles.body}>{text}</div>
        <div className={styles.controls}>
          <PostControls id={id} score={score} showCommentsBtn />
        </div>
      </div>
    );
  }
}
