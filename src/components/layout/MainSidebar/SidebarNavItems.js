import React from "react";
import { Nav, NavItem, NavLink, FormCheckbox } from "shards-react";
import { NavLink as RouteNavLink } from "react-router-dom";
import { connect } from 'react-redux';
import {TOGGLE} from "../../../redux/actions/dashboard-action"



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
     
        switched: false
   
    };
    this.onCheckBoxChange=this.onCheckBoxChange.bind(this)

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

  render() {
    // const { Item } = this.state;
    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
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
    userData: state.user_reducer.user
    // Title: state.pageTitle,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    TOGGLE_SWITCH: (switch_state) => {
      dispatch(TOGGLE(switch_state))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarNavItems);

// export default SidebarNavItems;