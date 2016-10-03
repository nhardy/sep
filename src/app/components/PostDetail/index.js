import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import Image from 'app/components/Image';
import Button from 'app/components/Button';
import FontAwesome from 'app/components/FontAwesome';
import PostControls from 'app/components/PostControls';

import styles from './styles.styl';


export default class PostDetail extends Component {
  static propTypes = {
    id: PropTypes.string,
    text: PropTypes.string,
    upvotes: PropTypes.number,
    image: PropTypes.string,
  };

  state = {
    expanded: false,
  };

  toggle = () => this.setState({ expanded: !this.state.expanded });

  render() {
    const { id, text, upvotes, image } = this.props;
    const { expanded } = this.state;
    return (
      <div className={styles.root}>
        { /* TODO: Needs to be replaced with user, location, now - time */ }
        <div className={styles.info}>
          <span>{'Test User'} @ {'UTS'} {'(1h)'}</span>
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
        <div className={styles.controlbar}>
          <PostControls id={id} hot={upvotes} comments={true} />
        </div>
      </div>
    );
  }
}
