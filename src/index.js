import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserInfo from './components/UserInfo';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <Router>
        <div>
        <Route path="/" exact component={App} />
        <Route path="/user/:email" component={UserInfo} />
        </div>
    </Router>
    , document.getElementById('root'));
registerServiceWorker();
