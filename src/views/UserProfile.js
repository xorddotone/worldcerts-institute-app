import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import Profile from "../components/UserProfile/Profile";
// import { pageTitle } from '../Redux/action';
import { connect } from 'react-redux';

class UserProfile extends Component {
  componentDidMount() {
    // this.props.UpdateTitle("");
  }
  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title="User Profile"  md="12" className="ml-sm-auto mr-sm-auto" />
          {/* subtitle="Registration" */}
        </Row>
        <Row>
          <Col lg="11">
            <Profile />
          </Col>
        </Row>
      </Container>
    )
  }
}
const mapStateToProps = (state) => {
  console.log("redux =>", state.pageTitle);
  return {
    Title: state.pageTitle,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    // UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
