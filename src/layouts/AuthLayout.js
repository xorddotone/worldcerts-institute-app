import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";
import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import "../css/style.css"
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";

const AuthLayout = ({ children, noNavbar, noFooter }) => (
  <div  className = "authStyling" >
  <Container>
      {/* <MainSidebar /> */}
      
        {!noNavbar && <MainNavbar />}
        {children}
  </Container>
  </div>
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
  noNavbar: true,
  noFooter: true
};

export default AuthLayout;
