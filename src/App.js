import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { store, persistor } from '../src/Redux/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import history from './config/history'
import routes from "./routes";

import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <Router>
            <div>
              {routes.map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={withTracker(props => {
                      return (
                        <route.layout {...props}>
                          <route.component {...props} />
                        </route.layout>
                      );
                    })}
                  />
                );
              })}
            </div>
          </Router> */}
          <Router history={history}>
            <div>
              {routes.map((route, index) => {
                return (
                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={(props => {
                      return (
                        <route.layout {...props}>
                          <route.component {...props} />
                        </route.layout>
                      );
                    })}
                  />
                );
              })}
            </div>
          </Router>
        </PersistGate>
      </Provider>
    )
  }
}

export default App;