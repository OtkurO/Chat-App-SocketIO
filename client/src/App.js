import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/Login/Login';
import Chat from './components/Chat/Chat';

const App = () => (
  <React.Fragment>
    <CssBaseline />
    <Router>
      <Route path='/' exact component={Login} />
      <Route path='/chat' component={Chat} />
    </Router>
  </React.Fragment>
);

export default App;
