import React from "react";
import {
  Navbar, NavbarBrand,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import { Link } from "react-router-dom";
// import '../../../constants/strings'
import * as Strings from '../../../constants/strings'
import * as Routes from '../../../constants/apiRoutes'
import {SELECTED_INSTITUTE} from "../../../redux/actions/login-action"
import { connect } from 'react-redux';
import { Dispatcher, Constants } from "../../../flux";

const axios = require('axios');


class SidebarMainNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      name: "WorldCerts",
    }
  }





  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }



  handleToggleSidebar() {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLE_SIDEBAR
    });
  }
  render() {
    // const { hideLogoText } = this.props;
    console.log(this.state)
    return (
      <div className="main-navbar">
        <Navbar
          className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
          type="light"
        >
          {/* <NavbarBrand
            className="w-100"
            href="#"
            style={{ lineHeight: "25px" }}
          > */}
          <div className="d-table m-auto">
           
            <img
                id="main-logo"
                className="d-inline-block align-top mr-1"
                style={{ maxWidth: "25px" }}
                src={require("../../../images/logo1.png")}
                alt="Shards Dashboard"
              />
              {  (
                <span className="d-md-inline ml-100">
                  {this.state.name}
                </span>
              )}
          </div>
          {/* </NavbarBrand> */}
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
const mapStateToProps = (state) => {
  console.log(Strings.REDUX, state);
  return {
    selectedInstituteName:state.user_reducer.selectedInstituteName,
    userData:state.user_reducer.user
    // Title: state.pageTitle,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    SELECTED_INSTITUTE: (user) => {
      dispatch(SELECTED_INSTITUTE(user))
    },
    
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SidebarMainNavbar);

// export default SidebarMainNavbar;
