import React, { PropTypes } from 'react';

import styles from './Greetings.css';

const Greetings = ({ name }) => (
  <div className={styles.colorful}>
    Hello, {name}!
  </div>
);

Greetings.propTypes = {
  name: PropTypes.string.isRequired
};

export default Greetings;
