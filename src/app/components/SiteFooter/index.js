import React from 'react';

import config from 'app/config';
import FontAwesome from 'app/components/FontAwesome';

import styles from './styles.styl';


const SiteFooter = () => (
  <footer className={styles.root}>
    <div className={styles.column}>
      <div className={styles.heading}>
        <span className={styles.copyright}>Copyright {config.teamName + ' ' + (new Date()).getFullYear() }</span>
        <a href={config.githubUrl} target='_blank' title="Help Us Out!">
            <FontAwesome className="fa-github" />
        </a>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
