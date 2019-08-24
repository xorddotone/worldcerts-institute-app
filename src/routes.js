import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";
import  AuthLayout  from "./layouts/AuthLayout";

// Route Views
import Register from "./views/Register";
import Login from "./views/Login";
import UserProfile from './views/UserProfile'
import InstituteRegister from "./views/InstituteRegistration";

export default [
  {
    path: "/",
    exact: true,
    layout: AuthLayout,
    component: () => <Redirect to="/signin" />
  },
  {
    path: "/institute_registration",
    layout: DefaultLayout,
    component: InstituteRegister
  },
  {
    path: "/userProfile",
    layout: DefaultLayout,
    component: UserProfile
  },
  {
    path: "/register",
    layout: AuthLayout,
    component: Register
  },
  
  {
    path: "/signin",
    layout: AuthLayout,
    component: Login
  },
];

