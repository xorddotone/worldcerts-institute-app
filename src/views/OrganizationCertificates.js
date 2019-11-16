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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
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
      revokeStatus: false,
      activeStatus: false,
      selectedClassificationID: null,
      open: [],
      allCertificates: [],
      revokeDisabled: [],
      activeDisabled: []

    }
    this.dismiss = this.dismiss.bind(this)
    this.categoryChangeHandler = this.categoryChangeHandler.bind(this)
    this.activeStatusMarked = this.activeStatusMarked.bind(this)
    this.revokeStatusMarked = this.revokeStatusMarked.bind(this)
    this.mapDataToTable = this.mapDataToTable.bind(this)


  }
  componentDidMount() {
    console.log(this.props.userData)
    let temp;
    let that = this;
    let data = []
    let dropDownOpen = []
    let activeDisable = []
    let revokeDisable =[]
    if (this.props.selectedInstituteName.name != "Select Organization") {
      console.log("inside if")
      this.mapDataToTable(null, null)

      axios.get(Routes.CLASSIFICATION + this.props.selectedInstituteName.id)
        .then(function (response) {
          // handle success
          let obj = { classification: "All" }
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
    this.setState({
      selectedClassificationID: this.state.registeredClassifications[ev.target.value]._id
    })
    this.mapDataToTable(this.state.registeredClassifications[ev.target.value]._id, null)
  }
  dismiss() {
    this.setState({ alertShow: false });
  }

  mapDataToTable(classificationID, tempStatus) {
    let that = this;
    let data = []
    let activeDisable = []
    let dropDownOpen = []
    let revokeDisable = []
    let obj = {
      id: this.props.selectedInstituteName.id,
      classificationId: classificationID,
      revokedStatus: tempStatus
    }
    console.log("obj ==> ", obj)
    axios.post(Routes.GET_ALL_CERTIFICATES, obj)
      .then(response => {
        console.log(response)
        console.log("all certificates ", response.data.result)

        let responseData = response.data.result
        console.log(responseData.length)
        this.setState({
          allCertificates: response.data.result
        })
        for (let i = 0; i < responseData.length; i++) {
          console.log(responseData[i])
          // data[i].studentName = responseData[i].
          let active = ""
          if (responseData[i].isRevoked) {
            active = "revoked"
            activeDisable.push(false)
            revokeDisable.push(true)

          }
          else {
            active = "active"
            activeDisable.push(true)
            revokeDisable.push(false)
          }
          data.push({
            studentName: responseData[i].participant.name,
            email: responseData[i].participant.email,
            classificationName: responseData[i].classification.classification,
            category: responseData[i].classification.category,
            status: active
          })
          dropDownOpen.push(false)

        }
        that.setState({
          data,
          open: dropDownOpen,
          activeDisabled: activeDisable,
          revokeDisabled: revokeDisable
        })
      })
      .catch(err => {
        console.log(err)
      })
  }

  activeStatusMarked() {
    let temp = this.state.activeStatus
    this.setState({
      activeStatus: !temp
    })
    let tempStatus = null
    if (!temp == true && this.state.revokeStatus == false) {
      tempStatus = false
    }
    else if (this.state.revokeStatus == true && !temp == false) {
      tempStatus = true
    }
    else if (!temp == true && this.state.revokeStatus == true) {
      tempStatus = null
    }

    this.mapDataToTable(this.state.selectedClassificationID, tempStatus)

  }
  revokeStatusMarked() {
    let temp = this.state.revokeStatus

    this.setState({
      revokeStatus: !temp
    })
    let tempStatus = null
    if (!temp == true && this.state.activeStatus == false) {
      tempStatus = true
    }
    else if (this.state.activeStatus == true && !temp == false) {
      tempStatus = false
    }
    else if (!temp == true && this.state.activeStatus == true) {
      tempStatus = null
    }

    this.mapDataToTable(this.state.selectedClassificationID, tempStatus)

  }

  onRevokeClick(id) {
    let obj = {
      revokeStatus: true
    }

    console.log(this.state.allCertificates[id]._id)
    axios.put(Routes.REVOKE_CERTIFICATES + this.state.allCertificates[id]._id, obj).then(response => {
      console.log(response.data.result)
      let tempStatus = null
    if (this.state.revokeStatus == true && this.state.activeStatus == false) {
      tempStatus = true
    }
    else if (this.state.activeStatus == true && this.state.revokeStatus == false) {
      tempStatus = false
    }
    else if (this.state.revokeStatus == true && this.state.activeStatus == true) {
      tempStatus = null
    }
    else if (this.state.revokeStatus == false && this.state.activeStatus == false) {
      tempStatus = null
    }

    this.mapDataToTable(this.state.selectedClassificationID, tempStatus)
    })
      .catch(err => {
        console.log(err)
        console.log(err.response.data.result)
      })
  }

  onEnactClick(id) {
    let obj = {
      revokeStatus: false
    }
    console.log(this.state.allCertificates[id]._id)
    axios.put(Routes.ENACT_CERTIFICATES + this.state.allCertificates[id]._id, obj).then(response => {
      console.log(response.data.result)
      let tempStatus = null
      if (this.state.revokeStatus == true && this.state.activeStatus == false) {
        tempStatus = true
      }
      else if (this.state.activeStatus == true && this.state.revokeStatus == false) {
        tempStatus = false
      }
      else if (this.state.revokeStatus == true && this.state.activeStatus == true) {
        tempStatus = null
      }
      else if (this.state.revokeStatus == false && this.state.activeStatus == false) {
        tempStatus = null
      }  
  
      this.mapDataToTable(this.state.selectedClassificationID, tempStatus)
    })
      .catch(err => {
        console.log(err)
        console.log(err.response.data.result)
      })
  }
  render() {
    console.log(this.state.revokeDisabled)
    console.log(this.state.activeDisabled)

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
        <div className="mb-4">
          <Row >

            <Col md="12">
              <label style={{ fontSize: "20px", color: "grey" }}>
                Filter By:
            </label>
              <ListGroup>

                <Row>
                  <Col md="3" sm="3" lg="3">
                    <label style={{ fontWeight: "bold" }}>
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
                  <Col md="6" sm="6" lg="6">
                    <label style={{ fontWeight: "bold" }}>
                      Status
                 </label>
                    <div>
                      <FormCheckbox
                        inline
                        checked={this.state.activeStatus}
                        onChange={e => this.activeStatusMarked(e)}
                      >
                        Active Certificates
                            </FormCheckbox>
                      <FormCheckbox
                        inline
                        checked={this.state.revokeStatus}
                        onChange={e => this.revokeStatusMarked(e)}
                      >
                        Revoked Certificates
                            </FormCheckbox>
                    </div>
                  </Col>


                </Row>
              </ListGroup>
            </Col>
          </Row>
        </div>
        <MaterialTable
          title="Certificates List"
          columns={this.state.columns}
          data={this.state.data}
          actions={[
            {
              tooltip: 'options',
              icon: 'more_horiz',
              onClick: (event, rowData) => {
                console.log("onActionClick", rowData)
                let temp = [...this.state.open]
                temp[rowData.tableData.id] = !temp[rowData.tableData.id]
                this.setState({
                  open: temp
                });
              }
            }
          ]}

          onRowClick={(event, rowData) => {
            console.log("onRowClick", rowData)

          }}
          components={{
            Action: props => (
              <Dropdown open={this.state.open[props.data.tableData.id]} toggle={(event, rowData) => {
                props.action.onClick(event, props.data)
              }}>
                <DropdownToggle style={{ backgroundColor: 'transparent', border: 'none' }} ><i className="material-icons">{'more_horiz'}</i></DropdownToggle>
                <DropdownMenu>
                  <DropdownItem disabled={this.state.revokeDisabled[props.data.tableData.id]} onClick={() => this.onRevokeClick(props.data.tableData.id)}>Revoke</DropdownItem>
                  <DropdownItem disabled={this.state.activeDisabled[props.data.tableData.id]} onClick={() => this.onEnactClick(props.data.tableData.id)}>Enact</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            ),
          }}
          options={{
            actionsColumnIndex: -1,
            showTextRowsSelected: true
          }}
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