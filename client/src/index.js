import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import Login from './login';
import Logout from './logout';
import Board from './board';
// import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <Route exact path="/" component={App} />
    <Route path="/login" component={Login} />
    <Route path="/logout" component={Logout} />
    <Route path="/board" component={Board} />
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))


/*

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
*/
