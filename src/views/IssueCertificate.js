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


class IssueCertificate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fileName: '',
      csvFile: null
    }

    this.FileHandler = this.FileHandler.bind(this)
    this.csvJSON = this.csvJSON.bind(this)
    this.onIssueCertificate = this.onIssueCertificate.bind(this)
  }

  componentWillMount() {
    // this.props.UpdateTitle("Institue Registration");
  }

  FileHandler(data) {
    console.log(data)
  }

  handleFiles = files => {
    var reader = new FileReader();
    let temp;
    var temp1;
    console.log(files[0])
    let name = files[0].name
    this.setState({
      fileName: name
    })
    let that = this
    reader.onload = function (e) {

      console.log(e)
      temp = reader.result

      temp1 = that.csvJSON(temp)
      console.log(temp1)
      console.log(JSON.parse(temp1))
      that.setState({
        csvFile: JSON.parse(temp1)
      })
      // let obj = JSON.parse(temp1)

    }
    reader.readAsText(files[0]);
  }
  onIssueCertificate() {
    console.log(this.props.selectedInstituteName)
    let issuer = this.props.selectedInstituteName
    let recipient = this.state.csvFile
    // let classificationObject = this.props.selectedClassification
    // let recipient = {name: "Mr Blockchain",
    // did: "DID:SG-NRIC:S99999999A",
    // email: "mr-blockchain@gmail.com",
    // phone: "+65 88888888",
    // studentId: "1232"}

    let classification = {
      id: "123123123142324231",
      description: "This masters is awarded to developers who can blockchain",
      issuedOn: "",
      expiresOn: "",
      name: "Master of Blockchain",
    }

    let obj = {
      classification,
      issuer,
      recipient
    }
    // {
    //   name:this.props.selectedInstituteName.name ,
    //   id: this.props.selectedInstituteName.id,
    //   url: this.props.selectedInstituteName.url,
    //   email: this.props.selectedInstituteName.email,
    //   certificateStore: this.props.selectedInstituteName.certificateStore
    // }

    // console.log(this.state.csvFile)
    // let obj = [

    //   this.state.csvFile
    // ]
    axios.post(Routes.ISSUE_CERTIFICATE, obj).then(response => {
      console.log(response)
    })
      .catch(err => {
        console.log(err.response)

      })
  }
  csvJSON(cssv) {

    let lines = cssv.split("\n");
    let result = [];
    let headers = lines[0].split(",");
    for (let i = 1; i < lines.length - 1; i++) {
      let obj = {};
      let currentline = lines[i].split(",");
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      result.push(obj);

    }
    //return result; //JavaScript object
    return JSON.stringify(result); //JSON
  }


  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <PageTitle title="Issue Certificate" md="12" className="ml-sm-auto mr-sm-auto cursor-default" />
          {/* subtitle="Registration" */}
        </Row>
        <ReactFileReader handleFiles={this.handleFiles.bind(this)} fileTypes={'.csv'} >
          <h5 className="cursor-default">Select a file to upload</h5>
          {/* <button className='btn' style={{ border: '1px solid' }}>Upload File</button> */}
          <button size="sm" className="mb-2 mr-1 worldcerts-button"

          >Upload File</button>
          <span style={{ color: 'green', paddingLeft: "1em" }}>{this.state.fileName}</span>
        </ReactFileReader>
        <button size="sm" className="worldcerts-button" onClick={this.onIssueCertificate}>Issue Certificate</button>
        {/* <CSVReader
        cssClass="csv-reader-input"
        label="Select CSV File"
        onFileLoaded={this.FileHandler}
        onError={this.handleDarkSideForce}
        inputId="ObiWan"
        inputStyle={{color: 'red'}}
      /> */}
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(Strings.REDUX, state);
  return {
    // Title: state.pageTitle,
    selectedInstituteName: state.user_reducer.selectedInstituteName,
    // userData:state.user_reducer.user

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueCertificate);