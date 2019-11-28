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
import { EDIT_INSTITUTE_FLAG_ACTION,SELECTED_INSTITUTE_FOR_EDIT } from "../redux/actions/login-action"


const csv = require('csv-parser')
const fs = require('fs')
const results = [];


class Settings extends Component {

  constructor(props) {
    super(props);
    this.state = {
          }
          this.onInstituteProfileClick=this.onInstituteProfileClick.bind(this)
  }

  componentWillMount() {
    // this.props.UpdateTitle("Institue Registration");
  }
  onInstituteProfileClick(){
    let obj = {
      name: this.props.selectedInstitute.name,
      id: this.props.selectedInstitute.id,
      url: this.props.selectedInstitute.url,
      email:this.props.selectedInstitute.email,
      certificateStore: 0x000000000000000,
      companyContactNumber:this.props.selectedInstitute.companyContactNumber,
      country:this.props.selectedInstitute.country,
      approvalStatus:this.props.selectedInstitute.approvalStatus,
      companyAddress:this.props.selectedInstitute.companyAddress,
      
      
    }
    this.props.EDIT_INSTITUTE_FLAG_ACTION(true)
    this.props.SELECTED_INSTITUTE_FOR_EDIT(obj)
    this.props.history.push("/organization_registration")
  }

  
  render() {
    return (
      <Container fluid className="main-content-container px-4">
  <Row noGutters className="page-header py-4">
        <PageTitle title="Settings"  md="12" className="ml-sm-auto mr-sm-auto cursor-default" />
        <PageTitle  subtitle="Under Development" md="12" className="ml-sm-auto mr-sm-auto cursor-default" />
        <button onClick={this.onInstituteProfileClick}>profile</button>
        {/* subtitle="Registration" */}
      </Row>       
       
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(Strings.REDUX, state);
  return {
    selectedInstitute: state.user_reducer.selectedInstituteName,
    // Title: state.pageTitle,
    // userData:state.user_reducer.user

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    EDIT_INSTITUTE_FLAG_ACTION: (dt) => 
    dispatch(EDIT_INSTITUTE_FLAG_ACTION(dt)),
    SELECTED_INSTITUTE_FOR_EDIT: (user) => {
      dispatch(SELECTED_INSTITUTE_FOR_EDIT(user))
    },
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Settings);