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
  FormCheckbox,
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
import MaterialTable from 'material-table'

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
      columns: [
        { title: 'Student Name', field: 'studentName' },
        { title: 'Email', field: 'email' },
        { title: 'Classification Name', field: 'classificationName' },
        { title: 'Category', field: 'category' },
        { title: 'Status', field: 'status' },

      ],
      data: [],
      registeredClassifications: [],
      revokeStatus : false,
      activeStatus : false

    }
    this.dismiss = this.dismiss.bind(this)
    this.categoryChangeHandler = this.categoryChangeHandler.bind(this)
    this.statusMarked = this.statusMarked.bind(this)


  }
  componentDidMount() {
    console.log(this.props.userData)
    let temp;
    let that = this;
    let data = []
    if (this.props.selectedInstituteName.name != "Select Organization") {
      console.log("inside if")
      console.log(this.props.selectedInstituteName.id)
      let obj = {
        id: this.props.selectedInstituteName.id,
        classificationId: null
      }
      axios.post(Routes.GET_ALL_CERTIFICATES, obj)
        .then(response => {
          console.log("all certificates ", response.data.result)
          let responseData = response.data.result
          console.log(responseData.length)
          for (let i = 0; i < responseData.length; i++) {
            console.log(responseData[i])
            // data[i].studentName = responseData[i].
            let active = ""
            if (responseData[i].isRevoked) {
              active = "revoked"
            }
            else {
              active = "active"
            }
            data.push({
              studentName: responseData[i].participant.name,
              email: responseData[i].participant.email,
              classificationName: responseData[i].classification.classification,
              category: responseData[i].classification.category,
              status: active
            })

          }
          that.setState({
            data
          })
        })
        .catch(err => {
          console.log(err)
        })

      axios.get(Routes.CLASSIFICATION + this.props.selectedInstituteName.id)
        .then(function (response) {
          // handle success
          let obj = { classification: "Choose" }
          console.log(response);
          temp = response.data.result
          console.log(temp)
          temp.unshift(obj)
          that.setState({
            registeredClassifications: temp
          })

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })


    }
    else {
      console.log("inside else")
      this.setState({
        alertShow: true,
        alertMessage: Strings.SELECT_ORGANIZATION,
        theme: "danger"
      })
    }
  }

  componentWillMount() {
    // this.props.UpdateTitle("Institue Registration");
  }
  componentDidUpdate() {
    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < 1;
      if (isTop !== this.state.isTop) {
        this.setState({ isTop })
      }
    });
  }
  categoryChangeHandler(ev) {
    let temp;
    let that = this;
    let data = []
    console.log(ev.target.value)
    console.log(this.state.registeredClassifications[ev.target.value])
    let obj = {
      id: this.props.selectedInstituteName.id,
      classificationId: this.state.registeredClassifications[ev.target.value]._id
    }
    axios.post(Routes.GET_ALL_CERTIFICATES, obj)
      .then(response => {
        console.log("all certificates ", response.data.result)
        let responseData = response.data.result
        console.log(responseData.length)
        for (let i = 0; i < responseData.length; i++) {
          console.log(responseData[i])
          // data[i].studentName = responseData[i].
          let active = ""
          if (responseData[i].isRevoked) {
            active = "revoked"
          }
          else {
            active = "active"
          }
          data.push({
            studentName: responseData[i].participant.name,
            email: responseData[i].participant.email,
            classificationName: responseData[i].classification.classification,
            category: responseData[i].classification.category,
            status: active
          })

        }
        that.setState({
          data
        })
      })
      .catch(err => {
        console.log(err)
      })
    // console.log(this.state.registeredClassifications[ev.target.value].certificateImageUrl)
    // console.log(this.state.registeredClassifications[ev.target.value].totalCertificateFields)
    // this.setState({
    //   alertShow: false,
    //   selectedClassification: this.state.registeredClassifications[ev.target.value],
    //   certificateImage: this.state.registeredClassifications[ev.target.value].certificateImage.certificateImageUrl,
    //   classificationFields: this.state.registeredClassifications.combineFields
    // })
    // let tempClassificationsColoumn = []
    // console.log(this.state.registeredClassifications[ev.target.value].totalCertificateFields)
    // for(let i = 0 ; i < this.state.registeredClassifications[ev.target.value].totalCertificateFields.length ; i++){
    //   console.log(this.state.registeredClassifications[ev.target.value].totalCertificateFields.value)  
    //   tempClassificationsColoumn.push(this.state.registeredClassifications[ev.target.value].totalCertificateFields[i].value)
    // }
    // console.log("tempClassificationsColoumn  =>" , tempClassificationsColoumn)
    // console.log(this.state.registeredClassifications[ev.target.value].combineFields)
    // if (ev.target.value != 0) {

    //   this.getColumnsFromClassification(tempClassificationsColoumn)
    // }
  }
  dismiss() {
    this.setState({ alertShow: false });
  }

  statusMarked(e, status) {
    const newState = {};
    newState[status] = !this.state[status];
    this.setState({ ...this.state, ...newState });
  }
  render() {
    return (
      <Container fluid className="main-content-container px-4">
        {(this.props.userData.isVerified) ? (
          null
        ) : (
            <Alert className="mb-0" style={(this.state.isTop) ? (null) : ({ position: 'fixed', zIndex: '100', minWidth: "80%", maxWidth: "84%", transition: "2s" })} open={true} theme="danger">
              <i className="fas fa-exclamation mx-2"></i> Your account is not verified. Please <Link to="account_activation" style={{ color: "white", fontWeight: "bold" }}>click here</Link> to verify it.
        </Alert>
          )}
        <Alert className="mb-0" style={(this.state.isTop) ? (null) : ({ position: 'fixed', zIndex: '100', minWidth: "80%", maxWidth: "84%", transition: "2s" })} open={this.state.alertShow} theme={this.state.theme} dismissible={this.dismiss}>
          {this.state.alertMessage}
        </Alert>
        <Row noGutters className="page-header py-4">
          <PageTitle title="Organization Certificates" md="12" className="ml-sm-auto mr-sm-auto cursor-default" />

          {/* subtitle="Registration" */}
        </Row>
        {console.log(this.state.columns)}
        {console.log(this.state.data)}
        <Card className="mb-4">
          <Row >

            <Col md="12" style={{ padding: "2em" }}>
              <label style={{ fontSize: "20px", color: "grey" }}>
                Filter By:
            </label>
              <ListGroup style={{ padding: "2em" }}>

                <Row>
                  <Col md="3">
                    <label>
                      Classification Name
                 </label>
                    <FormSelect placeholder="Category" onChange={this.categoryChangeHandler} >
                      {/* <option>category</option> */}
                      {console.log(this.state.registeredClassifications)}

                      {
                        this.state.registeredClassifications.map((category, index) => {
                          return (
                            // console.log(category.categoryName)
                            <option key={index} value={index}>{category.classification}</option>

                          )
                        })
                      }
                    </FormSelect>

                  </Col>
                  <Col md="3">
                  <label>
                      Status
                 </label>
                    <FormCheckbox
                      checked={this.state.activeStatus}
                      onChange={e => this.statusMarked(e , "activeStatus")}
                    >
                      Active Certificates
                            </FormCheckbox>
                    <FormCheckbox
                      checked={this.state.revokeStatus}
                      onChange={e => this.statusMarked(e , "revokeStatus")}
                    >
                      Revoked Certificates
                            </FormCheckbox>
                  </Col>
                  <Col md="3">
                  </Col>
                  <Col md="3">
                  </Col>
                </Row>
              </ListGroup>
            </Col>
          </Row>
        </Card>
        <MaterialTable
          title="Recievers List"
          columns={this.state.columns}
          data={this.state.data}
        />

      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(Strings.REDUX, state);
  return {
    // Title: state.pageTitle,
    userData: state.user_reducer.user,
    selectedInstituteName: state.user_reducer.selectedInstituteName,


  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationCertificates);