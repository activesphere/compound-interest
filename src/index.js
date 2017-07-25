import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import PersonalFinance from './PersonalFinance.jsx';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<PersonalFinance />, document.getElementById('root'));
registerServiceWorker();
