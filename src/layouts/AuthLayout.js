import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";
import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";

const AuthLayout = ({ children, noNavbar, noFooter }) => (
  <Container style = {{width: "60%" , marginTop: "5em"}}>
      {/* <MainSidebar /> */}
      
        {!noNavbar && <MainNavbar />}
        {children}
  </Container>
);

AuthLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

AuthLayout.defaultProps = {
  noNavbar: false,
  noFooter: false
};

export default AuthLayout;
