import React, { Component } from 'react';
import { Link } from 'react-router';
import { Sticky } from 'react-sticky';
import cx from 'classnames';
import Scrollable from 'app/components/Scrollable';

import FontAwesome from 'app/components/FontAwesome';
import Nav from './Nav';
import * as appPropTypes from 'app/components/propTypes';

import styles from './styles.styl';


export default class SiteHeader extends Component {
  static contextTypes = {
    location: appPropTypes.location,
  };

  componentDidMount() {
    window.addEventListener('click', this.handleDismiss);
  }

  componentWillUnmount() {
    window.removeEventListener('click', this.handleDismiss);
  }

  handleDismiss = (e) => {
    if (!this.refs.toggle.checked) return;
    if (this.refs.sidebar.contains(e.target)) return;
    if (this.refs.label.contains(e.target)) return;
    if (this.refs.toggle.contains(e.target)) return;
    this.refs.toggle.checked = false;
  };

  render() {
    return (
      <header className={styles.root}>
        <div className={styles.column}>
          <span className={styles.header}>Nathan Hardy</span>
          <span className={styles.tagline}>Developer</span>
        </div>
        <Sticky className={styles.sticky} stickyClassName={styles.isSticky}>
          <div className={cx(styles.column, styles.navBar)}>
            <label htmlFor="sidebarToggle" ref="label">
              <FontAwesome className="fa-bars" />
            </label>
            <Link to="/" className={styles.siteName}>nhardy.id.au</Link>
            <Nav className={styles.nav} />
          </div>
        </Sticky>
        <input
          id="sidebarToggle"
          type="checkbox"
          className={styles.checkbox}
          ref="toggle" />
        <aside className={styles.aside} ref="sidebar">
          <Scrollable className={styles.scrollable} wrapperClassName={styles.scrollableInner}>
            <label className={styles.toggle} htmlFor="sidebarToggle">
              <FontAwesome className="fa-close" />
            </label>
            <Nav mode="vertical" />
            <div>
              <h2>What is Lorem Ipsum?</h2>
              <p>
                <strong>Lorem Ipsum</strong> is simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
              <h2>Why do we use it?</h2>
              <p>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters,
                as opposed to using 'Content here, content here', making it look like readable English.
                Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text,
                and a search for 'lorem ipsum' will uncover many web sites still in their infancy.
                Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
              </p>
              <h2>Where does it come from?</h2>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random text.
                It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
                Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure
                Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,
                discovered the undoubtable source.
                Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil)
                by Cicero, written in 45 BC.
                This book is a treatise on the theory of ethics, very popular during the Renaissance.
                The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
              </p>
              <p>
                The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.
                Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form,
                accompanied by English versions from the 1914 translation by H. Rackham.
              </p>
            </div>
          </Scrollable>
        </aside>
      </header>
    );
  }
}
