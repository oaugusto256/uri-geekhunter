import React from 'react';
import ReactDOM from 'react-dom';
import URIGeekHunter from './containers/uri-geekhunter';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/style.css';

ReactDOM.render(<URIGeekHunter />, document.getElementById('root'));
registerServiceWorker();
