import React from "react";
import { Navbar, NavbarBrand } from "shards-react";


class SidebarMainNavbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { hideLogoText } = this.props;
    return (
      <div className="main-navbar">
        <Navbar
          className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
          type="light"
        >
          <NavbarBrand
            className="w-100"
            href="#"
            style={{ lineHeight: "25px" }}
          >
            <div className="d-table m-auto">
              <img
                id="main-logo"
                className="d-inline-block align-top mr-1"
                style={{ maxWidth: "25px" }}
                src={require("../../../images/shards-dashboards-logo.svg")}
                alt="Shards Dashboard"
              />
              {!hideLogoText && (
                <span className="d-none d-md-inline ml-100">
                  WorldCerts
                </span>
              )}
            </div>
          </NavbarBrand>
          <a
            className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
            onClick={this.handleToggleSidebar}
          >
            <i className="material-icons">&#xE5C4;</i>
          </a>
        </Navbar>
      </div>
    );
  }
}

export default SidebarMainNavbar;
