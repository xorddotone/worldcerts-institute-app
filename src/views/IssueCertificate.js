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
      fileName: ''
    }

    this.FileHandler = this.FileHandler.bind(this)
    this.csvJSON = this.csvJSON.bind(this)
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
      let obj = JSON.parse(temp1)
      axios.post(Routes.ISSUE_CERTIFICATE, obj  ).then(response=> {
        console.log(response)
      })
      .catch(err => {
        console.log(err.response)
        
      })
    }
    reader.readAsText(files[0]);
  }

  csvJSON(cssv) {

    let lines = cssv.split("\n");
    let result = [];
    let headers = lines[0].split(",");
    for (let i = 1; i < lines.length-1; i++) {
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
        <PageTitle title="Issue Certificate"  md="12" className="ml-sm-auto mr-sm-auto cursor-default" />
        {/* subtitle="Registration" */}
      </Row>       
       <ReactFileReader handleFiles={this.handleFiles.bind(this)} fileTypes={'.csv'} >
          <h5 className = "cursor-default">Select a file to upload</h5>
          {/* <button className='btn' style={{ border: '1px solid' }}>Upload File</button> */}
          <Button size="sm" className="mb-2 mr-1 worldcerts-button"
                          
                        >Upload File</Button>
          <span style={{ color: 'green' , paddingLeft: "1em" }}>{this.state.fileName}</span>
        </ReactFileReader>
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
    // userData:state.user_reducer.user

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueCertificate);