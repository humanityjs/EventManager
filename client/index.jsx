import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, browserHistory, Switch} from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import allReducers from './reducers/reducersIndex.jsx';

 
// import allReducers from ''

import HomePage from './components/homepage.jsx';
// import CentersPage from './components/centersPage.jsx';
// import AboutPage from './components/aboutPage.jsx';
// import AdminPanel from './components/adminPanelPage.jsx';
// import UserPanel from './components/userPanelPage.jsx';



//put component into html page
ReactDOM.render(<HomePage />, document.getElementById('page-wrapper')
);