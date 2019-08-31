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
import {SELECTED_INSTITUTE} from "../../../redux/actions/login-action"
import { connect } from 'react-redux';



class SidebarMainNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      name: "WorldCerts"
    }
    this.onClickInstitute = this.onClickInstitute.bind(this)
  }
  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  onClickInstitute(val) {
    console.log(val, "vallllllllllllll")
    this.setState({
      name: val
    })
    this.props.SELECTED_INSTITUTE(val)
  }


  render() {
    // const { hideLogoText } = this.props;
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
            <NavItem tag={Dropdown} caret toggle={this.toggleUserActions.bind(this)}>
              <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
                <img
                  className="user-avatar rounded-circle mr-2"
                  src={require("../../../images/user")}
                  style={{ width: "9%" }}
                  alt="User"
                />

                <span className="d-none d-md-inline-block">{this.state.name}</span>
              </DropdownToggle>
              <Collapse tag={DropdownMenu} right small open={this.state.visible}>
                <DropdownItem to="#" >
                  <div onClick={() => this.onClickInstitute("Profile")}><i className="material-icons">&#xE7FD;</i> Profile </div>
                </DropdownItem>
                <DropdownItem to="#" >
                  <div onClick={() => this.onClickInstitute("Edit Profile")}> <i className="material-icons">&#xE8B8;</i> Edit Profile</div>
                </DropdownItem>
                <DropdownItem to="#" >
                  <div onClick={() => this.onClickInstitute("Files")}><i className="material-icons">&#xE2C7;</i> Files</div>
                </DropdownItem>
              </Collapse>
            </NavItem>
            {/* <img
                id="main-logo"
                className="d-inline-block align-top mr-1"
                style={{ maxWidth: "25px" }}
                src={require("../../../images/logo1.png")}
                alt="Shards Dashboard"
              />
              {!hideLogoText && (
                <span className="d-none d-md-inline ml-100">
                  WorldCerts
                </span>
              )} */}
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
    selectedInstituteName:state.user_reducer.selectedInstituteName
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
