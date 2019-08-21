import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";

// Route Views
import Home from "./views/Home";
import InstituteRegister from "./views/InstituteRegistration";

export default [
  {
    path: "/",
    exact: true,
    layout: DefaultLayout,
    component: () => <Redirect to="/institute_registration" />
  },
  {
    path: "/institute_registration",
    layout: DefaultLayout,
    component: InstituteRegister
  },
];
