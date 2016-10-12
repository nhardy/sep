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
    const { now, post: { id, timestamp, text, upvotes, image } } = this.props;
    const { expanded } = this.state;
    return (
      <div className={styles.root}>
        { /* TODO: Needs to be replaced with user, location, now - time */}
        <div className={styles.info}>
          <span>{'Test User'} @ {'UTS'} {`(${formatTimestamp(timestamp, now)})`}</span>
        </div>
        {image && (
          <div className={cx(styles.imageWrapper, { [styles.expanded]: expanded })}>
            <Image src={image} alt="Post" />
            <Button className={styles.expand} onClick={this.toggle}>
              <FontAwesome className="fa-arrows-alt" />
            </Button>
          </div>
        )}
        <PostControls id={id} hot={upvotes} />
        <div className={styles.body}>{text}</div>
      </div>
    );
  }
}
