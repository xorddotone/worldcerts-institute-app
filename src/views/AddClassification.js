

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
  InputGroup,
  Alert,
  InputGroupAddon,
  InputGroupText,
  FormSelect,
  FormTextarea,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "shards-react"; import PageTitle from "../components/common/PageTitle";
// import { pageTitle } from '../Redux/action';
import { connect } from 'react-redux';
import * as Strings from '../constants/strings'
import axios from 'axios'
import * as Routes from '../constants/apiRoutes'
import loader from '../images/loader.gif'
import { EditClassification, EditClassificationState } from "../redux/actions/dashboard-action"

const duration = [
  "Choose" , "year", "months", "days"
]
class InstituteRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instituteName: '',
      category: '',
      classification: this.props.editClassificationData.classification,
      duration: null,
      durationValidity: '',
      ErrorStatus: false,
      error: "",
      dropdown1: false,
      dropdown2: false,
      registeredInstitute : [],
      classificationCategory : [],
      selectedInstituteId:"",
      alertShow: false,
      alertMessage: "",
      loader: false
    }
    this.instituteNameChangeHandler = this.instituteNameChangeHandler.bind(this)
    this.categoryChangeHandler = this.categoryChangeHandler.bind(this)
    this.classificationChangeHandler = this.classificationChangeHandler.bind(this)
    this.durationChangeHandler = this.durationChangeHandler.bind(this)
    this.timedurationChangeHandler = this.timedurationChangeHandler.bind(this)
    this.onClickOptions=this.onClickOptions.bind(this)
    this.dismiss = this.dismiss.bind(this)
  }

  componentWillMount() {
    // this.props.UpdateTitle("Insttue Registration");
  }

  componentDidMount() {
    console.log(this.props.userData)
    let temp;
    let temp2;
    let that=this;
    axios.get(Routes.GET_REGISTERED_INSTITUTES+this.props.userData._id)
      .then(function (response) {
        // handle success
        console.log(response);
        let obj = {companyName : "Choose"}
        // response.data.result.push(obj)
        temp=response.data.result
        console.log(temp)
        temp.unshift(obj)
        that.setState({
          registeredInstitute:temp
        })
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })   
      axios.get(Routes.GET_CLASSIFICATION_CATEGORIES)
      .then(function (response) {
        // handle success
        console.log(response);
        let obj = {categoryName : "Choose"}
        temp2=response.data.result
        console.log(temp2)
        temp2.unshift(obj)
        that.setState({
          classificationCategory:temp2
        })

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }
  instituteNameChangeHandler(ev) {
    // console.log(ev)
    console.log(ev.target.value)
    this.setState({
      instituteName: ev.target.value
    })
  }

  durationChangeHandler(ev) {
    var reg = new RegExp('^\\d+$');
    console.log(ev.target.value)
    if (reg.test(ev.target.value) || ev.target.value == "") {
      this.setState({
        duration: ev.target.value
      })
    }
  }

  categoryChangeHandler(ev) {
    console.log(ev.target.value)
    this.setState({
      category: ev.target.value
    })
  }

  classificationChangeHandler(ev) {
    console.log(ev.target.value)  
    this.setState({
      classification: ev.target.value
    })
  }
  
  timedurationChangeHandler(ev) {
    console.log(ev.target.value)
    this.setState({
      durationValidity: ev.target.value
    })
  }
  onClickOptions(ev){
    console.log(ev)
    this.setState({
      selectedInstituteId:ev
    })
  }

  onRegisterClick() {
    console.log(this.state.selectedInstituteId)
    this.setState({
      loader:true
    })
    if(this.props.selectedInstituteName.name=="worldcerts"){
      this.setState({
        alertMessage: "Select Institute",
        alertShow: true,
        theme: "danger",
        loader:false
      
      })
    }
    else{
      let that = this;
    console.log(that.state.instituteName + " " + that.state.category +  " " + that.state.classification + " " +that.state.duration  + " " +  that.state.durationValidity )
    if ( that.state.category == "" || that.state.category == "Choose" || that.state.classification == "" || that.state.duration == "" || that.state.durationValidity == "" || that.state.durationValidity == "Choose") {
      that.setState({
        alertMessage: Strings.ALL_FIELDS_REQUIRED,
        alertShow: true,
        theme: "info",
        loader:false
      })
    }
    else {
      let timeDuration = ""
      if(that.state.durationValidity == "year"){
        timeDuration = that.state.duration*31536000
      }
      else if(that.state.durationValidity == "months"){
        timeDuration = that.state.duration* 2592000

        
      }
      else if(that.state.durationValidity == "days"){
      }
      timeDuration = that.state.duration* 86400
      
      console.log(timeDuration)
      let obj = {
        instituteName: that.props.selectedInstituteName.name,
        category: that.state.category,
        classification: that.state.classification,
        durationValidity: timeDuration,
         // country: this.state.country,
        // postalCode: this.state.postalCode
      }
      console.log(obj)
      console.log(that.state.selectedInstituteId)
      axios.post(Routes.CLASSIFICATION + that.props.selectedInstituteName.id, obj)
        .then(function (response) {

          // console.log(response.data.data.result);
          that.setState({
            loader:false
          })
          alert("Classification has been added")
          that.props.history.push('/manageClassification')
         
        })
        .catch(function (error) {
          console.log(error);
          console.log(error.response)
          that.setState({
            loader:false
          })
        });
    }
    }
  }
  dismiss() {
    this.setState({ alertShow: false });
  }

  toggle(which) {
    const newState = { ...this.state };
    newState[which] = !this.state[which];
    this.setState(newState);
  }
  onClickOptionss(ev){
    console.log(ev)
  }
  onCancelClick(){
    let obj={
      category:'',
      classification:'',
      durationValidity:null,
      instituteName:'',
      _id:''
  }
    this.props.EditClassification(obj)
    this.props.EditClassificationState(false)
    this.props.history.push("/manageClassification")
  }
  onSaveClick(){
    this.setState({
      loader : true
    })
    let that = this;
    console.log(that.state.instituteName + " " + that.state.category +  " " + that.state.classification + " " +that.state.duration  + " " +  that.state.durationValidity )
    if ( that.state.category == "" || this.state.category == "Choose" || that.state.classification == "" || that.state.duration == "" || that.state.durationValidity == "" || this.state.durationValidity == "Choose") {
      that.setState({
        alertMessage: Strings.ALL_FIELDS_REQUIRED,
        alertShow: true,
        theme: "danger",
        loader:false
      })
    }
    else {
      let timeDuration = ""
      if(that.state.durationValidity == "year"){
        timeDuration = that.state.duration*31536000
      }
      else if(that.state.durationValidity == "months"){
        timeDuration = that.state.duration* 2592000

        
      }
      else if(that.state.durationValidity == "days"){
      }
      timeDuration = that.state.duration* 86400
      
      console.log(timeDuration)
      let obj = {
        instituteName: that.props.selectedInstituteName.name,
        category: that.state.category,
        classification: that.state.classification,
        durationValidity: timeDuration,
         // country: this.state.country,
        // postalCode: this.state.postalCode
      }
      console.log(obj)
      console.log(that.state.selectedInstituteId)
      axios.put(Routes.EDIT_CLASSIFICATION + that.props.editClassificationData._id, obj)
        .then(function (response) {

          // console.log(response.data.data.result);
          that.setState({
            loader:false
          })
          alert("Classification has been Updated")
          that.props.history.push('/manageClassification')
         
        })
        .catch(function (error) {
          console.log(error);
          if(error.response == undefined){
          that.setState({
            alertMessage: "Network Error",
            alertShow: true,
            theme: "danger",
            loader:false
          })
        }
        else {
          that.setState({
            alertMessage: error.response.data.responseMessage,
            alertShow: true,
            theme: "danger",
            loader:false
          })
        }
        });
    }
  }
  render() {
    return (
      <Container fluid className="main-content-container px-4">
         <Alert className="mb-0" open = {this.state.alertShow} theme = {this.state.theme} dismissible={this.dismiss}>
         <i className="fas fa-exclamation mx-2"></i> {this.state.alertMessage}
      </Alert>
        <Row noGutters className="page-header py-4">
          <PageTitle title="Add Classification" md="12" className="ml-sm-auto mr-sm-auto cursor-default" />
          {/* subtitle="Registration" */}
        </Row>
        <Row>
          <Col lg="11">
            <Card small className="mb-4">
              {/* <CardHeader className="border-bottom">
        </CardHeader> */}
              <ListGroup flush>
                <ListGroupItem className="p-3">
                  <Row>
                    <Col>
                      <Form>
                        <Row>
                          <Col md="6" className="form-group">
                            <label>Organization Name </label>
                            <FormInput

                              // onChange={this.classificationChangeHandler}
                              placeholder="Organization Name"
                              disabled
                              value={this.props.selectedInstituteName.name}
                            />
                            {/* <FormSelect onChange={this.instituteNameChangeHandler}>
                              {console.log(this.state.registeredInstitute)}
                              {
                                  this.state.registeredInstitute.map((category) => {
                                  return (
                                    // console.log(category)

                                      <option  onClick={(category)=>this.onClickOptions(category._id)} >{category.companyName}</option>
                                  )
                                })
                              }
                            </FormSelect> */}
                          </Col>
                          <Col md="6" className="form-group">
                            <label>Category</label>

                            <FormSelect onChange={this.categoryChangeHandler} placeholder = "Category"   >
                              {/* <option>category</option> */}
                              {console.log(this.state.classificationCategory)}
                             
                              {
                                this.state.classificationCategory.map((category) => {
                                  return (
                                    // console.log(category.categoryName)
                                    <option >{category.categoryName}</option>

                                  )
                                })
                              }
                            </FormSelect>
                          </Col>
                        </Row>
                        <Row form>

                          <Col md="6" className="form-group">
                            <label >Classification</label>
                            <FormInput

                              onChange={this.classificationChangeHandler}
                              placeholder="Classification"
                              value={this.state.classification}
                            />
                          </Col>
                              <Col md = "6"className="form-group">
                            <label >Duration</label>

                          <InputGroup className="mb-3">
                            <FormInput value={this.state.duration} onChange={this.durationChangeHandler} />
                            <FormSelect type = "append" onChange={this.timedurationChangeHandler}>
                              {
                                duration.map((duration) => {
                                  return (
                                    <option>{duration}</option>

                                  )
                                })
                              }
                            </FormSelect>
                          </InputGroup>
                          </Col>
                          {/* <Col md="3" className="form-group">
                            <label >Duration</label>
                            <FormInput

                              onChange={this.durationChangeHandler}
                              placeholder="Duration"
                              value={this.state.duration}
                            />
                            </Col>
                            <Col md="3" className="form-group">
                            <FormSelect onChange={this.timedurationChangeHandler}>
                              {
                                duration.map((duration) => {
                                  return (
                                    <option>{duration}</option>

                                  )
                                })
                              }
                            </FormSelect>
                          </Col> */}


                          {/* <Col md="6" className="form-group">
                            <label>Certificate Validity</label>

                            <InputGroup className="mb-3">
                              <FormInput
                                placeholder="0"
                                value={this.state.time}
                                disabled
                              />
                              <Dropdown
                                open={this.state.dropdown1}
                                toggle={() => this.toggle("dropdown1")}
                                addonType="append"
                               
                              >
                                <DropdownToggle caret  >{this.state.duration}</DropdownToggle>
                                <DropdownMenu small right
                                >
                                  {
                                    duration.map((durationtime) => {
                                      return (
                                        <DropdownItem onClick = {()=>{this.setState({duration:durationtime})}} value = {durationtime}>{durationtime}</DropdownItem>

                                      )
                                    })
                                  }
                                </DropdownMenu>
                              </Dropdown>
                            </InputGroup>
                          </Col> */}
                        </Row>
                        {/* <Row form>
                          <Col md="12" className="form-group">
                            <label>Company/Institute Address</label>
                            <FormInput
                              onChange={this.instituteAddressChangeHandler}
                              placeholder="7th street Canberra Australia"
                              value={this.state.instituteAddress}
                            />
                          </Col>
                        </Row> */}

                        {/* <Row form style={{ marginTop: "15px" }}>
                        <InputGroup className="mb-3">
          <FormInput />
          <Dropdown
            open={this.state.dropdown1}
            toggle={() => this.toggle("dropdown1")}
            addonType="append"
          >
            <DropdownToggle caret>Dropdown</DropdownToggle>
            <DropdownMenu small right>
              <DropdownItem>Action</DropdownItem>
              <DropdownItem>Another action</DropdownItem>
              <DropdownItem>Something else here</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </InputGroup>
                          <Col md="6" className="form-group">
                            <label>Postal Code</label>
                            <FormInput
                              onChange={this.postalcodeChangeHandler}
                              placeholder="12345"
                              value={this.state.postalCode}
                            />
                          </Col>
                          {(this.state.ErrorStatus) ? (

                            <label style={{ color: "red", borderBottom: "1px" }}>{this.state.error}</label>
                          ) : (null)}
                        </Row> */}
                        {(this.props.editClassificationState)?(
                          (this.state.loader)?(<img src = {loader} className = "loader"/>):( <div>

                            <Button size="sm" theme = "success"  className="mb-2 mr-1 worldcerts-button"
                          onClick={this.onSaveClick.bind(this)}
                        >Save</Button>
                        <Button size="sm" theme = "success"  className="mb-2 mr-1 worldcerts-button"
                          onClick={this.onCancelClick.bind(this)}
                        >Cancel</Button>
                          </div>)
                         
                        ):(
                          <Button size="sm" theme = "success"  className="mb-2 mr-1 worldcerts-button"
                          onClick={this.onRegisterClick.bind(this)}
                        >Register</Button>
                        )}
                        
                      </Form>
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(Strings.REDUX, state);
  return {
    Title: state.pageTitle,
    userData: state.user_reducer.user,
    selectedInstituteName:state.user_reducer.selectedInstituteName,
    editClassificationState:state.dashboard_reducer.editClassificationState,
    editClassificationData:state.dashboard_reducer.editClassificationData

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    EditClassification: (data) => {
      dispatch(EditClassification(data))
    },
    EditClassificationState: (data) => {
      dispatch(EditClassificationState(data))
    },
    // UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstituteRegistration);
