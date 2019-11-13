

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
  FormCheckbox,
  FormRadio,
  FormTextarea,
  Button,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "shards-react";
import PageTitle from "../components/common/PageTitle";
// import { pageTitle } from '../Redux/action';
import { connect } from 'react-redux';
import * as Strings from '../constants/strings'
import * as Response from '../constants/responseCodes'
import axios from 'axios'
import * as Routes from '../constants/apiRoutes'
import loader from '../images/loader.gif'
import { EditClassification, EditClassificationState, ClassificationCategory, QRVisibility, ClassificationCombineFields, ClassificationInstituteName, ClassificationTotalFields,ClassificationDurationTime, ClassificationDurationSpan, ClassificationName } from "../redux/actions/dashboard-action"
import { Link } from 'react-router-dom'

const duration = [
  "Choose", "Life Time", "year", "months", "days"
]
class InstituteRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instituteName: '',
      category: '',
      classification: this.props.editClassificationData.classification,
      duration: "",
      durationTemp: "",
      durationValidity: '',
      ErrorStatus: false,
      error: "",
      dropdown1: false,
      dropdown2: false,
      registeredInstitute: [],
      classificationCategory: [],
      classificationConstantFields: [],
      classificationDynamicFields: [],
      selectedInstituteId: "",
      alertShow: false,
      alertMessage: "",
      loading: false,
      QRVisible: this.props.qrVisibility,
      durationValidityDisabled: true
    }
    this.instituteNameChangeHandler = this.instituteNameChangeHandler.bind(this)
    this.categoryChangeHandler = this.categoryChangeHandler.bind(this)
    this.classificationChangeHandler = this.classificationChangeHandler.bind(this)
    this.durationChangeHandler = this.durationChangeHandler.bind(this)
    this.timedurationChangeHandler = this.timedurationChangeHandler.bind(this)
    // this.onClickOptions = this.onClickOptions.bind(this)
    // this.dismiss = this.dismiss.bind(this)
    // this.onRegisterClick = this.onRegisterClick.bind(this)
    this.QrVisibility = this.QrVisibility.bind(this)
  }
  
  
  async componentDidMount() {
    console.log(this.props.userData)
    console.log(this.props.editClassificationData)
    let classificationConstants = []
    let temp;
    let temp2;
    let that = this;
    if(this.props.classificationDurationSpan == "Life Time" || this.props.classificationDurationSpan == "Choose" || this.props.classificationDurationSpan == ""){
      console.log("IN duration disabled")  
      this.setState({
          durationValidityDisabled:true
        })
    }
    else{
      this.setState({
        durationValidityDisabled:false
      })
    }
   await axios.get(Routes.GET_REGISTERED_INSTITUTES + this.props.userData._id)
      .then(function (response) {
        // handle success
        console.log(response);
        let obj = { companyName: "Choose" }
        // response.data.result.push(obj)
        temp = response.data.result
        console.log(temp)
        temp.unshift(obj)
        that.setState({
          registeredInstitute: temp
        })
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
   await axios.get(Routes.GET_CLASSIFICATION_CATEGORIES)
      .then(function (response) {
        // handle success
        console.log(response);
        let obj = { categoryName: "Choose" }
        temp2 = response.data.result
        console.log(temp2)
        temp2.unshift(obj)
        that.setState({
          classificationCategory: temp2
        })

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
   await axios.get(Routes.GET_CLASSIFICATION_FIELDS)
      .then(function (response) {
        // handle success
        console.log(response);
        console.log(response.data.result)
        let temp = response.data.result
        for(var i = 0; i<temp.length;i++){
            classificationConstants.push({top : 0 , left : 0 , htmlStringCode: "",value : temp[i],editorValue : temp[i]})
        }
        console.log("classificationConstants ==>",classificationConstants)
        that.setState({
          classificationConstantFields: classificationConstants
        })

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      if(this.props.editClassificationState){
        this.props.ClassificationCategory(this.props.editClassificationData.category)
        this.props.ClassificationName(this.props.editClassificationData.classification)
        this.props.ClassificationDurationTime(this.props.editClassificationData.durationValidity.durationTime)
        this.props.ClassificationDurationSpan(this.props.editClassificationData.durationValidity.durationSpan) 
        console.log("totalCertificateFields" , this.props.editClassificationData.totalCertificateFields)
        // let totalCertificateFields = [...this.state.classificationDynamicFields]
        // totalCertificateFields.push( this.props.editClassificationData.totalCertificateFields)
        let tempDynamicClassification = []
        console.log(classificationConstants)
        for(let i = 0 ; i <this.props.editClassificationData.totalCertificateFields.length ; i++){
          
          let found = classificationConstants.some(el => 
            el.value == this.props.editClassificationData.totalCertificateFields[i].value 
          )
          if(!found){
            tempDynamicClassification.push(this.props.editClassificationData.totalCertificateFields[i])
          }
        }
        // for(let i = 0 ; i < this.props.editClassificationData.totalCertificateFields.length ; i ++ ){
        //   if(this.props.editClassificationData.totalCertificateFields[i].value)
        // }
        console.log(this.props.editClassificationData.totalCertificateFields)
        console.log(tempDynamicClassification)
       let temp =  this.props.editClassificationData.totalCertificateFields.map( obj => 
        this.props.editClassificationData.combineCertificateFields.find(dynamicFieldsObj => 
            dynamicFieldsObj.value === obj.value 
          ) || obj
          )
          console.log(temp)
          
        
        this.setState({
          classificationDynamicFields : tempDynamicClassification
        })
        this.props.ClassificationCombineFields(temp)
        this.props.ClassificationTotalFields(temp)

      }
  }

  componentDidUpdate() {
    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < 1;
      if (isTop !== this.state.isTop) {
        this.setState({ isTop })
      }
    });
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
    var reg1 = new RegExp('[A-Za-z]+');
    console.log(reg1.test(ev.target.value))
    console.log(reg.test(ev.target.value))
    if ((reg.test(ev.target.value) && reg1.test(ev.target.value) == false) || ev.target.value == "") {
      console.log("inside")

      this.setState({
        durationTemp: ev.target.value,
        duration: ev.target.value
      })

      this.props.ClassificationDurationTime(ev.target.value)
    }
    else {
      console.log("else")
    }
  }

  categoryChangeHandler(ev) {
    console.log(ev.target.value)
    this.setState({
      category: ev.target.value
    })
    this.props.ClassificationCategory(ev.target.value)
  }

  classificationChangeHandler(ev) {
    console.log(ev.target.value)
    this.setState({
      classification: ev.target.value
    })
    this.props.ClassificationName(ev.target.value)
  }

  timedurationChangeHandler(ev) {
    console.log(ev.target.value)
    if (ev.target.value == "Life Time" || ev.target.value == "Choose") {
      this.setState({
        durationValidity: ev.target.value,
        durationValidityDisabled: true
      })
      // this.props.ClassificationDurationSpan(ev.target.value)
    }
    else {
      this.setState({
        durationValidity: ev.target.value,
        durationValidityDisabled: false
      })
    }

    this.props.ClassificationDurationSpan(ev.target.value)

  }
  onClickOptions(ev) {
    console.log(ev)
    this.setState({
      selectedInstituteId: ev
    })
  }

  // onRegisterClick() {
  //   console.log("#################################################3")
  //   console.log(typeof (this.state.duration))
  //   console.log(this.state.selectedInstituteId)
  //   this.setState({
  //     loading: true
  //   })
  //   console.log(this.props.selectedInstituteName)
  //   if (this.props.selectedInstituteName.name == "Select Organization") {
  //     console.log("innnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")

  //     this.setState({
  //       alertShow: true,
  //       alertMessage: "Select Institute",
  //       theme: "danger",
  //       loading: false

  //     })
  //     // alert("up")
  //     // this.setState({
  //     //   loading:false
  //     // })
  //   }
  //   else {
  //     let that = this;
  //     console.log(that.state.instituteName + " " + that.state.category + " " + that.state.classification + " " + that.state.duration + " " + that.state.durationValidity)
  //     if (that.state.category == "" || that.state.category == "Choose" || that.state.classification == "" || that.state.duration == "" || that.state.durationValidity == "" || that.state.durationValidity == "Choose") {

  //       that.setState({
  //         alertMessage: Strings.ALL_FIELDS_REQUIRED,
  //         alertShow: true,
  //         theme: "info",
  //         loading: false
  //       })
  //       alert("stop")
  //     }
  //     else {
  //       let timeDuration = ""
  //       if (that.state.durationValidity == "year") {
  //         timeDuration = that.state.duration * 31536000
  //       }
  //       else if (that.state.durationValidity == "months") {
  //         timeDuration = that.state.duration * 2592000


  //       }
  //       else if (that.state.durationValidity == "days") {
  //       }
  //       timeDuration = that.state.duration * 86400

  //       console.log(timeDuration)
  //       let obj = {
  //         instituteName: that.props.selectedInstituteName.name,
  //         category: that.state.category,
  //         classification: that.state.classification,
  //         durationValidity: timeDuration,
  //         // country: this.state.country,
  //         // postalCode: this.state.postalCode
  //       }
  //       console.log(obj)
  //       console.log(that.state.selectedInstituteId)
  //       axios.post(Routes.CLASSIFICATION + that.props.selectedInstituteName.id, obj)
  //         .then(function (response) {

  //           // console.log(response.data.data.result);
  //           that.setState({
  //             loading: false
  //           })
  //           alert("Classification has been added")
  //           that.props.history.push('/manageClassification')

  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //           console.log(error.response)
  //           console.log(error.response.data.responseMessage)
  //           if (error.response.data.responseCode == Response.BAD_REQUEST) {
  //             that.setState({
  //               alertShow: true,
  //               alertMessage: error.response.data.responseMessage,
  //               theme: "danger",
  //               loading: false
  //             })
  //           }
  //           // that.setState({
  //           //   loading:false
  //           // })
  //         });
  //     }
  //   }
  //   // this.setState({
  //   //   loading:false
  //   // })
  // }
  // dismiss() {
  //   this.setState({ alertShow: false });
  // }

  // toggle(which) {
  //   const newState = { ...this.state };
  //   newState[which] = !this.state[which];
  //   this.setState(newState);
  // }
  // onClickOptionss(ev) {
  //   console.log(ev)
  // }
  // onCancelClick() {
  //   let obj = {
  //     category: '',
  //     classification: '',
  //     durationValidity: null,
  //     instituteName: '',
  //     _id: ''
  //   }
  //   this.props.EditClassification(obj)
  //   this.props.EditClassificationState(false)
  //   this.props.history.push("/manageClassification")
  // }
  // onSaveClick() {
  //   this.setState({
  //     loading: true
  //   })
  //   let that = this;
  //   console.log(that.state.instituteName + " " + that.state.category + " " + that.state.classification + " " + that.state.duration + " " + that.state.durationValidity)
  //   if (that.state.category == "" || this.state.category == "Choose" || that.state.classification == "" || that.state.duration == "" || that.state.durationValidity == "" || this.state.durationValidity == "Choose") {
  //     that.setState({
  //       alertMessage: Strings.ALL_FIELDS_REQUIRED,
  //       alertShow: true,
  //       theme: "danger",
  //       loading: false
  //     })
  //   }
  //   else {
  //     let timeDuration = ""
  //     if (that.state.durationValidity == "year") {
  //       timeDuration = that.state.duration * 31536000
  //     }
  //     else if (that.state.durationValidity == "months") {
  //       timeDuration = that.state.duration * 2592000


  //     }
  //     else if (that.state.durationValidity == "days") {
  //     }
  //     timeDuration = that.state.duration * 86400
  //     console.log(that.props.selectedInstituteName.id)
  //     console.log(timeDuration)
  //     let obj = {
  //       instituteName: that.props.selectedInstituteName.name,
  //       instituteId: that.props.selectedInstituteName.id,
  //       category: that.state.category,
  //       classification: that.state.classification,
  //       durationValidity: timeDuration,
  //       // country: this.state.country,
  //       // postalCode: this.state.postalCode
  //     }
  //     console.log(obj)
  //     console.log(that.state.selectedInstituteId)
  //     axios.put(Routes.EDIT_CLASSIFICATION + that.props.editClassificationData._id, obj)
  //       .then(function (response) {

  //         // console.log(response.data.data.result);
  //         that.setState({
  //           loading: false
  //         })
  //         alert("Classification has been Updated")
  //         that.props.history.push('/manageClassification')

  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //         console.log(error.response);

  //         if (error.response == undefined) {
  //           that.setState({
  //             alertMessage: "Network Error",
  //             alertShow: true,
  //             theme: "danger",
  //             loading: false
  //           })
  //         }
  //         else if (error.response.data.responseCode == Response.BAD_REQUEST) {
  //           that.setState({
  //             alertMessage: error.response.data.responseMessage,
  //             alertShow: true,
  //             theme: "danger",
  //             loading: false
  //           })
  //         }
  //         else {
  //           that.setState({
  //             alertMessage: error.response.data.responseMessage,
  //             alertShow: true,
  //             theme: "danger",
  //             loading: false
  //           })
  //         }
  //       });
  //   }
  // }
  clickEnter(event) {
    console.log(event.key)

    // if (event.key == "Enter") {
    //   if (this.props.editClassificationState) {
    //     this.onSaveClick()
    //   }
    //   else {

    //     this.onRegisterClick()
    //   }
    // }
  }

  handleFieldsChange(i, event) {
    let values = [...this.state.classificationDynamicFields];
    values[i] = {top:0,left:0,htmlStringCode:event.target.value,value:event.target.value , editorValue : event.target.value};
    console.log(values)
    this.setState({ classificationDynamicFields: values });
  }
  componentWillUnmount() {
    console.log(this.state.classificationConstantFields)
    console.log(this.state.classificationDynamicFields)
    if(!this.props.editClassificationState){

      let a = [...this.state.classificationConstantFields]
      a.push(...this.state.classificationDynamicFields)
      console.log(a)
      this.props.ClassificationCombineFields(a)
      this.props.ClassificationTotalFields(a)
    }
  }
  addClick() {
    this.setState(prevState => ({ classificationDynamicFields: [...prevState.classificationDynamicFields, {top: 0, left : 0 , htmlString : '', value : ''}] }))

  }

  removeClick(i) {
    let values = [...this.state.classificationDynamicFields];
    values.splice(i, 1);
    this.setState({ classificationDynamicFields: values });
  }

  // QrVisibility(choice) {
  //   console.log(choice)
  //   if(choice == "Yes"){


  //   this.setState({
  //     QRVisible: choice
  //   });
  //   this.props.QRVisible(true)
  // }
  // else if(choice == "No"){
  //   this.setState({
  //     QRVisible: choice
  //   });
  //   this.props.QRVisible(false)
  // }

  // }

  QrVisibility(e) {
    let temp = this.state.QRVisible
    this.setState({ QRVisible: !temp })
    this.props.QRVisible(!temp)
  }

  render() {
    console.log(this.state.classificationDynamicFields)
    console.log(this.state.QRVisible)
    console.log(this.state.durationTemp)
    console.log(this.props.classificationDurationTime)
    console.log(this.state.classificationConstantFields)
    console.log("edit class",this.props.editClassificationData)

    return (
      <Container fluid className="main-content-container px-4">
        {/* {(this.props.userData.isVerified) ? (
          null
        ) : (
            <Alert className="mb-0" style = {(this.state.isTop)?(null):({position: 'fixed' , zIndex: '100' ,minWidth: "80%", maxWidth: "84%" , transition: "2s"})} open={true} theme="danger">
              <i className="fas fa-exclamation mx-2"></i> Your account is not verified. Please <Link to="account_activation" style={{ color: "white", fontWeight: "bold" }}>click here</Link> to verify it.
        </Alert>
          )}
        <Alert className="mb-0" style = {(this.state.isTop)?(null):({position: 'fixed' , zIndex: '100' ,minWidth: "80%", maxWidth: "84%" , transition: "2s"})} open={this.state.alertShow} theme={this.state.theme} dismissible={this.dismiss}>
          <i className="fas fa-exclamation mx-2"></i> {this.state.alertMessage}
        </Alert> */}
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
                              onKeyPress={this.clickEnter.bind(this)}
                              // onChange={this.classificationChangeHandler}
                              placeholder="Organization Name"
                              disabled
                              // value={(this.props.editClassificationState)?
                              //   (this.props.editClassificationData.instituteName):
                              //   (this.props.selectedInstituteName.name)}
                              value = {this.props.selectedInstituteName.name}
                            />
                          </Col>
                          <Col md="6" className="form-group">
                            <label>Category</label>
                            <FormSelect
                             onChange={this.categoryChangeHandler} 
                             onKeyPress={this.clickEnter.bind(this)}
                              placeholder="Category"
                            //  value={(this.props.editClassificationState)?
                            //     (this.props.editClassificationData.category):
                            //     (this.props.classificationCategory)}  
                            value = {this.props.classificationCategory} 
                                >
                              {
                                this.state.classificationCategory.map((category) => {
                                  return (
                                    <option >{category.categoryName}</option>

                                  )
                                })
                              }
                            </FormSelect>
                          </Col>
                        </Row>
                        <Row >
                          <Col md="6" className="form-group">
                            <label >Classification</label>
                            <FormInput
                              onKeyPress={this.clickEnter.bind(this)}
                              onChange={this.classificationChangeHandler}
                              placeholder="Classification"
                              // value={(this.props.editClassificationState)?
                              //   (this.props.editClassificationData.classification):
                              //   (this.props.classificationName)}
                              value = {this.props.classificationName}
                            />
                          </Col>
                          <Col md="6" className="form-group">
                            <label >Duration Validity</label>
                            <InputGroup className="mb-3">
                              <FormInput
                                value={this.props.classificationDurationTime}
                                onChange={this.durationChangeHandler}
                                onKeyPress={this.clickEnter.bind(this)}
                                placeholder="Duration"
                                disabled = {this.state.durationValidityDisabled}
                              />
                              <FormSelect value={this.props.classificationDurationSpan} type="append" onKeyPress={this.clickEnter.bind(this)} onChange={this.timedurationChangeHandler}>
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
                        </Row>
                        {/* <Row >
                         <Col md="12" className="form-group"> */}
                        <label >Classification Fields</label>
                        <div>
                          <Row>
                            {
                              this.state.classificationConstantFields.map((el, i) =>
                              <Col md="3" style={{ marginBottom: "10px" }}>
                              {console.log(el)}
                                  <span key={i} >
                                    <FormInput
                                      type="text"
                                      value={el.value}
                                      disabled
                                    />
                                  </span>
                                </Col>
                              )
                            }
                            {
                              this.state.classificationDynamicFields.map((el, i) =>
                                <Col md="3" style={{ marginBottom: "5px" }}>
                                  <span key={i} style={{ width: "165px" }}>
                                    <span style={{ display: "flex", border: "1px solid #e1e5eb", borderRadius: ".25rem" }}>
                                      <FormInput
                                        style={{ border: "none" }}
                                        type="text"
                                        value={el.value || ''}
                                        placeholder="Certificate Field"
                                        onChange={this.handleFieldsChange.bind(this, i)}
                                      />
                                      <span style={{ marginRight: "6px", fontSize: "18px", cursor: 'pointer', color: "rgba(73, 80, 87, 0.7)", alignSelf : 'center' }} onClick={this.removeClick.bind(this, i)} >x</span>
                                    </span>
                                  </span>
                                </Col>
                              )
                            }
                            <Col md="3" style={{ marginTop: "10px" }}>
                              <span style={{ fontSize: "14px", color: 'gray', cursor: 'pointer' }} onClick={this.addClick.bind(this)} >+ add Certificate Fields</span>
                            </Col>
                          </Row>
                        </div>
                        {/* </Col>
                        </Row> */}
                        <Row>
                          <Col md="6" className="form-group">
                            <div>
                              <FormCheckbox
                                checked={this.state.QRVisible}
                                onChange={e => this.QrVisibility(e)}
                              >
                                QR Code
                            </FormCheckbox>
                            </div>
                          </Col>
                        </Row>
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


                        {/* ********************************************* */}

                        {/* Commented while shifting to the progress bar */}

                        {/* {(this.props.editClassificationState)?(
                          (this.state.loading)?(<img src = {loader} className = "loader"/>):(
                             <div>
                                <span size="sm"  className="mb-2 mr-1 worldcerts-button"
                          onClick={this.onSaveClick.bind(this)}
                        >Save</span>
                        <span size="sm" theme = "success"  className="mb-2 mr-1 worldcerts-button"
                          onClick={this.onCancelClick.bind(this)}
                        >Cancel</span>
                            
                            
                          </div>)
                         
                        ):(
                          (this.state.loading)?(<img src = {loader} className = "loader"/>):(
                            <div>
                            <span size="sm" className="mb-2 mr-1 worldcerts-button"
                          onClick={this.onRegisterClick.bind(this)}
                        >Register</span>
                         
                        </div>
                          )
                          
                        )} */}



                        {/* ********************************************* */}

                        {/* {(this.props.editClassificationState)?(
                           <>
                           <span size="sm"  className="mb-2 mr-1 worldcerts-button"
                            onClick={this.onSaveClick.bind(this)}
                          >Save</span>
                          <span size="sm" theme = "success"  className="mb-2 mr-1 worldcerts-button"
                            onClick={this.onCancelClick.bind(this)}
                          >Cancel</span>
                          </>
                        ):(
                          <span size="sm" className="mb-2 mr-1 worldcerts-button"
                          onClick={this.onRegisterClick.bind(this)}
                        >Register</span>
                        )} */}


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
    selectedInstituteName: state.user_reducer.selectedInstituteName,
    editClassificationState: state.dashboard_reducer.editClassificationState,
    editClassificationData: state.dashboard_reducer.editClassificationData,
    qrVisibility: state.dashboard_reducer.qrVisibility,
    classificationCertificate: state.dashboard_reducer.image,
    classificationCategory: state.dashboard_reducer.registerClassificationCategory,
    classificationName: state.dashboard_reducer.registerClassificationName,
    classificationDurationTime: state.dashboard_reducer.registerClassificationDurationTime,
    classificationDurationSpan: state.dashboard_reducer.registerClassificationDurationSpan,

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
    ClassificationCategory: (data) => {
      dispatch(ClassificationCategory(data))
    },
    ClassificationInstituteName: (data) => {
      dispatch(ClassificationInstituteName(data))
    },
    ClassificationDurationTime: (data) => {
      dispatch(ClassificationDurationTime(data))
    },
    ClassificationDurationSpan: (data) => {
      dispatch(ClassificationDurationSpan(data))
    },
    ClassificationName: (data) => {
      dispatch(ClassificationName(data))
    },
    QRVisible: (choice) => {
      dispatch(QRVisibility(choice))
    },
    ClassificationCombineFields: (fields) => {
      dispatch(ClassificationCombineFields(fields))
    },
    ClassificationTotalFields : (fields) => {
    dispatch(ClassificationTotalFields(fields))
  }
}
}

export default connect(mapStateToProps, mapDispatchToProps)(InstituteRegistration);
