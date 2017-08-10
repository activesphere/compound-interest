import React from 'react';
import { render } from 'react-snapshot';
import './index.css';

import registerServiceWorker from './registerServiceWorker';
import App from './App.jsx';

render(<App />, document.getElementById('root'));
registerServiceWorker();
