import React, { Component } from "react";
import {
  Container, Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button
} from "shards-react";
import PageTitle from "../components/common/PageTitle";
// import { pageTitle } from '../Redux/action';
import { connect } from 'react-redux';
import * as Strings from '../constants/strings'
import axios from 'axios'
import * as Routes from '../constants/apiRoutes'
import CSVReader from 'react-csv-reader'
import ReactFileReader from 'react-file-reader';

const csv = require('csv-parser')
const fs = require('fs')
const results = [];


class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
          }

  }

  componentWillMount() {
    // this.props.UpdateTitle("Institue Registration");
  }

  
  render() {
    return (
      <Container fluid className="main-content-container px-4">
  <Row noGutters className="page-header py-4">
        <PageTitle title="Settings"  md="12" className="ml-sm-auto mr-sm-auto cursor-default" />
        <PageTitle  subtitle="Under Development" md="12" className="ml-sm-auto mr-sm-auto cursor-default" />
        
        {/* subtitle="Registration" */}
      </Row>       
       
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(Strings.REDUX, state);
  return {
    // Title: state.pageTitle,
    // userData:state.user_reducer.user

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);