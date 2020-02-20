import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Menu from './components/Menu';
import Home from './pages/Home';
import MoneyFlow from './pages/MoneyFlow';
import EstimatedWorth from './pages/EstimatedWorth';
import Notfound from './pages/NotFound';

import './css/App.css';


class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <div>
            <Switch>
              <Route exact path="/">
                <Menu />
                <Home />
              </Route>
              <Route path="/moneyflow">
                <Menu />
                <MoneyFlow />
              </Route>
              <Route path="/estimatedworth">
                <Menu />
                <EstimatedWorth />
              </Route>
              <Route>
                <Notfound />
              </Route>
            </Switch>
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
