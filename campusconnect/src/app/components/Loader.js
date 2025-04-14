import React from 'react';
import styles from './loader.module.css'; // Create a CSS module for styling

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner}>
        <div className={styles.inner}></div>
        <div className={styles.inner}></div>
        <div className={styles.inner}></div>
      </div>
    </div>
  );
};

export default Loader;