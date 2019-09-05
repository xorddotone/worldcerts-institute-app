import React from "react";
import { Nav, NavItem, NavLink, FormCheckbox,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
} from "shards-react";
import { NavLink as RouteNavLink } from "react-router-dom";
import { connect } from 'react-redux';
import {TOGGLE} from "../../../redux/actions/dashboard-action"
import Select from 'react-select';
import * as Strings from '../../../constants/strings'
import * as Routes from '../../../constants/apiRoutes'
import {SELECTED_INSTITUTE} from "../../../redux/actions/login-action"
import { Dispatcher, Constants } from "../../../flux";
import { Link } from "react-router-dom";
const axios = require('axios');


class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ItemVerified: [
        {
          title: "Manage Institute",
          to: "/manageInstitute",
          htmlBefore: '<i class="material-icons">home</i>',
        },
        {
          title: "Create Classification",
          to: "/manageClassification",
          htmlBefore: ' <i class="material-icons">ballot</i>',
        },
        {
          title: "User Profile",
          to: "/userProfile",
          htmlBefore: ' <i class="material-icons">&#xE7FD</i>',
        },
        {
          title: "Issue Certificate",
          to: "/issueCertificate",
          htmlBefore: ' <i class="material-icons">ballot</i>',
        },
      ],
      ItemNotVerified: [
        {
          title: "Manage Institute",
          to: "",
          htmlBefore: '<i class="material-icons">home</i>',
        },
        {
          title: "Create Classification",
          to: "",
          htmlBefore: ' <i class="material-icons">ballot</i>',
        },
        {
          title: "User Profile",
          to: "",
          htmlBefore: ' <i class="material-icons">&#xE7FD</i>',
        },
      ],
     
        switched: false,
        visible: false,
        name: "WorldCerts",
        Institutes:[]
   
    };
    this.onCheckBoxChange=this.onCheckBoxChange.bind(this)
    this.onClickInstitute = this.onClickInstitute.bind(this)

  }
  handleClick = (e) => {
    const { linkDisabled } = this.state
    if(linkDisabled) e.preventDefault()
}
onCheckBoxChange(){
  this.setState(prevState => {
    console.log(!prevState.switched)
    this.props.TOGGLE_SWITCH(!prevState.switched)
    return {
      switched: !prevState.switched
    };
  });
}

componentDidMount(){
  let temp;
  let that=this;
  console.log(this.props.userData._id)
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
    // const { Item } = this.state;
    return (
      <div className="nav-wrapper d-inline-block item-icon-wrapper">
        <Nav className="nav--no-borders flex-column " >

          <NavItem tag={Dropdown} caret toggle={this.toggleUserActions.bind(this)}>

<DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
         <img
        id="main-logo"
        className="d-inline-block align-top mr-1"
        style={{ maxWidth: "25px" }}
        src={require("../../../images/logo1.png")}
        alt="Shards Dashboard"
      />

        <span className=" d-md-inline-block">{this.props.selectedInstituteName.name}</span>
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
      </Collapse>
    </NavItem>
        {
          (this.props.userData.isVerified)?(

            <div>

            {this.state.ItemVerified.map((item, idx) => {
              return (
                <NavItem>
                <NavLink tag={RouteNavLink} to={item.to}>
                  {item.htmlBefore && (
                    <div
                    className="d-inline-block item-icon-wrapper"
                    dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
                    />
                    )}
                  {item.title && <span>{item.title}</span>}
                </NavLink>
              </NavItem>
            )
          })}
          <FormCheckbox toggle small onClick={this.onCheckBoxChange} on={this.state.switched} >
       Checked
     </FormCheckbox>
          </div>


        ):(
          <div>

          {this.state.ItemNotVerified.map((item, idx) => {
            return (
              <NavItem>
                <NavLink 
                // onClick={this.handleClick} 
                tag={RouteNavLink} to="/manageInstitute">
                  {item.htmlBefore && (
                    <div
                    className="d-inline-block item-icon-wrapper"
                    dangerouslySetInnerHTML={{ __html: item.htmlBefore }}
                    />
                    )}
                  {item.title && <span>{item.title}</span>}
                </NavLink>
              </NavItem>
            )
          })}
          <FormCheckbox toggle small disabled >
       Test Mode
     </FormCheckbox>

           </div> 
        )
        
        }
        
        {/* <span>toggle</span> */}
        </Nav>
         
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    userData: state.user_reducer.user,
    selectedInstituteName:state.user_reducer.selectedInstituteName,

    // Title: state.pageTitle,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    TOGGLE_SWITCH: (switch_state) => {
      dispatch(TOGGLE(switch_state))
    },
    SELECTED_INSTITUTE: (user) => {
      dispatch(SELECTED_INSTITUTE(user))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarNavItems);

// export default SidebarNavItems;