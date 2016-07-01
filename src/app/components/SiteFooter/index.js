import React from 'react';

import FontAwesome from 'app/components/FontAwesome';

import styles from './styles.styl';


const SiteFooter = () => (
  <footer className={styles.root}>
    <div className={styles.column}>
      <div className={styles.wrapper}>
        <div className={styles.info}>
          <span>{(new Date()).getFullYear()}</span>
        </div>
        <div className={styles.info}>
          <FontAwesome className="fa-linkedin-square" />
        </div>
        <div className={styles.info}>
          Foo
        </div>
        <div className={styles.info}>
          Foo
        </div>
        <div className={styles.info}>
          Foo
        </div>
        <div className={styles.info}>
          Foo
        </div>
        <div className={styles.info}>
          Foo
        </div>
        <div className={styles.info}>
          Foo
        </div>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
