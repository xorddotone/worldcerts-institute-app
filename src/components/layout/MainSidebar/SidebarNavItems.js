import React from "react";
import {
  Nav, NavItem, NavLink, FormCheckbox,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
} from "shards-react";
import { NavLink as RouteNavLink } from "react-router-dom";
import { connect } from 'react-redux';
import { TOGGLE  , InstituteList} from "../../../redux/actions/dashboard-action"
// import Select from 'react-select';
import * as Strings from '../../../constants/strings'
import * as Routes from '../../../constants/apiRoutes'
import { SELECTED_INSTITUTE } from "../../../redux/actions/login-action"
import { Dispatcher, Constants } from "../../../flux";
import { Link } from "react-router-dom";
import add from '../../../images/addBlack.svg'
const axios = require('axios');


class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ItemVerified: [
        {
          title: "Home",
          to: "/home",
          htmlBefore: ' <i class="material-icons">home</i>',
        },
          
        {
          title: "Certificate Classification",
          to: "/manageClassification",
          htmlBefore: ' <i class="material-icons">ballot</i>',
        },
        {
          title: "Issue Certificate",
          to: "/issueCertificate",
          htmlBefore: ' <i class="material-icons">ballot</i>',
        },
        {
          title: "Settings",
          to: "/settings",
          htmlBefore: ' <i class="material-icons">brightness_5</i>',
        },
        
      ],
      ItemNotVerified: [
        {
          title: "Home",
          to: "/home",
          htmlBefore: ' <i class="material-icons">home</i>',
        },
        {
          title: "Activate Your Account",
          to: "/account_activation",
          htmlBefore: ' <i class="material-icons">done</i>',
        },
       
        {
          title: "Certificate Classification",
          to: "/manageClassification",
          htmlBefore: ' <i class="material-icons">ballot</i>',
        },
        {
          title: "Issue Certificate",
          to: "/issueCertificate",
          htmlBefore: ' <i class="material-icons">ballot</i>',
        },
        {
          title: "Settings",
          to: "/settings",
          htmlBefore: ' <i class="material-icons">brightness_5</i>',
        },
        
      ],

      switched: this.props.toggleSwitchState,
      visible: false,
      name: "WorldCerts",
      Institutes: [],
      chainName: 'Test Net'

    };
    this.onCheckBoxChange = this.onCheckBoxChange.bind(this)
    this.onClickInstitute = this.onClickInstitute.bind(this)

  }
  handleClick = (e) => {
    const { linkDisabled } = this.state
    if (linkDisabled) e.preventDefault()
  }
  onCheckBoxChange() {
    let temp;
    this.setState(prevState => {
      console.log(!prevState.switched)
      // temp=!prevState.switched
      this.props.TOGGLE_SWITCH(!prevState.switched)
      return {
        switched: !prevState.switched
      };
    });
    
  }

  componentDidMount() {
    let temp;
    let that = this;
    console.log(this.props.userData._id)
    axios.get(Routes.GET_REGISTERED_INSTITUTES + this.props.userData._id)
      .then(function (response) {
        // handle success
        console.log(response);
        temp = response.data.result
        console.log(temp)
        that.props.institutesList(response.data.result)
        // that.setState({
        //   Institutes: temp
        // })

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

  onClickInstitute(names) {
    
    this.setState({
      name: names.companyName
    })
    let obj = {
      name: names.companyName,
      id: names._id,
      url: names.companyWebsite,
      email:"xyz@gmail.com",
      certificateStore: 0x000000000000000      
    }
    this.props.SELECTED_INSTITUTE(obj)
    // this.props.history.push("/manage_organization")
  }
  onClickAdd(ev) {
    // ev.preventDefault()
    this.props.history.push("/organization_registration")
  }

  render() {
    
    // const { Item } = this.state;
    return (
      // <div className="nav-wrapper d-inline-block item-icon-wrapper">
      <div className="nav-wrapper">

        <Nav className="nav--no-borders flex-column " >

          {/* style={{marginLeft:'5%'}} */}
          <NavItem tag={Dropdown} caret toggle={this.toggleUserActions.bind(this)}>
            <DropdownToggle caret tag={NavLink} className="text-nowrap px-3 " >
              {/* <img
        id="main-logo"
        className="d-inline-block align-top mr-1"
        style={{ maxWidth: "25px" }}
        src={require("../../../images/logo1.png")}
        alt="Shards Dashboard"
      /> */}
              <i style={{ marginLeft: '5%' }} className="material-icons">{"storefront"}</i>
              <span className=" d-md-inline-block cursor-pointer">{this.props.selectedInstituteName.name}</span>
            </DropdownToggle>
            <Collapse tag={DropdownMenu} right small open={this.state.visible}>

              {(this.props.institutesLists) ? (
                <div>
                  {this.props.institutesLists.map((names, id) => (
                    <DropdownItem to="/home" tag={Link} key={id}>
                      <div onClick={() => this.onClickInstitute(names )}><i className="material-icons">{"storefront"}</i> {names.companyName} </div>
                    </DropdownItem>
                  ))}

                </div>
              ) : (
                  null
                )}
              {/* onClick={this.onClickAdd.bind(this)} */}
              <DropdownItem to="/organization_registration" tag={Link}>
                <img src={add} style={{ color: 'black' }} alt="" height="17px" />
                {/* <i className="material-icons">{"apartment"}</i>  */}
              Create New Account
        </DropdownItem>
            </Collapse>
          </NavItem>
          {
            (this.props.userData.isVerified) ? (

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
                })}<NavLink >
                  <FormCheckbox toggle small checked={this.state.switched} onClick={this.onCheckBoxChange} on={this.props.toggleSwitchState} >
                    {(this.props.toggleSwitchState) ? (
                      "Main Network"
                    ) : (
                        "Test Network"
                      )}
                  </FormCheckbox>
                </NavLink>
              </div>


            ) : (
                <div>

                  {this.state.ItemNotVerified.map((item, idx) => {
                    return (
                      <NavItem>
                        <NavLink
                          // onClick={this.handleClick} 
                          tag={RouteNavLink} to={item.to}>
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
                  <NavLink>
                    <FormCheckbox toggle small disabled >
                      Test Mode
     </FormCheckbox>
                  </NavLink>

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
    selectedInstituteName: state.user_reducer.selectedInstituteName,
    toggleSwitchState: state.dashboard_reducer.toggle_switch_state,
    institutesLists: state.user_reducer.institutesList
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
    institutesList: (institutes) => {
      dispatch(InstituteList(institutes))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarNavItems);

// export default SidebarNavItems;