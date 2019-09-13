import React, { Component } from 'react';
import { BrowserRouter as Router, Route,Redirect } from "react-router-dom";
import  store  from '../src/redux/store/index';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import history from './config/history'
// import routes from "./routes";
import * as routes from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import { connect } from 'react-redux';
import * as Strings from './constants/strings'
import Register from './views/Register';
import Login from './views/Login';
import  AuthLayout  from "./layouts/AuthLayout";



class App extends Component {
  render() {
    return (
      <>
      
        
          <Router history={history}>
            <div>
            {(this.props.isLogin)?(
              (this.props.userData.isVerified)?(
                routes.routes1.map((route, index) => {
                  // console.log(route)
                  return (
  
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={(props => {
                        console.log(props)
                        return (
                          <route.layout {...props}>
                            <route.component {...props} />
                          </route.layout>
                        );
                      })}
                    />
                  );
                })
              ):(
                routes.routes1.map((route, index) => {
                  console.log(route)
                  return (
  
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      component={(props => {
                        console.log(props)
                        return (
                          <route.layout {...props}>
                            <route.component {...props} />
                          </route.layout>
                        );
                      })}
                    />
                  );
                })
              )
              
            ):(
              
                
              
               
              routes.routes2.map((route, index) => {
                console.log(route)
                return (

                  <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={(props => {
                      console.log(props)
                      return (
                        <route.layout {...props}>
                          <route.component {...props} />
                        </route.layout>
                      );
                    })}
                  />
                );
              }) 
               
               
              
              
            )}
              
            </div>
          </Router>
        
      
      </>
    )
  }
}


const mapStateToProps = (state) => {
  console.log(Strings.REDUX, state);
  return {
    userData: state.user_reducer.user,
    isLogin:state.user_reducer.is_login
    // Title: state.pageTitle,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // USER_DATA: (user) => {
    //   dispatch(USER_DATA(user))
    // },
    // LOGIN_STATUS: (statusLogin) => {
    //   dispatch(LOGIN_STATUS(statusLogin))
    // },
    // UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;