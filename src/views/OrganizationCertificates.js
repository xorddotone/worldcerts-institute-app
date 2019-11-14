import React, { Component } from "react";
import {
  Container, Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Alert,
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
import { Link } from 'react-router-dom'

const csv = require('csv-parser')
const fs = require('fs')
const results = [];


class OrganizationCertificates extends Component {

  constructor(props) {
    super(props);
    this.state = {
        alertMessage: "",
        alertShow: false,
        theme: "",
        isTop: true,

          }
    this.dismiss = this.dismiss.bind(this)


  }
  componentDidMount() {
    console.log(this.props.userData)
    let temp;
    let that=this;
    if(this.props.selectedInstituteName.name!="Select Organization"){
      console.log("inside if")
    // axios.get(Routes.CLASSIFICATION +this.props.selectedInstituteName.id)
    //   .then(function (response) {
    //     // handle success
    //     console.log(response);
    //     temp=response.data.result
    //     console.log(temp)
    //     delete temp.durationValidity
    //     that.setState({
    //       registeredClassifications:temp
    //     })

    //   })
    //   .catch(function (error) {
    //     // handle error
    //     console.log(error);
    //   })
    }
    else{
      console.log("inside else")
      this.setState({
          alertShow : true,
          alertMessage : Strings.SELECT_ORGANIZATION,
          theme: "danger"
          })
    }
  }

  componentWillMount() {
    // this.props.UpdateTitle("Institue Registration");
  }
  componentDidUpdate(){
    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < 1;
      if (isTop !== this.state.isTop) {
          this.setState({ isTop })
      }
  });
  }
  dismiss() {
    this.setState({ alertShow: false });
  }
  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {(this.props.userData.isVerified)?(
        null
        ):(
          <Alert className="mb-0" style = {(this.state.isTop)?(null):({position: 'fixed' , zIndex: '100' ,minWidth: "80%", maxWidth: "84%" , transition: "2s"})} open={true} theme="danger">
          <i className="fas fa-exclamation mx-2"></i> Your account is not verified. Please <Link to = "account_activation" style = {{color:"white" , fontWeight: "bold"}}>click here</Link> to verify it.
        </Alert>
      )}
          <Alert className="mb-0" style = {(this.state.isTop)?(null):({position: 'fixed' , zIndex: '100' ,minWidth: "80%", maxWidth: "84%" , transition: "2s"})} open = {this.state.alertShow} theme = {this.state.theme} dismissible={this.dismiss}>
          {this.state.alertMessage}
      </Alert>
  <Row noGutters className="page-header py-4">
        <PageTitle title="Organization Certificates"  md="12" className="ml-sm-auto mr-sm-auto cursor-default" />
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
    userData:state.user_reducer.user,
    selectedInstituteName: state.user_reducer.selectedInstituteName,
    

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationCertificates);