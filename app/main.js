// import Root from './containers/Root';

import React from 'react';
import ReactDOM from 'react-dom';
import Greeting from './components/greetings';

import './styles/base.css';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Greeting name="World" />,
  rootElement
);
