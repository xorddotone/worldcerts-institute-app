import React from "react";
import { Nav, NavItem, NavLink } from "shards-react";
import { NavLink as RouteNavLink } from "react-router-dom";

class SidebarNavItems extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      Item: [
        {
          title: "Register Institute",
          to: "/institute_registration",
          htmlBefore: '<i class="material-icons">home</i>',
        },
      ]
    };
  }

  render() {
    const { Item } = this.state;
    return (
      <div className="nav-wrapper">
        <Nav className="nav--no-borders flex-column">
          {Item.map((item, idx) => {
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
        </Nav>
      </div>
    )
  }
}

export default SidebarNavItems;