import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { GridList, GridTile } from 'material-ui/GridList';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

import config from 'app/config';
import LocationPOIControl from 'app/components/LocationPOIControl';
import { getposts } from 'app/actions/postsActions';

import styles from './styles.styl';

@connect((state) => ({
  posts: state.posts.items,
}), { getposts })
export default class PostsView extends Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    posts: PropTypes.array,
    getposts: PropTypes.func,
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      this.setState({
        latitude,
        longitude,
      });

      console.log('this.props', this.props);
      console.log('actions', getposts);

      this.props.getposts({
        latitude,
        longitude,
      });
    });
  }

  render() {
    const { posts } = this.props;

    return (
      <div>
        <AppBar title={config.appName} />
        <List>
          <ListItem>
            <LocationPOIControl />
          </ListItem>
        </List>

        <Divider />

        <div className={styles.tileRoot}>
          <h1>
            <FontIcon className="material-icons" className={styles.icon}>Post</FontIcon>
            <span>{'Nearby Posts\''}</span>
          </h1>

          <GridList cellHeight={200} className={styles.gridList}>
            {posts.map((post) => (
              <Link to={`/posts/${post.id}`}>
                <GridTile
                  key={post.id}
                  title={post.name}
                  subtitle={<span><b>{post.stats.posts}</b></span>}
                  actionIcon={<IconButton><StarBorder color="white" /></IconButton>} />
              </Link>
            ))}
          </GridList>
        </div>
      </div>
    );
  }
}
