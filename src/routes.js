import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";
import  AuthLayout  from "./layouts/AuthLayout";

// Route Views
import Register from "./views/Register";
import Login from "./views/Login";
import UserProfile from './views/UserProfile'
import InstituteRegistration from "./views/InstituteRegistration";
import EmailVerification from "./views/EmailVerification";
import ManageInstitutes from "./views/ManageInstitutes";
import ManageClassifications from "./views/ManageClassifications";
import AddClassification from "./views/AddClassification";

export default [
  {
    path: "/",
    exact: true,
    layout: AuthLayout,
    component: () => <Redirect to="/signin" />
  },
  {
    path: "/manageInstitute",
    layout: DefaultLayout,
    component: ManageInstitutes
  },
  {
    path: "/institute_registration",
    layout: DefaultLayout,
    component: InstituteRegistration
  },
  {
    path: "/manageClassification",
    layout: DefaultLayout,
    component: ManageClassifications
  },
  {
    path: "/addClassification",
    layout: DefaultLayout,
    component: AddClassification
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

  {
    path: "/emailVerification",
    layout: AuthLayout,
    component: EmailVerification
  },
];

