import React from 'react';
import ReactDOM from 'react-dom';
import Game from './game';
import './styles/index.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Game />, document.getElementById('root'));
serviceWorker.unregister();
