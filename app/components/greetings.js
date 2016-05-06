import React, { PropTypes } from 'react';

import styles from './greetings.css';

const greetings = ({ name }) => (
  <div className={styles.gray}>
    <h1>Welcome</h1>
    Hello, {name}!
  </div>
);

greetings.propTypes = {
  name: PropTypes.string.isRequired
};

export default greetings;
