import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Redirect } from "react-router-dom";
import  store  from '../src/redux/store/index';
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
        {/* <PersistGate loading={null} persistor={persistor}> */}
          <Router history={history}>
            <div>
              {routes.map((route, index) => {
                console.log(route)
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
        {/* </PersistGate> */}
      </Provider>
    )
  }
}

export default App;