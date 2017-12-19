import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, browserHistory, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';



import allReducers from './reducers/reducersIndex'
import HomePage from './components/homepage.jsx';
// import CentersPage from './components/centersPage.jsx';
// import AboutPage from './components/aboutPage.jsx';
import Dashboard from './components/dashboard';
// import UserPanel from './components/userPanelPage.jsx';

const store = createStore(
  allReducers,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )

)

//put component into html page
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* <Route path="/api/v1/centers" component={CentersPage} />
        <Route path="/api/v1/about" component={AboutPage} /> */}
        <Route path="/dashboard" component={Dashboard} />
        {/*<Route path="/api/v1/user/user_panel" component={UserPanel} /> */}
      </Switch>
    </BrowserRouter>
  </Provider>
  , document.getElementById('page-wrapper')
);