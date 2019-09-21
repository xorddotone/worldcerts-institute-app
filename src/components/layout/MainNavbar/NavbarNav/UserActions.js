import React from "react";
import { Link } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";
import { connect } from 'react-redux';
import * as Strings from '../../../../constants/strings'
import {USER_DATA,LOGIN_STATUS,SELECTED_INSTITUTE} from "../../../../redux/actions/login-action"
import {TOGGLE} from "../../../../redux/actions/dashboard-action"
import "../../../../css/style.css"



class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }
  onLogoutClick(ev){
    let temp={}
    let selectedInstituteName= {
      name: 'Select Organization',
      id: '',
      url: '',
      email: '',
      certificateStore: ''
  }

    this.props.SELECTED_INSTITUTE(selectedInstituteName)
    this.props.USER_DATA(temp)
    this.props.LOGIN_STATUS(false)
    this.props.TOGGLE_SWITCH(false)
    // console.log("inside")
  }

  render() {
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
        <img
            style={{width:'2em'}}
            className="user-avatar rounded-circle mr-2 userImage"
            src={require("../../../../images/user")}
            alt="User Avatar"
          />{" "}
           
          
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          {/* <DropdownItem tag={Link} to="/userProfile">
            <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem> */}
          {/* <DropdownItem tag={Link} to="edit-user-profile">
            <i className="material-icons">&#xE8B8;</i> Edit Profile
          </DropdownItem> */}
          <DropdownItem  to="">
            <i className="material-icons"></i> {this.props.userData.name} <br/> 
            <span style={{fontSize:'12px'}}><i className="material-icons"></i>  Administrator</span>
          </DropdownItem>
          {/* <DropdownItem  to="">
            <i className="material-icons"></i>  Administrator
              
          </DropdownItem> */}
          
          <DropdownItem divider />
          <DropdownItem tag={Link} to="/settings/userProfile">
            <i className="material-icons">&#xE896;</i> Profile
          </DropdownItem>
          <DropdownItem tag={Link} to="/" className="text-danger" onClick={this.onLogoutClick.bind(this)}>
            <i className="material-icons text-danger">&#xE879;</i> Sign out
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(Strings.REDUX, state);
  return {
    userData:state.user_reducer.user
    // Title: state.pageTitle,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    USER_DATA: (user) => {
      dispatch(USER_DATA(user))
    },
    LOGIN_STATUS: (statusLogin) => {
      dispatch(LOGIN_STATUS(statusLogin))
    },
    SELECTED_INSTITUTE: (data) => {
      dispatch(SELECTED_INSTITUTE(data))
    },
    TOGGLE_SWITCH: (data) => {
      dispatch(TOGGLE(data))
    },
    
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserActions);
