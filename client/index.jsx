import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, browserHistory, Switch} from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
 
// import AllReducers from ''

import HomePage from './components/homepage.jsx';
// import CentersPage from './components/centersPage.jsx';
// import AboutPage from './components/aboutPage.jsx';
// import AdminPanel from './components/adminPanelPage.jsx';
// import UserPanel from './components/userPanelPage.jsx';

const store = createStore(
  (state = {}) => state,
  applyMiddleware(thunk)
);

//put component into html page
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter history={browserHistory}>
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* <Route path="/api/v1/centers" component={CentersPage} />
        <Route path="/api/v1/about" component={AboutPage} />
        <Route path="/api/v1/user/admin_panel" component={AdminPanel} />
        <Route path="/api/v1/user/user_panel" component={UserPanel} /> */}
      </Switch>
    </BrowserRouter>
  </Provider>
  ,
document.getElementById('page-wrapper')
);