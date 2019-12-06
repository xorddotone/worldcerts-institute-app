

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
import { EditClassification, EditClassificationState, ClassificationCategory, QRVisibility, ClassificationCombineFields, ClassificationInstituteName, ClassificationTotalFields, ClassificationDurationTime, ClassificationDurationSpan, ClassificationName, CertificateAllFields, CertificateFieldsFlag } from "../redux/actions/dashboard-action"
import { Link } from 'react-router-dom'
import { Checkbox } from "@material-ui/core"

const duration = [
  "No Expiry", "Year", "Months", "Days"
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
      isLastDynamicFieldEmpty: false,
      isDuplicateFields: false,
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
    this.QrVisibility = this.QrVisibility.bind(this)
  }


  static getDerivedStateFromProps(props, state) {
    console.log("class ===>", props.classificationCombineFields)
    if (props.classificationCombineFields && props.classificationCombineFields.length !== state.classificationConstantFields.length) {
      return {
        classificationConstantFields: props.ClassificationCombineFields,
        classificationDynamicFields: props.ClassificationCombineFields
      }
    }
    return {}
  }

  async componentDidMount() {
    console.log(this.props.userData)
    console.log(this.props.editClassificationData)
    let classificationConstants = []
    let temp;
    let temp2;
    let that = this;
    if (this.props.classificationDurationSpan == "No Expiry" || this.props.classificationDurationSpan == "Choose" || this.props.classificationDurationSpan == "") {
      console.log("IN duration disabled")
      this.setState({
        durationValidityDisabled: true
      })
    }
    else {
      this.setState({
        durationValidityDisabled: false
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
   
      if (!this.props.editClassificationState) {
           await axios.get(Routes.GET_CLASSIFICATION_FIELDS)
      .then(function (response) {
        // handle success
        console.log(response);
        console.log(response.data.result)
        let temp = response.data.result
        for (var i = 0; i < temp.length; i++) {
          temp[i] === "name" ? classificationConstants.push({ top: 0, left: 0, htmlStringCode: "", value: temp[i], editorValue: temp[i], checked: true })
            : classificationConstants.push({ top: 0, left: 0, htmlStringCode: "", value: temp[i], editorValue: temp[i], checked: false })
        }
        console.log("classificationConstants ==>", classificationConstants)
        that.setState({
          classificationConstantFields: classificationConstants
        })

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    }
    else if(this.props.editClassificationState) {
      this.props.ClassificationCategory(this.props.editClassificationData.category)
      this.props.ClassificationName(this.props.editClassificationData.classification)
      this.props.ClassificationDurationTime(this.props.editClassificationData.durationValidity.durationTime)
      this.props.ClassificationDurationSpan(this.props.editClassificationData.durationValidity.durationSpan)
      console.log("totalCertificateFields", this.props.editClassificationData.totalCertificateFields)
      // let totalCertificateFields = [...this.state.classificationDynamicFields]
      // totalCertificateFields.push( this.props.editClassificationData.totalCertificateFields)
      let tempDynamicClassification = []
     
      console.log(classificationConstants)
      for (let i = 0; i < this.props.editClassificationData.totalCertificateFields.length; i++) {
          if(this.props.editClassificationData.totalCertificateFields[i].value == "name" ||this.props.editClassificationData.totalCertificateFields[i].value == "email" ){
            classificationConstants.push(this.props.editClassificationData.totalCertificateFields[i])
          }
          else{
            tempDynamicClassification.push(this.props.editClassificationData.totalCertificateFields[i])
          }
        // let found = classificationConstants.some(el =>
        //   el.value == this.props.editClassificationData.totalCertificateFields[i].value
        // )
        // if (!found) {
        //   tempDynamicClassification.push(this.props.editClassificationData.totalCertificateFields[i])
        // }
      }
      console.log(classificationConstants)
      console.log(tempDynamicClassification)
      console.log(this.props.editClassificationData.totalCertificateFields)
      console.log(this.props.editClassificationData.combineCertificateFields)
      console.log(tempDynamicClassification)
      let temp = this.props.editClassificationData.totalCertificateFields.map(obj =>
       
                this.props.editClassificationData.combineCertificateFields.find(dynamicFieldsObj =>
          dynamicFieldsObj.value === obj.value 
        ) || obj
      )
      console.log(temp)

      console.log(tempDynamicClassification)
      for(let i = 0 ; i< this.props.editClassificationData.combineCertificateFields.length ; i++ ){
        if(this.props.editClassificationData.combineCertificateFields[i].value == true){
          temp.push(this.props.editClassificationData.combineCertificateFields[i])
        }
      }
      console.log(temp)
      this.setState({
        classificationDynamicFields: tempDynamicClassification
      })
      console.log(temp)
      console.log(tempDynamicClassification)
      let temp2 = []
      for(var i = 0 ; i<temp.length ; i++){
        if(temp[i].checked == true){
          temp2.push(temp[i])
        }
      }
      console.log(classificationConstants)
      this.setState({
        classificationConstantFields: temp2
      })
      console.log(temp2)
      console.log(temp)
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
    console.log(ev.target.value)
    this.setState({
      instituteName: ev.target.value
    })

  }

  durationChangeHandler(ev) {
    console.log('ee ==>', ev.target.value)
    var reg = new RegExp('^\\d+$');
    // var reg1 = new RegExp('[A-Za-z]+');
    // console.log(reg1.test(ev.target.value))
    console.log(reg.test(ev.target.value))
    if (reg.test(ev.target.value) || ev.target.value == "") {
      console.log("inside")

      this.setState({
        durationTemp: ev.target.value,
        duration: ev.target.value
      })
      if (this.state.durationValidity == "No Expiry") {
        this.props.ClassificationDurationTime("")
      }
      else {
        this.props.ClassificationDurationTime(ev.target.value)
      }
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
    if (ev.target.value == "No Expiry" || ev.target.value == "Choose") {
      this.setState({
        durationValidity: ev.target.value,
        duration: "",
        durationValidityDisabled: true
      })
      this.props.ClassificationDurationTime("")
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

  clickEnter(event) {
    console.log(event.key)


  }

  handleFieldsChange(i, event) {
    let values = [...this.state.classificationDynamicFields];
    const combinedFileds = [...this.state.classificationConstantFields, ...this.state.classificationDynamicFields];
    this.props.CertificateAllFields(combinedFileds)

    const contains = combinedFileds.some(item => item.value.toLowerCase() === event.target.value.toLowerCase())
    let duplicate = false;
    let { isLastDynamicFieldEmpty: isEmpty } = this.state;
    if (contains) {
      values[i] = { checked : values[i].checked, top: 0, left: 0, htmlStringCode: "", value: event.target.value, editorValue: event.target.value, style: { border: "1px solid red" } };
      duplicate = true;
    }
    else {
      values[i] = { checked : values[i].checked, top: 0, left: 0, htmlStringCode: "", value: event.target.value, editorValue: event.target.value, style: {} };
      duplicate = false
    }
    console.log(values)
    if (event.target.value.trim() === "") {
      isEmpty = true
    }
    else {
      isEmpty = false
    }
    let obj = {
      isEmpty,
      duplicate
    }
    this.props.CertificateFieldsFlag(obj)
    this.setState({ classificationDynamicFields: values, isLastDynamicFieldEmpty: isEmpty, isDuplicateFields: duplicate });
  }
  componentWillUnmount() {
    console.log(this.state.classificationConstantFields)
    console.log(this.state.classificationDynamicFields)
    // if (!this.props.editClassificationState) {

      let a = [...this.state.classificationConstantFields]
      a.push(...this.state.classificationDynamicFields)
      let b = a.filter(item => item.checked)
      console.log(a)
      console.log(b)
      this.props.ClassificationCombineFields(b)
      this.props.ClassificationTotalFields(a)
    // }
  }
  addClick() {
    this.setState(prevState => ({ classificationDynamicFields: [...prevState.classificationDynamicFields, { top: 0, left: 0, htmlString: '', value: '', checked: false }], isLastDynamicFieldEmpty: true }))
    let obj = {
      isEmpty: true,
      duplicate: false
    }
    this.props.CertificateFieldsFlag(obj)
  }

  removeClick(i) {
    console.log(this.state.classificationDynamicFields)
    let { isLastDynamicFieldEmpty: isEmpty } = this.state;
    let values = [...this.state.classificationDynamicFields];
    values.splice(i, 1);
    this.setState({ classificationDynamicFields: values }); 
    const combinedFileds = [...this.state.classificationConstantFields, ...this.state.classificationDynamicFields];
    // this.props.CertificateAllFields(combinedFileds)
    
    console.log(values)
    if(values.length == 0){
      isEmpty = false 
      this.setState({isLastDynamicFieldEmpty : false})
    }
    else{
    for(var key in values){
      console.log(key)
      console.log(values)
      
      if (values[key].value.trim() === "") {
        console.log("here")
        isEmpty = true
        this.setState({isLastDynamicFieldEmpty : true})
      }
      else {
        console.log("here 2")
        isEmpty = false 
        this.setState({isLastDynamicFieldEmpty : false})

      }
    }
  }
    let obj={
      isEmpty,
      duplicate:this.props.certificateFieldsFlag
    }
    this.props.CertificateFieldsFlag(obj)
 
  }



  QrVisibility(e) {
    let temp = this.state.QRVisible
    this.setState({ QRVisible: !temp })
    this.props.QRVisible(!temp)
  }

  constantCheckboxs = (i) => {
    console.log("constantCheckBoxes")
    let constantFields = [...this.state.classificationConstantFields];
    constantFields[i].checked = !constantFields[i].checked
    this.setState({ classificationConstantFields: constantFields })
    console.log("constantFields" , constantFields)
  }

  dynamicCheckboxs = (i) => {
    console.log("dynamic check boxes")

    let constantFields = [...this.state.classificationDynamicFields];
    constantFields[i].checked = !constantFields[i].checked
    this.setState({ classificationDynamicFields: constantFields })
    console.log("Dynamic fields" , constantFields)

  }


  render() {
    const overlayStyle = {
      height: "100%",
      width: "100%",
      position: "absolute",
      top: 0,
      zIndex: 1000,
      left: 0,
      cursor: 'not-allowed'
    }
    console.log(this.state.classificationDynamicFields)
    console.log(this.state.QRVisible)
    console.log(this.state.durationTemp)
    console.log(this.props.classificationDurationTime)
    console.log(this.state.classificationConstantFields)
    console.log("edit class", this.props.editClassificationData)

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
          <PageTitle title="Certificate Details" md="12" className="ml-sm-auto mr-sm-auto cursor-default" />
          {/* subtitle="Registration" */}
        </Row>
        <Row>
          <Col lg="12">
            <Card small className="mb-4">
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
                              placeholder="Organization Name"
                              disabled
                              value={this.props.selectedInstituteName.name}
                            />
                          </Col>
                          <Col md="6" className="form-group">
                            <label>Orientation</label>
                            <FormSelect
                              onChange={this.categoryChangeHandler}
                              onKeyPress={this.clickEnter.bind(this)}
                              placeholder="Category"
                              value={this.props.classificationCategory}
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
                            <label >Name of Certificate</label>
                            <FormInput
                              onKeyPress={this.clickEnter.bind(this)}
                              onChange={this.classificationChangeHandler}
                              placeholder="Name"
                              value={this.props.classificationName}
                            />
                          </Col>
                          <Col md="6" className="form-group">
                            <label >Certificate Validity</label>
                            <InputGroup className="mb-3">
                              <FormInput
                                value={this.props.classificationDurationTime}
                                onChange={this.durationChangeHandler}
                                onKeyPress={this.clickEnter.bind(this)}
                                placeholder="Validity"
                                disabled={this.state.durationValidityDisabled}
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

                        <label >Certificate Data Fields</label>
                        <div>
                          <Row>
                            {
                              this.state.classificationConstantFields.map((el, i) =>
                                <Col md="3" style={{ marginBottom: "10px" }}>
                                  {console.log("is checked ==>", this.state.classificationConstantFields[i].checked)}
                                  <div>
                                    {el.value === "name" ? <Checkbox checked disabled /> : <Checkbox checked={el.checked} onChange={() => this.constantCheckboxs(i)} />}
                                    <span key={i} style={{ width: "calc(100% - 42px)", display: "inline-block" }} >
                                      <FormInput
                                        type="text"
                                        value={el.value}
                                        disabled
                                      />
                                    </span>
                                  </div>

                                </Col>
                              )
                            }
                            {
                              this.state.classificationDynamicFields.map((el, i) =>
                                <Col md="3" style={{ marginBottom: "5px" }}>
                                  <div>

                                    <Checkbox checked = {el.checked} onChange={() => this.dynamicCheckboxs(i)} />
                                    <span style={{ display: "inline-flex", width: "calc(100% - 42px)", border: "1px solid #e1e5eb", borderRadius: ".25rem" }}>
                                      <FormInput
                                        style={{ border: "none", ...el.style }}
                                        type="text"
                                        value={el.value || ''}
                                        placeholder="Certificate Field"
                                        onChange={this.handleFieldsChange.bind(this, i)}
                                      />
                                      <span style={{ marginRight: "6px", fontSize: "18px", cursor: 'pointer', color: "rgba(73, 80, 87, 0.7)", alignSelf: 'center' }} onClick={this.removeClick.bind(this, i)} >x</span>
                                    </span>
                                  </div>

                                </Col>
                              )
                            }
                            <Col md="3" style={{ marginTop: "10px", height: 41 }}>
                              {(this.state.isLastDynamicFieldEmpty || this.state.isDuplicateFields) && <div style={overlayStyle} ></div>}
                              <span style={{ fontSize: "13px", color: 'gray', cursor: 'pointer' }} onClick={this.addClick.bind(this)} >+ Add Custom Data Fields</span>
                            </Col>
                          </Row>
                        </div>

                        {/* <Row>
                          <Col md="12" className="form-group" style={{ marginTop: 10 }} >*/}
                        <div>
                          <FormCheckbox
                            toggle small
                            checked={this.state.QRVisible}
                            onChange={e => this.QrVisibility(e)}
                          >
                            Display QR code on certificate (for quick verification)
                            </FormCheckbox>
                        </div>
                        {/* <div>
                              – Yes/No
                            </div> */}

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
    certificateFieldsFlag :state.dashboard_reducer.certificateFieldsFlag 
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
    ClassificationTotalFields: (fields) => {
      dispatch(ClassificationTotalFields(fields))
    },
    CertificateAllFields: (fields) => {
      dispatch(CertificateAllFields(fields))
    },
    CertificateFieldsFlag: (fields) => {
      dispatch(CertificateFieldsFlag(fields))
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InstituteRegistration);
