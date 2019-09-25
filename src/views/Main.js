import React, { Component } from "react";
import { Container, Row, Col } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import { connect } from 'react-redux';
import { pageTitle } from '../Redux/action';
import history from "../config/history"
import * as Strings from '../constants/strings'

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pagetitle: Strings.WORLDCERTS
    }
  }

  componentWillMount() {
    const { pagetitle } = this.state;
    this.props.UpdateTitle(pagetitle);
  }

  onBtnClick() {
    // this.props.history.push("/freelancers-regsitration")
    // this.props.history.push("/freelancers-regsitration")
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title="Dashboard" subtitle="Overview" md="12" className="ml-sm-auto mr-sm-auto" />
        </Row>
        <span onClick={this.onBtnClick.bind(this)}>tests</span>
      </Container>
    );
  }
}

// onClick={()=>this.onBtnClick.bind(this)}
const mapStateToProps = (state) => {
  console.log(Strings.REDUX, state.pageTitle);
  return {
    Title: state.pageTitle,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);