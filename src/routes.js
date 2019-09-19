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
import IssueCertificate from "./views/IssueCertificate";
import SingleCertificate from "./views/SingleCertificate";
import Settings from "./views/settings";
import Home from "./views/Home";
import AccountActivation from './views/accountActivation'

export const routes1= [
  {
    path: "/",
    exact: true,
    layout: AuthLayout,
    component: () => <Redirect to="/signin" />
  },
  {
    path: "/manage_organization",
    layout: DefaultLayout,
    component: ManageInstitutes
  },
  {
    path: "/organization_registration",
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
    exact: true,

    path: "/settings/userProfile",
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
  {
    path: "/issueCertificate",
    layout: DefaultLayout,
    component: IssueCertificate
  },
  {

    path: "/Certificate",
    layout: DefaultLayout,
    component: SingleCertificate
  },
  {
    path: "/account_activation",
    layout: DefaultLayout,
    component: AccountActivation
  },
  {
    exact: true,

    path: "/settings",
    layout: DefaultLayout,
    component: Settings
  },
  {
    path: "/home",
    layout: DefaultLayout,
    component: Home
  },
  // {
  //   // path: "/userProfile",
  //   layout: DefaultLayout,
  //   component: () => <Redirect to="/home" />
  // },
];
export const routes2= [
  {
    path: "/",
    exact: true,
    layout: AuthLayout,
    component: () => <Redirect to="/signin" />
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
  {
    path: "/issueCertificate",
    layout: DefaultLayout,
    component: () => <Redirect to="/signin" />
  },
  {

    path: "/Certificate",
    layout: DefaultLayout,
    component: SingleCertificate
  },
  {
    path: "/account_activation",
    layout: DefaultLayout,
    component: () => <Redirect to="/signin" />
    
  },
  {
    path: "/settings",
    layout: DefaultLayout,
    component: () => <Redirect to="/signin" />
    
  },
  {
    path: "/home",
    layout: DefaultLayout,
    component: () => <Redirect to="/signin" />
    
  },
  {
    path: "/manage_organization",
    layout: DefaultLayout,
    component: () => <Redirect to="/signin" />
  },
  {
    path: "/organization_registration",
    layout: DefaultLayout,
    component: () => <Redirect to="/signin" />
  },
  {
    path: "/manageClassification",
    layout: DefaultLayout,
    component: () => <Redirect to="/signin" />
  },
  {
    path: "/addClassification",
    layout: DefaultLayout,
    component: () => <Redirect to="/signin" />
  },
  {
    path: "/userProfile",
    layout: DefaultLayout,
    component: () => <Redirect to="/signin" />
  },
  // {
  //   // path: "/userProfile",
  //   layout: AuthLayout,
  //   component: () => <Redirect to="/signin" />
  // },
];

export const routes3= [
  {
    path: "/",
    exact: true,
    layout: AuthLayout,
    component: () => <Redirect to="/signin" />
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
  {
    path: "/manage_organization",
    layout: DefaultLayout,
    component: ManageInstitutes
  },
  {
    path: "/organization_registration",
    layout: DefaultLayout,
    component: InstituteRegistration
  },
  {
    exact: true,
    path: "/settings/userProfile",
    layout: DefaultLayout,
    component: UserProfile
  },
  {
    path: "/account_activation",
    layout: DefaultLayout,
    component: AccountActivation
  },
  {
    exact: true,
    path: "/settings",
    layout: DefaultLayout,
    component: Settings
  },
  {
    path: "/home",
    layout: DefaultLayout,
    component: Home
  },
];

