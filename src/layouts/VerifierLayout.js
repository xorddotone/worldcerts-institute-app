import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "shards-react";
import MainNavbar from "../components/layout/MainNavbar/MainNavbar";
import "../css/style.css"
import MainSidebar from "../components/layout/MainSidebar/MainSidebar";

const VerifierLayout = ({ children, noNavbar, noFooter }) => (
  <div className="verifierStyling" >
    <Container>
      {/* <MainSidebar /> */}

      {!noNavbar && <MainNavbar />}
      {children}
    </Container>
  </div>
);

VerifierLayout.propTypes = {
  /**
   * Whether to display the navbar, or not.
   */
  noNavbar: PropTypes.bool,
  /**
   * Whether to display the footer, or not.
   */
  noFooter: PropTypes.bool
};

VerifierLayout.defaultProps = {
  noNavbar: true,
  noFooter: true
};

export default VerifierLayout;
