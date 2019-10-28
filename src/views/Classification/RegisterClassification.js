

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
} from "shards-react";
import PageTitle from "../../components/common/PageTitle";
// import { pageTitle } from '../Redux/action';
import { connect } from 'react-redux';
import * as Strings from '../../constants/strings'
import * as Response from '../../constants/responseCodes'
import axios from 'axios'
import * as Routes from '../../constants/apiRoutes'
import loader from '../../images/loader.gif'
import { EditClassification, EditClassificationState } from "../../redux/actions/dashboard-action"
import { Link, withRouter } from 'react-router-dom'

const duration = [
  "Choose", "year", "months", "days"
]
var CLOUDINARY_API = 'https://api.cloudinary.com/v1_1/demoworldcert/upload'
var CLOUDINARY_PRESET = 'demoWorldCertification'
class RegisterClassification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instituteName: '',
      category: '',
      classification: this.props.editClassificationData.classification,
      duration: null,
      durationTemp: "",
      durationValidity: '',
      ErrorStatus: false,
      error: "",
      dropdown1: false,
      dropdown2: false,
      registeredInstitute: [],
      classificationCategory: [],
      selectedInstituteId: "",
      alertShow: false,
      alertMessage: "",
      loading: false,
      certificateImageURL: ''
    }
    this.onRegisterClick = this.onRegisterClick.bind(this)
    this.dismiss = this.dismiss.bind(this)
  }

  componentDidMount() {



  }


  async onRegisterClick() {
    console.log("#################################################3")
    console.log(this.props.classificationName, this.props.classificationCategory, this.props.classificationDuration, this.props.classificationDurationValidity)
    console.log(typeof (this.props.classificationDuration))
    console.log(this.props.classificationCertificate)
    console.log(this.props.classificationFields)
    let imageURL = ''
    // console.log(this.state.selectedInstituteId)
    this.setState({
      loading: true
    })
    console.log(this.props.selectedInstituteName)
    if (this.props.selectedInstituteName.name == "Select Organization") {
      console.log("innnnnnnnnnnnnnnnnnnnnnnnnnnnnnn")

      this.setState({
        alertShow: true,
        alertMessage: "Select Institute",
        theme: "danger",
        loading: false

      })
      // alert("up")
      // this.setState({
      //   loading:false
      // })
    }
    else {
      let that = this;
      // console.log(that.state.instituteName + " " + that.state.category +  " " + that.state.classification + " " +that.state.duration  + " " +  that.state.durationValidity )
      if (that.props.classificationCategory == "" || that.props.classificationCategory == "Choose" || that.props.classificationName == "") {

        that.setState({
          alertMessage: Strings.ALL_FIELDS_REQUIRED,
          alertShow: true,
          theme: "info",
          loading: false
        })
      }
      else {
        let timeDuration = ""
        if (that.props.classificationDurationValidity == "year") {
          timeDuration = that.props.classificationDuration * 31536000
        }
        else if (that.props.classificationDurationValidity == "months") {
          timeDuration = that.props.classificationDuration * 2592000
        }
        else if (that.props.classificationDurationValidity == "days") {
          timeDuration = that.props.classificationDuration * 86400
        }
        else if(that.props.classificationDurationValidity == "" ||that.props.classificationDurationValidity == "Choose" ){
          timeDuration = 0
        }

        console.log(timeDuration)
        let imageFile = this.props.classificationCertificate
        console.log(imageFile)
        var formData = new FormData()
        formData.append('file', imageFile)
        formData.append('upload_preset', Routes.CLOUDINARY_PRESET)
        await axios.post(Routes.CLOUDINARY_API, formData)
          .then(function (res) {
            console.log(res)
            console.log(res.data.secure_url)
            imageURL = res.data.secure_url
          })
          .catch(function (err) {
            console.log("err", err)
          })
        let obj = {
          instituteName: that.props.selectedInstituteName.name,
          category: that.props.classificationCategory,
          classification: that.props.classificationName,
          durationValidity: timeDuration,
          certificateImageUrl: imageURL,
          dynamicCertificateFields: that.props.classificationFields

          // country: this.state.country,
          // postalCode: this.state.postalCode
        }
        console.log(obj)
        //   console.log(that.state.selectedInstituteId)
        axios.post(Routes.CLASSIFICATION + that.props.selectedInstituteName.id, obj)
          .then(function (response) {

            // console.log(response.data.data.result);
            that.setState({
              loading: false
            })
            alert("Classification has been added")
            that.props.history.push('/manageClassification')

          })
          .catch(function (error) {
            console.log(error);
            console.log(error.response)
            console.log(error.response.data.responseMessage)
            if (error.response.data.responseCode == Response.BAD_REQUEST) {
              that.setState({
                alertShow: true,
                alertMessage: error.response.data.responseMessage,
                theme: "danger",
                loading: false
              })
            }
            // that.setState({
            //   loading:false
            // })
          });
      }
    }
    // this.setState({
    //   loading:false
    // })
  }
  dismiss() {
    this.setState({ alertShow: false });
  }

  toggle(which) {
    const newState = { ...this.state };
    newState[which] = !this.state[which];
    this.setState(newState);
  }
  onClickOptionss(ev) {
    console.log(ev)
  }
  onCancelClick() {
    let obj = {
      category: '',
      classification: '',
      durationValidity: null,
      instituteName: '',
      _id: ''
    }
    this.props.EditClassification(obj)
    this.props.EditClassificationState(false)
    this.props.history.push("/manageClassification")
  }
  onSaveClick() {
    this.setState({
      loading: true
    })
    let that = this;
    console.log(that.state.instituteName + " " + that.state.category + " " + that.state.classification + " " + that.state.duration + " " + that.state.durationValidity)
    if (that.state.category == "" || this.state.category == "Choose" || that.state.classification == "" || that.state.duration == "" || that.state.durationValidity == "" || this.state.durationValidity == "Choose") {
      that.setState({
        alertMessage: Strings.ALL_FIELDS_REQUIRED,
        alertShow: true,
        theme: "danger",
        loading: false
      })
    }
    else {
      let timeDuration = ""
      if (that.state.durationValidity == "year") {
        timeDuration = that.state.duration * 31536000
      }
      else if (that.state.durationValidity == "months") {
        timeDuration = that.state.duration * 2592000


      }
      else if (that.state.durationValidity == "days") {
      }
      timeDuration = that.state.duration * 86400
      console.log(that.props.selectedInstituteName.id)
      console.log(timeDuration)
      let obj = {
        instituteName: that.props.selectedInstituteName.name,
        instituteId: that.props.selectedInstituteName.id,
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
            loading: false
          })
          alert("Classification has been Updated")
          that.props.history.push('/manageClassification')

        })
        .catch(function (error) {
          console.log(error);
          console.log(error.response);

          if (error.response == undefined) {
            that.setState({
              alertMessage: "Network Error",
              alertShow: true,
              theme: "danger",
              loading: false
            })
          }
          else if (error.response.data.responseCode == Response.BAD_REQUEST) {
            that.setState({
              alertMessage: error.response.data.responseMessage,
              alertShow: true,
              theme: "danger",
              loading: false
            })
          }
          else {
            that.setState({
              alertMessage: error.response.data.responseMessage,
              alertShow: true,
              theme: "danger",
              loading: false
            })
          }
        });
    }
  }
  clickEnter(event) {
    console.log(event.key)

    if (event.key == "Enter") {
      if (this.props.editClassificationState) {
        this.onSaveClick()
      }
      else {

        this.onRegisterClick()
      }
    }
  }
  createMarkup(key) {
    return {__html: this.props.classificationFields[key].htmlStringCode};
  }
  
  render() {
    console.log(this.props.classificationCertificate)
    return (

      <Container fluid className="main-content-container px-4">
        {(this.props.userData.isVerified) ? (
          null
        ) : (
            <Alert className="mb-0" open={true} theme="danger">
              <i className="fas fa-exclamation mx-2"></i> Your account is not verified. Please <Link to="account_activation" style={{ color: "white", fontWeight: "bold" }}>click here</Link> to verify it.
        </Alert>
          )}
        <Alert className="mb-0" open={this.state.alertShow} theme={this.state.theme} dismissible={this.dismiss}>
          <i className="fas fa-exclamation mx-2"></i> {this.state.alertMessage}
        </Alert>
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
                              disabled
                              value={this.props.selectedInstituteName.name}
                            />

                          </Col>
                          <Col md="6" className="form-group">
                            <label>Category</label>

                            <FormInput
                              disabled
                              value={this.props.classificationCategory}
                            />
                          </Col>
                        </Row>
                        <Row>

                          <Col md="6" className="form-group">
                            <label >Classification</label>
                            <FormInput
                              placeholder="Classification"
                              value={this.props.classificationName}
                              disabled
                            />
                          </Col>
                          <Col md="6" className="form-group">
                            <label >Duration</label>

                            <InputGroup className="mb-3">
                           {(this.props.classificationDuration == "" && this.props.classificationDurationValidity == "Choose")?
                           ( 
                           <FormInput
                                value="none"
                                disabled />)
                            :
                                ( <FormInput
                                value={this.props.classificationDuration + " " +  this.props.classificationDurationValidity}
                                disabled />) }
                             

                            </InputGroup>
                          </Col>

                        </Row>
                

                      </Form>
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            </Card>
            {( this.props.classificationCertificate.name == "" ) ?  (null) :( 
           <div style={{ backgroundSize: 'cover' , position:'relative'}}>
           <img src = {URL.createObjectURL(this.props.classificationCertificate)} width = "100%"/>
            {
              Object.keys(this.props.classificationFields).map(key => { 
                return(
                  <div dangerouslySetInnerHTML={ this.createMarkup(key)} style = {{top: this.props.classificationFields[key].top + "%" , left: this.props.classificationFields[key].left + "%" , position: 'absolute'}}></div>
                )
              }
              )
            }
            
          </div>
          )}
           


{/* 
            {(this.props.editClassificationState) ? (
              (this.state.loading) ? (<img src={loader} className="loader" />) : (
                <div>
                  <span size="sm" className="mb-2 mr-1 worldcerts-button"
                    onClick={this.onSaveClick.bind(this)}
                  >Save</span>
                  <span size="sm" theme="success" className="mb-2 mr-1 worldcerts-button"
                    onClick={this.onCancelClick.bind(this)}
                  >Cancel</span>


                </div>)

            ) : (
                (this.state.loading) ? (<img src={loader} className="loader" />) : (
                  <div>
                    <span style = {{marginBottom: "3em"}} size="sm" className="mb-2 mr-1 worldcerts-button"
                      onClick={this.onRegisterClick.bind(this)}
                    >Register</span>

                  </div>
                )

              )} */}



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
    classificationCategory: state.dashboard_reducer.registerClassificationCategory,
    classificationName: state.dashboard_reducer.registerClassificationName,
    classificationDuration: state.dashboard_reducer.registerClassificationDuration,
    classificationDurationValidity: state.dashboard_reducer.registerClassificationDurationValidity,
    selectedInstituteName: state.user_reducer.selectedInstituteName,
    classificationCertificate: state.dashboard_reducer.image,
    classificationFields: state.dashboard_reducer.classificationFields,
  




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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterClassification));
