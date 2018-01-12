import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, browserHistory, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt from 'jsonwebtoken';


import store from './store';
import allReducers from './reducers/reducersIndex';
import HomePage from './components/homepage.jsx';
import CentersPage from './components/centersPage.jsx';
import AboutPage from './components/aboutPage.jsx';
import AdminPanelPage from './components/adminPanelPage.jsx';
import AddCenterPage from './components/addCenterPage';
import AddEvent from './components/addEventPage';
import ModifyEvent from './components/modifyEventPage';
import ViewCenter from './components/viewCenterPage';
import UserPanel from './components/userPanelPage.jsx';
import setAuthToken from './utils/setAuthorizationToken';
import { setCurrentUser } from './actions/signInActions';
import style from './sass/style.scss';


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
        <Route exact path="/view-centers" component={CentersPage} />
        <Route exact path="/add-center" component={AddCenterPage} />
        <Route exact path="/about" component={AboutPage} /> 
        <Route exact path="/admin-centers" component={AdminPanelPage} />
        <Route exact path="/dashboard" component={UserPanel} />
        <Route exact path="/add-event" component={AddEvent} />
        <Route exact path="/modify-event" component={ModifyEvent} />
        <Route exact path="/view-center-event" component={ViewCenter} />
      </Switch>
    </Router>
  </Provider>
  , document.getElementById('page-wrapper')
);