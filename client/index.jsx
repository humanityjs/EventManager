import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, browserHistory, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import jwt from 'jsonwebtoken';



import allReducers from './reducers/reducersIndex'
import HomePage from './components/homepage.jsx';
// import CentersPage from './components/centersPage.jsx';
import AboutPage from './components/aboutPage.jsx';
import Dashboard from './components/dashboard';
// import UserPanel from './components/userPanelPage.jsx';
import setAuthToken from './utils/setAuthorizationToken';
import { setCurrentUser } from '../actions/signInActions'


const store = createStore(
  allReducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

//put component into html page
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* <Route path="/api/v1/centers" component={CentersPage} /> */}
        <Route exact path="/about" component={AboutPage} /> 
        <Route exact path="/dashboard" component={Dashboard} />
        {/*<Route path="/api/v1/user/user_panel" component={UserPanel} /> */}
      </Switch>
    </Router>
  </Provider>
  , document.getElementById('page-wrapper')
);