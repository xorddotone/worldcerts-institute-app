import React, { Component } from "react";
import {
  Card,
  CardHeader,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  FormInput,
  FormSelect,
  FormTextarea,
  Button,
  Alert
} from "shards-react";
import { connect } from 'react-redux';
import * as constants from '../constants/apiRoutes'
import axios from 'axios'
import PageTitle from "../components/common/PageTitle";
import * as Strings from '../constants/strings'
import * as Routes from '../constants/apiRoutes'
import * as Response from '../constants/responseCodes'
import loader from '../images/loader.gif'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import ReactPhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/dist/style.css'
import upload from '../images/upload.svg'

var reader;


class AddClassification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instituteName: '',
      buisnessRegistrationNum: "",
      instituteAddress: '',
      instituteWebsite: '',
      instituteTelephone: '',
      country: '',
      postalCode: '',
      ErrorStatus: false,
      error: "",
      alertShow: false,
      alertMessage: "",
      theme: "",
      loader: false,
      options: countryList().getData(),
      countryValue: null,
    }
    this.instituteNameChangeHandler = this.instituteNameChangeHandler.bind(this)
    this.buisnessRegistrationNumChangeHandler = this.buisnessRegistrationNumChangeHandler.bind(this)
    this.instituteAddressChangeHandler = this.instituteAddressChangeHandler.bind(this)
    this.instituteWebsiteChangeHandler = this.instituteWebsiteChangeHandler.bind(this)
    this.instituteTelephoneChangeHandler = this.instituteTelephoneChangeHandler.bind(this)
    this.countryChangeHandler = this.countryChangeHandler.bind(this)
    this.postalcodeChangeHandler = this.postalcodeChangeHandler.bind(this)
    this.dismiss = this.dismiss.bind(this)
    this.openFileDialog = this.openFileDialog.bind(this);
    this.onFilesAdded = this.onFilesAdded.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.handleFileChoosen = this.handleFileChoosen.bind(this)
    this.fileInputRef = React.createRef();

  }

  componentWillMount() {
    // this.props.UpdateTitle("Insttue Registration");
  }

  instituteNameChangeHandler(ev) {
    console.log(ev.target.value)
    this.setState({
      instituteName: ev.target.value
    })
  }

  buisnessRegistrationNumChangeHandler(ev) {
    console.log(ev.target.value)

    this.setState({
      buisnessRegistrationNum: ev.target.value
    })
  }

  instituteAddressChangeHandler(ev) {
    console.log(ev.target.value)
    this.setState({
      instituteAddress: ev.target.value
    })
  }

  instituteWebsiteChangeHandler(ev) {
    console.log(ev.target.value)
    this.setState({
      instituteWebsite: ev.target.value
    })
  }

  instituteTelephoneChangeHandler(ev) {
    console.log(ev)
    this.setState({
      instituteTelephone: ev
    })
  }

  countryChangeHandler(value) {
    console.log(value)
    console.log(value.label)
    this.setState({
      countryValue: value , country: value.label
    })
  
  }

  postalcodeChangeHandler(ev) {

    console.log(ev.target.value)
    this.setState({
      postalCode: ev.target.value
    })
  }

  onRegisterClick() {
    let that = this;
    this.setState({
      loader: true
    })
    // let obj = {
    //   instituteName: "UBIT",
    //   category: "Diploma",
    //   classification: "BSCS",
    //   durationValidity: 63072000,
    //   // country: this.state.country,
    //   // postalCode: this.state.postalCode
    // }
    // console.log(obj)
    // console.log(this.state.selectedInstituteId)
    // axios.post(Routes.CLASSIFICATION + "5d70a0815d68d6110febb4e2", obj)
    //   .then(function (response) {

    //     // console.log(response.data.data.result);
    //     alert("Classification has been added")
    //     that.props.history.push('/manageClassification')

    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    console.log(this.state)
    if ( this.state.country == " " || this.state.instituteAddress == " " || this.state.instituteName == " " || this.state.instituteTelephone == " " || this.state.instituteWebsite == " " || this.state.postalCode == " " ||this.state.country == "" || this.state.instituteAddress == "" || this.state.instituteName == "" || this.state.instituteTelephone == "" || this.state.instituteWebsite == "" || this.state.postalCode == "") {
      console.log(Strings.ALL_FIELDS_REQUIRED)
      this.setState({
        ErrorStatus: true,
        alertShow: true,
        theme: "danger",
        alertMessage: Strings.ALL_FIELDS_REQUIRED,
        error: Strings.ALL_FIELDS_REQUIRED,
        loader: false
      })
    }
    else {
      let organization = this.state.instituteName.toLowerCase()
      console.log(organization)
      let obj = {
        companyName: this.state.instituteName,
        companyAddress: this.state.instituteAddress,
        companyWebsite: this.state.instituteWebsite,
        companyContactNumber: this.state.instituteTelephone,
        country: this.state.country,
        postalCode: this.state.postalCode
      }
      console.log(obj)
      console.log(this.props.userData._id)
      axios.post(Routes.REGISTER_INSTITUTE + this.props.userData._id, obj)
        .then(function (response) {

          console.log(response);
          if (response.data.result == "registration number is too long") {
            that.setState({
              ErrorStatus: true,
              error: Strings.REGISTRATION_NUMBER_LONG,
              loader: false
            })
            console.log(response.data.result)
          }
          else {


            console.log(response.data.result)

            that.setState({
              instituteName: '',
              buisnessRegistrationNum: ' ',
              instituteAddress: '',
              instituteWebsite: '',
              instituteTelephone: '',
              country: '',
              postalCode: ' ',
              ErrorStatus: false,
              loader: false
            })
            that.setState({ alertShow: true })

            that.props.history.push("/home")
          }
        })
        .catch(function (error) {

          console.log(error.response);
          if (error.response == undefined) {
            that.setState({
              alertShow: true, alertMessage: "Network Error", theme: "danger", loader: false
            })
          }
          else if (error.response.data.responseCode == Response.BAD_REQUEST) {
            that.setState({
              alertShow: true, alertMessage: error.response.data.responseMessage, theme: "danger", loader: false

            })
          }
          else {
            that.setState({
              alertShow: true, alertMessage: error.response.data.responseMessage, theme: "danger", loader: false

            })
          }
        });

    }
  }
  dismiss() {
    this.setState({ alertShow: false });
  }
  clickEnter(event) {
    console.log(event.key)

    if (event.key == "Enter") {
      this.onRegisterClick()
    }
  }

  openFileDialog() {
    if (this.props.disabled) return;

    this.fileInputRef.current.click();
  }

  onFilesAdded(evt) {
    console.log(evt)
    this.handleFileChoosen(evt.target.files[0])
    if (this.props.disabled) return;

    const files = evt.target.files;
    if (this.props.onFilesAdded) {
      const array = this.fileListToArray(files);
      // this.props.onFilesAdded(array);
    }
    console.log(files)
  }

  onDragOver(evt) {
    // evt.preventDefault();
    window.addEventListener("dragover",function(e){
      e = e || evt;
      e.preventDefault();
    },false);
    if (this.props.disabled) return;

    this.setState({ hightlight: true });
  }

  onDragLeave() {

    this.setState({ hightlight: false });
  }

  onDrop(event) {
    console.log(event)
    // event.preventDefault();
    window.addEventListener("drop",function(e){
      e = e || event;
      e.preventDefault();
    },false);
    console.log(event.dataTransfer.getData("image/jpeg"))
    console.log(event, event.dataTransfer)
    console.log(event.dataTransfer)
    console.log(event.dataTransfer.files)
    if (this.props.disabled) return;
    console.log(event.dataTransfer)

      if (event.dataTransfer.files[0] == undefined) {
        alert("invalid file uploaded")
      }
      else {

        if (event.dataTransfer.files[0].type == "application/json") {

          // console.log("json file")
          const files = event.dataTransfer.files;
          
            const array = this.handleFileChoosen(files[0]);
            console.log(array)
          this.setState({ hightlight: false });
        }
        else {
          alert("invalid file uploaded")
        }
      }
    


  }

  fileListToArray(list) {
    const array = [];
    for (var i = 0; i < list.length; i++) {
      array.push(list.item(i));
    }
    return array;
  }

  handleFileChoosen(files) {
    let that = this
    console.log(files)
    reader = new FileReader();
    reader.onloadend = function (e) {
      let content = reader.result
      console.log(content)
    }
    reader.readAsText(files)
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Alert className="mb-0" open={this.state.alertShow} theme={this.state.theme} dismissible={this.dismiss}>
          <i className="fas fa-exclamation mx-2"></i>{this.state.alertMessage}
        </Alert>
        <Row noGutters className="page-header py-4">
          <PageTitle title="Organization Registration" md="12" className="ml-sm-auto mr-sm-auto cursor-default" />
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
                        <Row form>
                          <Col md="6" className="form-group">
                            <label>Business Legal Name</label>
                            <FormInput
                              onKeyPress={this.clickEnter.bind(this)}
                              onChange={this.instituteNameChangeHandler}
                              placeholder="Organization Name"
                              value={this.state.instituteName}
                            />
                          </Col>
                          <Col md="6" className="form-group">
                          <label>Business Address</label>
                            <FormInput
                              onKeyPress={this.clickEnter.bind(this)}
                              onChange={this.instituteAddressChangeHandler}
                              placeholder="Business Address"
                              value={this.state.instituteAddress}
                            />
                          </Col>
                        </Row>
                        <Row form>
                          <Col md="6" className="form-group">
                            <label>Country</label>
                            {/* <FormInput
                      onKeyPress={this.clickEnter.bind(this)}
                        onChange={this.countryChangeHandler}
                        placeholder="Country"
                        value={this.state.country}
                      /> */}
                            <Select
                              options={this.state.options}
                              value={this.state.countryValue}
                              onChange={this.countryChangeHandler}
                            />
                          </Col>
                          <Col md="6" className="form-group">
                            <label>Postal Code</label>
                            <FormInput
                              onKeyPress={this.clickEnter.bind(this)}
                              onChange={this.postalcodeChangeHandler}
                              placeholder="Postal Code"
                              value={this.state.postalCode}
                            />
                          </Col>
                        </Row>
                        <Row form style={{ marginTop: "15px" }}>

                          <Col md="6">
                            <label>Business Website</label>
                            <FormInput
                              onKeyPress={this.clickEnter.bind(this)}
                              onChange={this.instituteWebsiteChangeHandler}
                              placeholder="Business Website"
                              value={this.state.instituteWebsite}
                            />
                          </Col>
                          <Col md="6">
                            <label>Business Contact No</label>
                            <ReactPhoneInput
                              onKeyPress={this.clickEnter.bind(this)}
                              defaultCountry={'us'}
                              value={this.state.instituteTelephone}
                              onChange={this.instituteTelephoneChangeHandler} />
                          </Col>


                        </Row>
                        {/* <Row form style={{ marginTop: "15px" }}>
       
                        <label>Organization Documents</label>


            <div style={{  border: '1px dashed #d0c5c5', padding: "2em" ,textAlign: "center" , width: "100%"}}>
              <div
                className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}`}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}

                style={{ cursor: this.props.disabled ? "default" : "pointer" }}
              >
                
                <Row style={{ padding: "0 4px" }}>
                  <Col md="12">
                    <div style={{ textAlign: 'center' }} onClick={this.openFileDialog}>
                      <input
                        ref={this.fileInputRef}
                        className="FileInput"
                        type="file"
                        accept="image/jpg,image/png,image/jpeg,application/pdf"
                        multiple
                        onChange={e => { this.handleFileChoosen(e.target.files[0]) }}
                        onChange={this.onFilesAdded}
                      />

                      <img
                        alt="upload"
                        className="Icon"
                        src={upload}
                      />

                      <span style={{ fontSize: "13px", color: "grey" }}> Drag n drop your Documents in the form of images or PDF, or click to select files</span>
                    </div>
                  </Col>
                
                </Row>

              </div>
            </div>
     </Row> */}
                        <hr />

                        {(this.state.loader) ? (<img src={loader} className="loader" />) : (<span size="sm" className="mb-2 mr-1 worldcerts-button"
                          onClick={this.onRegisterClick.bind(this)}
                        >Create</span>)}
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
  console.log(Strings.REDUX, state.pageTitle);
  return {
    Title: state.pageTitle,
    userData: state.user_reducer.user

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // UpdateTitle: (title) => dispatch(pageTitle(title))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AddClassification);

