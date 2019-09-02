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
const axios = require('axios');


class SidebarMainNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      name: "WorldCerts",
      Institutes:[]
    }
    this.onClickInstitute = this.onClickInstitute.bind(this)
  }

  componentDidMount(){
    let temp;
    let that=this;
    axios.get(Routes.GET_REGISTERED_INSTITUTES+this.props.userData._id)
      .then(function (response) {
        // handle success
        console.log(response);
        temp=response.data.result
        console.log(temp)
        that.setState({
          Institutes:temp
        })

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }




  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  onClickInstitute(val,nameIns) {
    console.log(val,nameIns, "vallllllllllllll")
    this.setState({
      name: nameIns
    })
    let obj={
      name:nameIns,
      id:val
    }
    this.props.SELECTED_INSTITUTE(obj)
    // this.props.history.push("/manageInstitute")
  }
  onClickAdd(ev){
    // ev.preventDefault()
    this.props.history.push("/institute_registration")
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
            <NavItem tag={Dropdown} caret toggle={this.toggleUserActions.bind(this)}>
              <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
                {/* <img
                  className="user-avatar rounded-circle mr-2"
                  src={require("../../../images/user")}
                  style={{ width: "9%" }}
                  alt="User"
                /> */}
                 <img
                id="main-logo"
                className="d-inline-block align-top mr-1"
                style={{ maxWidth: "25px" }}
                src={require("../../../images/logo1.png")}
                alt="Shards Dashboard"
              />

                <span className="d-none d-md-inline-block">{this.props.selectedInstituteName.name}</span>
              </DropdownToggle>
              <Collapse tag={DropdownMenu} right small open={this.state.visible}>
                
                {(this.state.Institutes)?(
                    <div>
                      {this.state.Institutes.map((names,id)=>(
                        <DropdownItem to="/manageInstitute" tag={Link} key={id}>
                        <div onClick={() => this.onClickInstitute(names._id,names.companyName)}><i className="material-icons">&#xE7FD;</i> {names.companyName} </div>
                      </DropdownItem>
                      ))}
                      
                   </div>   
                ):(
                  null
                )}
                {/* onClick={this.onClickAdd.bind(this)} */}
                <DropdownItem to="/institute_registration" tag={Link}>
                        <i className="material-icons">&#xE7FD;</i> ADD INSTITUTE
                </DropdownItem>
                
                
                {/* <DropdownItem to="#" >
                  <div onClick={() => this.onClickInstitute("Edit Profile")}> <i className="material-icons">&#xE8B8;</i> Edit Profile</div>
                </DropdownItem>
                <DropdownItem to="#" >
                  <div onClick={() => this.onClickInstitute("Files")}><i className="material-icons">&#xE2C7;</i> Files</div>
                </DropdownItem> */}
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
            <span className="d-none d-md-inline-block">{this.props.selectedInstituteName.name}</span>

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
