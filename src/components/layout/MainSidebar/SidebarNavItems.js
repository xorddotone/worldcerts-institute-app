import React from "react";
import { Nav, NavItem, NavLink } from "shards-react";
import { NavLink as RouteNavLink } from "react-router-dom";
import { connect } from 'react-redux';



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
      ]
    };
  }
  handleClick = (e) => {
    const { linkDisabled } = this.state
    if(linkDisabled) e.preventDefault()
}

  render() {
    // const { Item } = this.state;
    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
        {(this.props.userData.isVerified)?(
          this.state.ItemVerified.map((item, idx) => {
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
          })
        ):(
          this.state.ItemNotVerified.map((item, idx) => {
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
          })
        )}
          
        </Nav>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  // console.log(Strings.REDUX, state);
  return {
    userData: state.user_reducer.user
    // Title: state.pageTitle,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SidebarNavItems);

// export default SidebarNavItems;