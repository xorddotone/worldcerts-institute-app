import React, { Component } from "react";
import { Container, Card,
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
  Button } from "shards-react";
import PageTitle from "../components/common/PageTitle";
// import { pageTitle } from '../Redux/action';
import { connect } from 'react-redux';
import * as Strings from '../constants/strings'
import axios from 'axios'
import * as Routes from '../constants/apiRoutes'
import CSVReader from 'react-csv-reader'


class IssueCertificate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
    }

    this.FileHandler = this.FileHandler.bind(this)
   
  }

  componentWillMount() {
    // this.props.UpdateTitle("Institue Registration");
  }

  FileHandler(data){
    console.log(data)
  }

  

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        Issue Certificate
        <CSVReader
        cssClass="csv-reader-input"
        label="Select CSV File"
        onFileLoaded={this.FileHandler}
        onError={this.handleDarkSideForce}
        inputId="ObiWan"
        inputStyle={{color: 'red'}}
      />
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(Strings.REDUX,state);
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

export default connect(mapStateToProps, mapDispatchToProps)(IssueCertificate);